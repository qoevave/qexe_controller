/**
 * @fileOverview Sound localization method.
 *
 * One test item (Unity scene) = one block of localization trials. For every trial Max plays one
 * stimulus file, tells Unity which trial is running, waits for the participant's pointing response
 * from Unity, stores it, and moves on to the next trial.
 *
 * OSC protocol (see docs/protocol.md):
 *   Unity -> Max   /qexe/loc/start                                   participant pressed Start
 *   Unity -> Max   /qexe/loc/aligned  i:trial f:headYaw f:headPitch   participant faces the front (reply to ready)
 *   Unity -> Max   /qexe/loc/response i:trial f:az f:el f:azHead f:elHead f:headYaw f:headPitch f:rtMs s:isoTime
 *                                     s:source("pointer"|"dial") i:hasPreliminary f:preliminaryAz f:preliminaryMs
 *                                     f:markTimeMs f:onsetYaw f:onsetPitch f:maxAbsYaw f:maxAbsPitch
 *   Max -> Unity   /qexe/loc/ready    i:trial i:trialCount f:toleranceDeg i:holdMs s:stimulusId
 *                                     next trial waits for head alignment (requireAlignment)
 *   Max -> Unity   /qexe/loc/trial    i:trial i:trialCount s:stimulusId   stimulus onset
 *   Max -> Unity   /qexe/loc/respond  i:trial                             response window open
 *   Max -> Unity   /qexe/loc/complete i:trialCount                        block finished
 *   Max -> Unity   /qexe/loc/mode     s:"training"|"test" i:trialCount    sent when a block starts
 *   Max -> Unity   /qexe/loc/feedback i:trial f:targetAz f:targetEl       training: the correct direction
 *
 * Outlets:
 *   0 -> sfplay~ control (open <file>, 1, 0) and gain / mono routing
 *   1 -> module_ResultsWriter (WriteResult, WriteTrial)
 *   2 -> OSC to Unity (prepended with SendRaw and sent to module_osc_manager)
 *   3 -> status display (set <text>)
 *
 * @module method_Localization.js
 */

autowatch = 1;
inlets = 1;
outlets = 4;

var OUT_AUDIO = 0;
var OUT_RESULTS = 1;
var OUT_OSC = 2;
var OUT_STATUS = 3;

// ---------------------------------------------------------------------------------------------
// Settings (from the "localization" block of the config file, see testfiles/qexe_config_localization.json)
// A scene entry can override any of them with its own "localization" block (e.g. a training block).
// ---------------------------------------------------------------------------------------------
var DEFAULTS = {
    stimuliFolder: "",               // relative to pathToAudioVideoScenesContent, or absolute
    stimuli: [],                     // [{id, file, targetAzimuth, targetElevation}] (optional, else folder scan)
    repetitions: 1,
    randomize: true,
    avoidImmediateRepeats: true,
    startDelayMs: 1500,              // after the participant presses Start
    interTrialIntervalMs: 1000,      // after a response, before the next stimulus
    responseDuringStimulus: false,   // allow responding before the stimulus has finished
    maxStimulusDurationMs: 8000,     // fallback if sfplay~ never reports the end of the file
    monoToBothChannels: true,        // mono files are sent to both output channels
    outputChannels: [1, 2],          // dac~ channels for the left / right stimulus channel
    gainDb: 0.0,
    requireAlignment: true,          // play only when the participant faces 0 deg (yaw and pitch)
    alignmentToleranceDeg: 5,        // allowed deviation of head yaw and pitch
    alignmentHoldMs: 500,            // how long the participant must stay aligned before playback
    training: false,                 // training block: show the correct direction after each response
    feedbackMs: 2000                 // how long the feedback stays up before the next trial
};

var settings = copySettings(DEFAULTS);   // effective settings for the current item
var baseLocalization = {};               // "localization" block of the config
var sceneOverrides = {};                 // stimuli_ID -> "localization" block of that scene

var contentDirectory = "";
var stimuli = [];        // resolved stimulus list [{id, file, path, targetAzimuth, targetElevation}]
var trials = [];         // [{stimulusIndex, repetition}]
var currentTrial = -1;
var state = "idle";      // idle | waiting_start | aligning | playing | responding | iti | complete
var alignedYaw = null;   // head orientation reported by Unity when the trial was released
var alignedPitch = null;
var onsetTimeMs = 0;
var responsesCollected = 0;

