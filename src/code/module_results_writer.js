/**
 * @fileOverview Results writer (Node for Max).
 *
 * Every test run gets its own session folder:
 *   <results root>/<Day_DD_MM_YYYY>/subj_<SubjectID>_<YYYYMMDD-HHMMSS>/
 *     results_<SubjectID>_<stamp>.json         per-item results (always valid JSON, rewritten after every item)
 *     questionnaire_<SubjectID>_<stamp>.json   questionnaire results (same format)
 *     trials_<SubjectID>_<stamp>.jsonl / .csv  per-trial data (e.g. localization), one line per trial, appended
 *     <log>_<SubjectID>_<stamp>.jsonl / .csv   further logs via WriteLog (e.g. playbacks of paired localization)
 *
 * Files are written synchronously after every item or trial, so an aborted test or a crash keeps
 * everything recorded up to that point. The session folder name has second resolution, so repeated
 * runs with the same subject ID never write into the same files.
 *
 * Handlers (messages to this script):
 *   OpenFolder <path>                  results root (a dated sub-folder is created inside)
 *   SetSubjectID <id>
 *   SetInfoForResults <method> <modality> <numberOfItems>
 *   SetInfoForQuestionnaire <active> <type> <integration>
 *   SetConditionID / SetConditionPath / SetConditionHRTF / SetConditionParameterMap <list>
 *   Restart                            closes the current session
 *   GiveSubjectsResultsFile            sends the session folder to Unity (behaviour log location)
 *   WriteResult <itemIndex> <json>
 *   WriteQuestionnaire <itemIndex> <json>
 *   WriteTrial <json>                  appends to trials_<ID>_<stamp>.jsonl / .csv
 *   WriteLog <name> <json>             appends to <name>_<ID>_<stamp>.jsonl / .csv (e.g. playbacks)
 */

const fs = require("fs");
const path = require("path");
const max = require("max-api");

max.post("node.js: module_results_writer.js instantiated");

const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Test information.
let TodaysPath = null;
let SubjectID = "id_unknown";
let Methodology = "null";
let Modality = "null";
let Numberofitems = 0;
let QuestionnaireType = "null";
let QuestionnaireIntegration = "null";
let QuestionnaireActive = 0;
let AudioConditionsID = [];
let ConditionPathArray = [];
let HRTFInfoArray = [];
let ParameterMap = [];

// Current session (null when no test is running).
let session = null;

// ---------------------------------------------------------------------------------------------
// Configuration handlers
// ---------------------------------------------------------------------------------------------

max.addHandler("OpenFolder", (folder) => {
    const root = folder ? String(folder) : path.join(process.cwd(), "..", "results");
    TodaysPath = path.join(root, GetDate());
    CreateDir(TodaysPath);
});

max.addHandler("SetSubjectID", (id) => {
    SubjectID = String(id);
    max.post("Subject ID set:", SubjectID);
});

max.addHandler("SetInfoForResults", (...args) => {
    Methodology = args[0];
    Modality = args[1];
    Numberofitems = Number(args[2]);
});

max.addHandler("SetInfoForQuestionnaire", (...args) => {
    QuestionnaireActive = args[0];
    QuestionnaireType = args[1];
    QuestionnaireIntegration = args[2];
});

max.addHandler("SetConditionID", (...args) => { AudioConditionsID = args; });
max.addHandler("SetConditionPath", (...args) => { ConditionPathArray = args; });
max.addHandler("SetConditionHRTF", (...args) => { HRTFInfoArray = args; });
max.addHandler("SetConditionParameterMap", (...args) => { ParameterMap = args; });

max.addHandler("Restart", () => {
    if (session) max.post("Results session closed:", session.dir);
    session = null;
});

max.addHandler("GiveSubjectsResultsFile", () => {
    const s = EnsureSession();
    if (s) max.outlet("subjectsDir", "SendToUnity", "give_subjects_results_directory", ToForwardSlashes(s.dir));
});

// ---------------------------------------------------------------------------------------------
// Writing
// ---------------------------------------------------------------------------------------------

max.addHandler("WriteResult", (index, json) => {
    WriteItem("results", "ResultsFile", "TestResults", Number(index), json);
});

max.addHandler("WriteQuestionnaire", (index, json) => {
    WriteItem("questionnaire", "QuestionnaireFile", "QuestionnaireResults", Number(index), json);
});

max.addHandler("WriteTrial", (...args) => {
    AppendRecord("trials", args.length === 1 ? args[0] : args.join(" "));
});

/**
 * WriteLog <name> <json>: appends one record to <name>_<SubjectID>_<stamp>.jsonl / .csv in the
 * session folder (e.g. the playback log of paired localization). Same format as WriteTrial.
 */
max.addHandler("WriteLog", (name, ...args) => {
    const safe = String(name || "log").replace(/[^A-Za-z0-9_-]/g, "_");
    AppendRecord(safe, args.length === 1 ? args[0] : args.join(" "));
});