// Current test item (set by testmanager.js through setItem).
var currentSceneID = "config";
var currentUnitySceneID = "_config";
var currentVideoFile = "null";
var currentVideoID = "null";

// Settings and the current item are also kept in a named Dict. autowatch reloads this script
// whenever the file changes, which would otherwise wipe everything until the config is reloaded.
var persisted = new Dict("qexe_localization_state");

var startTask = new Task(beginNextTrial, this);
var itiTask = new Task(beginNextTrial, this);
var fallbackTask = new Task(openResponseWindow, this);
var completeTask = new Task(completeBlock, this);

// ---------------------------------------------------------------------------------------------
// Messages from testmanager.js
// ---------------------------------------------------------------------------------------------

/**
 * Configure the method. Called by testmanager.js right after the patch is loaded.
 * @param {string} json JSON string: {"localization": {...}, "contentDirectory": "..."}
 */
function setTest(json) {
    persisted.set("settings", json);
    applySettings(json);
}

function applySettings(json) {
    var cfg;
    try {
        cfg = JSON.parse(json);
    } catch (e) {
        error("method_Localization: could not parse settings:", e, "\n");
        return;
    }

    baseLocalization = cfg.localization || {};
    contentDirectory = cfg.contentDirectory || "";
    sceneOverrides = {};
    var scenes = cfg.scenes || [];
    for (var i = 0; i < scenes.length; i++) {
        if (scenes[i].localization) sceneOverrides[scenes[i].stimuli_ID] = scenes[i].localization;
    }

    applyEffectiveSettings(null);
    status("Loaded " + stimuli.length + " stimuli, " + (stimuli.length * settings.repetitions) + " trials per block");
}

/** Effective settings = defaults, then the config's localization block, then the scene's override. */
function applyEffectiveSettings(sceneID) {
    settings = copySettings(DEFAULTS);
    mergeInto(settings, baseLocalization);
    if (sceneID && sceneOverrides[sceneID]) mergeInto(settings, sceneOverrides[sceneID]);

    stimuli = resolveStimuli();
    outlet(OUT_AUDIO, "gain", dbToLin(settings.gainDb));
    outlet(OUT_AUDIO, "mono", settings.monoToBothChannels ? 1 : 0);
    if (settings.outputChannels && settings.outputChannels.length === 2) {
        outlet(OUT_AUDIO, "channels", settings.outputChannels[0], settings.outputChannels[1]);
    }
    post("method_Localization:", sceneID ? sceneID : "(defaults)", settings.training ? "[TRAINING]" : "",
         stimuli.length, "stimuli x", settings.repetitions, "repetitions =",
         stimuli.length * settings.repetitions, "trials\n");
}

function copySettings(src) {
    var out = {};
    for (var k in src) out[k] = src[k];
    return out;
}

function mergeInto(target, src) {
    for (var k in src) {
        if (!src.hasOwnProperty(k)) continue;
        if (!DEFAULTS.hasOwnProperty(k)) post("method_Localization: unknown localization setting '" + k + "' ignored\n");
        else target[k] = src[k];
    }
}

/** Called by testmanager.js whenever a new test item (scene) becomes current. */
function setItem() {
    persisted.set("item", JSON.stringify(arrayfromargs(arguments)));
    applyItem(arrayfromargs(arguments));
}

function applyItem(args) {
    currentSceneID = args[0];
    currentUnitySceneID = args[1];
    currentVideoFile = args.length > 2 ? args[2] : "null";
    currentVideoID = args.length > 3 ? args[3] : "null";
    applyEffectiveSettings(currentUnitySceneID !== "_config" ? currentSceneID : null);
    resetBlock();

    if (currentUnitySceneID !== "_config") {
        state = "waiting_start";
        status("Item " + currentSceneID + ": waiting for participant to press Start");
    }
}

/**
 * Called by testmanager.js before advancing to the next item. Writes a per-item summary into the
 * main results file (trial data are written separately, one line per trial).
 */
function WriteResult(itemNumber) {
    var result = {
        "SceneID": currentSceneID,
        "UnitySceneID": currentUnitySceneID,
        "VideoFile": currentVideoFile,
        "VideoID": currentVideoID,
        "Method": "Localization",
        "TrialsPlanned": trials.length,
        "TrialsCompleted": responsesCollected,
        "BlockComplete": state === "complete" ? 1 : 0
    };
    outlet(OUT_RESULTS, "WriteResult", itemNumber, JSON.stringify(result));
    stopAll();
}

// ---------------------------------------------------------------------------------------------
// Messages from Unity (via receive osc_in_all -> route)
// ---------------------------------------------------------------------------------------------

/** /qexe/loc/start */
function Start() {
    if (state !== "waiting_start") {
        post("method_Localization: Start ignored in state", state, "\n");
        return;
    }
    if (trials.length === 0) {
        error("method_Localization: no trials. Check the localization block in the config file.\n");
        return;
    }
    state = "iti";
    outlet(OUT_OSC, "/qexe/loc/mode", settings.training ? "training" : "test", trials.length);
    status("Starting " + (settings.training ? "TRAINING " : "") + "block of " + trials.length + " trials...");
    startTask.schedule(settings.startDelayMs);
}

/**
 * /qexe/loc/response i:trial f:az f:el f:azHead f:elHead f:headYaw f:headPitch f:rtMs s:isoTime
 *                    s:source i:hasPreliminary f:preliminaryAz f:preliminaryMs f:markTimeMs
 * (everything after isoTime is optional so older Unity builds still work)
 */
function Response() {
    var a = arrayfromargs(arguments);
    var trialIndex = a[0];

    if (state !== "responding" && !(state === "playing" && settings.responseDuringStimulus)) {
        post("method_Localization: response for trial", trialIndex, "ignored in state", state, "\n");
        return;
    }
    if (trialIndex !== currentTrial) {
        post("method_Localization: response for trial", trialIndex, "but current trial is", currentTrial, "- ignored\n");
        return;
    }

    fallbackTask.cancel();
    outlet(OUT_AUDIO, 0); // stop playback if still running

    var receivedMs = Date.now();
    var t = trials[currentTrial];
    var s = stimuli[t.stimulusIndex];

    var record = {
        "SceneID": currentSceneID,
        "UnitySceneID": currentUnitySceneID,
        "Trial": currentTrial,
        "TrialCount": trials.length,
        "StimulusID": s.id,
        "StimulusFile": s.file,
        "Repetition": t.repetition,
        "Training": settings.training ? 1 : 0,
        "TargetAzimuth": s.targetAzimuth,
        "TargetElevation": s.targetElevation,
        "ResponseAzimuth": a[1],
        "ResponseElevation": a[2],
        "ResponseAzimuthHead": a[3],
        "ResponseElevationHead": a[4],
        "HeadYaw": a[5],
        "HeadPitch": a[6],
        "RTUnityMs": a[7],
        "RTHostMs": receivedMs - onsetTimeMs,
        "OnsetUnixMs": onsetTimeMs,
        "ResponseUnixMs": receivedMs,
        "UnityTimestamp": a.length > 8 ? String(a[8]) : "",
        "ResponseSource": a.length > 9 ? String(a[9]) : "pointer",
        "PreliminaryAzimuth": (a.length > 11 && a[10] === 1) ? a[11] : null,
        "PreliminaryTimeMs": (a.length > 12 && a[10] === 1) ? a[12] : null,
        "MarkTimeMs": a.length > 13 ? a[13] : null,
        "RequireAlignment": settings.requireAlignment ? 1 : 0,
        "AlignmentToleranceDeg": settings.requireAlignment ? Number(settings.alignmentToleranceDeg) : null,
        "AlignedHeadYaw": alignedYaw,
        "AlignedHeadPitch": alignedPitch,
        "OnsetHeadYaw": a.length > 14 ? a[14] : null,
        "OnsetHeadPitch": a.length > 15 ? a[15] : null,
        "MaxAbsHeadYawDuringStimulus": a.length > 16 ? a[16] : null,
        "MaxAbsHeadPitchDuringStimulus": a.length > 17 ? a[17] : null,
        "LeftToleranceDuringStimulus": (a.length > 17 && settings.requireAlignment)
            ? ((a[16] > settings.alignmentToleranceDeg || a[17] > settings.alignmentToleranceDeg) ? 1 : 0)
            : null
    };
    outlet(OUT_RESULTS, "WriteTrial", JSON.stringify(record));
    responsesCollected++;

    // Training: show the correct direction before moving on.
    var feedbackDelay = 0;
    if (settings.training) {
        if (s.targetAzimuth === null || s.targetAzimuth === undefined) {
            post("method_Localization: no targetAzimuth for stimulus", s.id, "- no feedback shown\n");
        } else {
            outlet(OUT_OSC, "/qexe/loc/feedback", currentTrial, Number(s.targetAzimuth),
                   Number(s.targetElevation === null || s.targetElevation === undefined ? 0 : s.targetElevation));
            feedbackDelay = settings.feedbackMs;
        }
    }

    if (currentTrial >= trials.length - 1) {
        state = "iti";
        if (feedbackDelay > 0) completeTask.schedule(feedbackDelay);
        else completeBlock();
    } else {
        state = "iti";
        status("Trial " + (currentTrial + 1) + "/" + trials.length + " answered");
        itiTask.schedule(feedbackDelay + settings.interTrialIntervalMs);
    }
}