/** Appends a record (JSON string) to a per-session .jsonl and .csv pair; CSV columns come from the first record. */
function AppendRecord(name, json) {
    const s = EnsureSession();
    if (!s) return;

    const log = s.logs[name] || (s.logs[name] = {
        jsonl: path.join(s.dir, name + "_" + SubjectID + "_" + s.stamp + ".jsonl"),
        csv: path.join(s.dir, name + "_" + SubjectID + "_" + s.stamp + ".csv"),
        columns: null
    });
    const record = Object.assign({ SubjectID: SubjectID, SavedAt: new Date().toISOString() }, ParseJson(json));
    try {
        fs.appendFileSync(log.jsonl, JSON.stringify(record) + "\n");

        if (!log.columns) {
            log.columns = Object.keys(record);
            if (!fs.existsSync(log.csv)) fs.writeFileSync(log.csv, log.columns.join(",") + "\n");
        }
        const row = log.columns.map((k) => CsvValue(record[k])).join(",");
        fs.appendFileSync(log.csv, row + "\n");
    } catch (err) {
        max.post("ERROR writing " + name + ":", err.message);
    }
}

/**
 * Keeps all items of a file in memory and rewrites the whole file after every item, so the file on
 * disk is always valid JSON. Index 0 (the _config item) starts a new session.
 */
function WriteItem(kind, rootKey, listKey, index, json) {
    if (index === 0 && kind === "results") session = null;
    const s = EnsureSession();
    if (!s) return;

    const doc = s.docs[kind] || (s.docs[kind] = NewDocument());
    if (index > Numberofitems && doc.complete) return;

    doc.items.push(ParseJson(json));
    if (index >= Numberofitems) doc.complete = true;

    const content = {};
    content[rootKey] = {
        TestInformation: TestInformation(),
        AudioConditions: AudioConditions(),
        Complete: doc.complete
    };
    content[rootKey][listKey] = doc.items;

    const file = path.join(s.dir, kind + "_" + SubjectID + "_" + s.stamp + ".json");
    WriteFileAtomic(file, JSON.stringify(content, null, 2));
}

function NewDocument() {
    return { items: [], complete: false };
}

function EnsureSession() {
    if (session) return session;
    if (!TodaysPath) {
        max.post("ERROR: results folder not set (OpenFolder was never called). Load a config first.");
        return null;
    }
    // Never reuse an existing session folder (e.g. two runs started within the same second).
    let stamp = GetStamp();
    let dir = path.join(TodaysPath, "subj_" + SubjectID + "_" + stamp);
    for (let n = 2; fs.existsSync(dir); n++) {
        stamp = GetStamp() + "_" + n;
        dir = path.join(TodaysPath, "subj_" + SubjectID + "_" + stamp);
    }
    CreateDir(dir);
    session = {
        dir: dir,
        stamp: stamp,
        docs: {},
        logs: {}            // name -> {jsonl, csv, columns} (trials, playbacks, ...)
    };
    max.post("Results session opened:", dir);
    return session;
}

function TestInformation() {
    return {
        Method: Methodology,
        Modality: Modality,
        NumberOfItems: Numberofitems,
        SubjectID: SubjectID,
        QuestionnaireActive: QuestionnaireActive,
        QuestionnaireType: QuestionnaireType,
        QuestionnaireIntegration: QuestionnaireIntegration
    };
}

function AudioConditions() {
    return AudioConditionsID.map((id, i) => ({
        Legend: i,
        VST: id,
        VSTPath: ConditionPathArray[i],
        VSTmapper: ParameterMap[i],
        HRTF: HRTFInfoArray[i]
    }));
}

// ---------------------------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------------------------

function ParseJson(json) {
    if (typeof json !== "string") return json;
    try {
        return JSON.parse(json);
    } catch (err) {
        return { Raw: json };
    }
}

function WriteFileAtomic(file, text) {
    try {
        const tmp = file + ".tmp";
        fs.writeFileSync(tmp, text);
        fs.renameSync(tmp, file);
    } catch (err) {
        max.post("ERROR writing", file, err.message);
    }
}

function CsvValue(v) {
    if (v === null || v === undefined) return "";
    const s = typeof v === "object" ? JSON.stringify(v) : String(v);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function CreateDir(dir) {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            max.post("New directory opened:", dir);
        }
    } catch (err) {
        max.post("ERROR creating directory", dir, err.message);
    }
}

function ToForwardSlashes(p) {
    return p.replace(/\\/g, "/");
}

function Pad(n) {
    return ("0" + n).slice(-2);
}

/** Folder name for today, e.g. Fri_25_09_2026 (same format as before). */
function GetDate() {
    const d = new Date();
    return [Days[d.getDay()], Pad(d.getDate()), Pad(d.getMonth() + 1), d.getFullYear()].join("_");
}

/** Session stamp with second resolution, e.g. 20260925-171503. */
function GetStamp() {
    const d = new Date();
    return d.getFullYear() + Pad(d.getMonth() + 1) + Pad(d.getDate()) + "-" +
           Pad(d.getHours()) + Pad(d.getMinutes()) + Pad(d.getSeconds());
}