/** sfplay~ reports that the file finished. */
function StimulusEnded() {
    if (state === "playing") openResponseWindow();
}

// ---------------------------------------------------------------------------------------------
// Operator controls (message boxes in the patch / command line)
// ---------------------------------------------------------------------------------------------

/** Replay the current stimulus (e.g. if the participant was distracted). Not logged as a new trial. */
function Replay() {
    if (currentTrial < 0 || currentTrial >= trials.length) return;
    playStimulus(stimuli[trials[currentTrial].stimulusIndex]);
}

/** Abort the running block (the item summary will show it as incomplete). */
function Abort() {
    resetBlock();
    state = "waiting_start";
    status("Block aborted. The participant can press Start again to restart the block.");
}

/** Print the trial list to the Max console. */
function PrintTrials() {
    for (var i = 0; i < trials.length; i++) {
        var s = stimuli[trials[i].stimulusIndex];
        post(i, s.id, "rep", trials[i].repetition, "\n");
    }
}

// ---------------------------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------------------------

function beginNextTrial() {
    currentTrial++;
    if (currentTrial >= trials.length) {
        completeBlock();
        return;
    }
    alignedYaw = null;
    alignedPitch = null;

    if (settings.requireAlignment) {
        // Wait until Unity reports that the participant faces the front (see Aligned()).
        var s = stimuli[trials[currentTrial].stimulusIndex];
        state = "aligning";
        outlet(OUT_OSC, "/qexe/loc/ready", currentTrial, trials.length,
               Number(settings.alignmentToleranceDeg), Math.round(settings.alignmentHoldMs), s.id);
        status("Trial " + (currentTrial + 1) + "/" + trials.length + ": waiting for the participant to face the front");
    } else {
        playCurrentTrial();
    }
}

/** /qexe/loc/aligned i:trial f:headYaw f:headPitch */
function Aligned() {
    var a = arrayfromargs(arguments);
    if (state !== "aligning" || a[0] !== currentTrial) {
        post("method_Localization: aligned for trial", a[0], "ignored in state", state, "\n");
        return;
    }
    alignedYaw = a.length > 1 ? a[1] : null;
    alignedPitch = a.length > 2 ? a[2] : null;
    playCurrentTrial();
}

function playCurrentTrial() {
    var s = stimuli[trials[currentTrial].stimulusIndex];
    state = "playing";
    playStimulus(s);
    onsetTimeMs = Date.now();
    outlet(OUT_OSC, "/qexe/loc/trial", currentTrial, trials.length, s.id);
    status("Trial " + (currentTrial + 1) + "/" + trials.length + ": " + s.id);

    if (settings.responseDuringStimulus) {
        openResponseWindow();
    } else {
        fallbackTask.schedule(settings.maxStimulusDurationMs);
    }
}

function openResponseWindow() {
    fallbackTask.cancel();
    if (state !== "playing") return;
    state = "responding";
    outlet(OUT_OSC, "/qexe/loc/respond", currentTrial);
}

function completeBlock() {
    stopAll();
    state = "complete";
    outlet(OUT_OSC, "/qexe/loc/complete", trials.length);
    status("Block complete: " + responsesCollected + "/" + trials.length + " responses");
}

function playStimulus(s) {
    outlet(OUT_AUDIO, "open", s.path);
    outlet(OUT_AUDIO, 1);
}

function stopAll() {
    startTask.cancel();
    itiTask.cancel();
    fallbackTask.cancel();
    completeTask.cancel();
    outlet(OUT_AUDIO, 0);
}

function resetBlock() {
    stopAll();
    trials = buildTrials();
    currentTrial = -1;
    responsesCollected = 0;
    state = "idle";
}

function buildTrials() {
    var list = [];
    for (var r = 0; r < settings.repetitions; r++) {
        for (var i = 0; i < stimuli.length; i++) {
            list.push({ stimulusIndex: i, repetition: r });
        }
    }
    if (settings.randomize) {
        shuffle(list);
        if (settings.avoidImmediateRepeats) {
            // Reshuffle until there are no back-to-back repeats; repair by swapping if that fails.
            for (var attempt = 0; attempt < 1000 && hasImmediateRepeat(list); attempt++) shuffle(list);
            if (hasImmediateRepeat(list)) spreadRepeats(list);
        }
    }
    return list;
}

/** Fisher-Yates shuffle, in place. */
function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
}

function hasImmediateRepeat(a) {
    for (var i = 1; i < a.length; i++) {
        if (a[i].stimulusIndex === a[i - 1].stimulusIndex) return true;
    }
    return false;
}

/** Swap elements so that the same stimulus is not presented twice in a row (best effort). */
function spreadRepeats(a) {
    function fits(list, pos, item, ignore) {
        var prev = pos - 1 === ignore ? null : list[pos - 1];
        var next = pos + 1 === ignore ? null : list[pos + 1];
        return (!prev || prev.stimulusIndex !== item.stimulusIndex) &&
               (!next || next.stimulusIndex !== item.stimulusIndex);
    }
    for (var pass = 0; pass < 3; pass++) {
        var changed = false;
        for (var i = 1; i < a.length; i++) {
            if (a[i].stimulusIndex !== a[i - 1].stimulusIndex) continue;
            for (var k = 0; k < a.length; k++) {
                if (k === i || Math.abs(k - i) === 1) continue;
                if (fits(a, i, a[k], k) && fits(a, k, a[i], i)) {
                    var tmp = a[i]; a[i] = a[k]; a[k] = tmp;
                    changed = true;
                    break;
                }
            }
        }
        if (!changed) break;
    }
}

function resolveStimuli() {
    var folder = joinPath(contentDirectory, settings.stimuliFolder);
    var list = [];

    if (settings.stimuli && settings.stimuli.length > 0) {
        for (var i = 0; i < settings.stimuli.length; i++) {
            var st = settings.stimuli[i];
            list.push(makeStimulus(st.id || stripExtension(st.file), st.file, folder,
                                   st.targetAzimuth, st.targetElevation));
        }
    } else {
        // No explicit list: use every audio file in the folder, sorted by name.
        var f = new Folder(folder);
        var names = [];
        while (!f.end) {
            if (f.filename && /\.(wav|aif|aiff|flac)$/i.test(f.filename)) names.push(f.filename);
            f.next();
        }
        f.close();
        names.sort();
        for (var k = 0; k < names.length; k++) {
            list.push(makeStimulus(stripExtension(names[k]), names[k], folder, null, null));
        }
        if (names.length === 0) error("method_Localization: no audio files found in", folder, "\n");
    }
    return list;
}

function makeStimulus(id, file, folder, az, el) {
    return {
        id: String(id),
        file: file,
        path: isAbsolute(file) ? file : joinPath(folder, file),
        targetAzimuth: (az === undefined) ? null : az,
        targetElevation: (el === undefined) ? null : el
    };
}

function status(text) {
    outlet(OUT_STATUS, "set", text);
}

function joinPath(a, b) {
    if (!b) return a;
    if (!a || isAbsolute(b)) return b;
    return a.replace(/[\/\\]+$/, "") + "/" + b.replace(/^[\/\\]+/, "");
}

function isAbsolute(p) {
    return /^([A-Za-z]:[\/\\]|\/)/.test(p);
}

function stripExtension(name) {
    return String(name).replace(/\.[^.]+$/, "");
}

function dbToLin(db) {
    return Math.pow(10, db / 20);
}

// ---------------------------------------------------------------------------------------------
// Restore state after a script reload (autowatch)
// ---------------------------------------------------------------------------------------------

function restoreAfterReload() {
    var json = persisted.get("settings");
    if (!json) return;
    post("method_Localization: script reloaded, restoring settings from the last loaded config\n");
    applySettings(String(json));
    var item = persisted.get("item");
    if (item) {
        try {
            applyItem(JSON.parse(String(item)));
        } catch (e) {
            post("method_Localization: could not restore the current item:", e, "\n");
        }
    }
}
restoreAfterReload();
