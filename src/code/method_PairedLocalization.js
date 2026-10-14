/**
 * @fileOverview Paired (A/B) sound localization method.
 *
 * One test item (Unity scene) = one block of pairs. Every localization *item* (e.g. one source
 * position) has two renderings (e.g. GA and Hybrid). Each presentation of an item is a pair:
 *   1. Only A is active. The participant presses A, faces the front, A plays (replays allowed).
 *   2. The participant answers A (dial or pointer, confirmed in the dial centre). A is then locked.
 *   3. B becomes active. Pressing A or B starts a playback (after head alignment) in which A and B
 *      run in sync; while it plays the participant can switch between them at will (crossfade).
 *   4. After hearing B at least once, the participant answers B. The pair ends automatically.
 *
 * Audio: both files of the pair are loaded into buffers (qexe_pair_A / qexe_pair_B) when the pair
 * starts. Every playback starts both players together; the A/B levels select what is heard. The
 * playback length is read from the WAV headers (longer of the two); mono files are sent to both
 * channels when monoToBothChannels is on.
 *
 * Order: items run in rounds (every item once, reshuffled each round). Which pair entry is A is
 * balanced in round 1 (half the items each way, counted over items whose two entries differ) and
 * flipped in every following round, so with 2 repetitions each entry is A once and B once.
 * The order of the entries in the config's "pair" array does NOT decide A and B.
 *
 * OSC protocol (Unity <-> Max), see QExEPairedLocalizationProtocol.cs:
 *   Unity -> Max  /qexe/pair/start
 *   Unity -> Max  /qexe/pair/play      i:trial s:side("A"|"B")              participant pressed A or B
 *                                                                          (while comparing: switch to that side)
 *   Unity -> Max  /qexe/pair/aligned   i:trial f:headYaw f:headPitch         reply to ready
 *   Unity -> Max  /qexe/pair/playhead  i:trial i:playIndex f:onsetYaw f:onsetPitch f:maxAbsYaw f:maxAbsPitch
 *                                                                          head during a playback (after "played")
 *   Unity -> Max  /qexe/pair/response  i:trial s:side f:az f:el f:azHead f:elHead f:headYaw f:headPitch
 *                                      f:rtMs s:isoTime s:source("pointer"|"dial") f:markTimeMs
 *   Max -> Unity  /qexe/pair/mode      s:"training"|"test" i:pairCount        block starts
 *   Max -> Unity  /qexe/pair/pair      i:trial i:pairCount s:itemId           a pair begins
 *   Max -> Unity  /qexe/pair/state     i:trial i:aEnabled i:bEnabled i:answerOpen s:answerSide
 *   Max -> Unity  /qexe/pair/ready     i:trial s:side f:toleranceDeg i:holdMs  wait for head alignment
 *   Max -> Unity  /qexe/pair/playing   i:trial s:side i:playIndex             stimulus onset
 *   Max -> Unity  /qexe/pair/selected  i:trial s:side                         audible side switched (comparison)
 *   Max -> Unity  /qexe/pair/played    i:trial s:side i:playIndex             stimulus ended (side = audible at the end)
 *   Max -> Unity  /qexe/pair/answered  i:trial s:side                         answer accepted (locked)
 *   Max -> Unity  /qexe/pair/complete  i:pairCount                            block finished
 *   Max -> Unity  /qexe/pair/abort                                            block reset (operator Abort / Start
 *                                                                            rejected): Unity returns to Start
 *
 * Outlets:
 *   0 -> audio: loadA/loadB <path>, start, stop, levelA/levelB <gain> <ms>, monoA/monoB <0|1>,
 *        gain <lin>, channels <l> <r>
 *   1 -> module_ResultsWriter (WriteResult, WriteTrial, WriteLog)
 *   2 -> OSC to Unity (prepended with SendRaw and sent to module_osc_manager)
 *   3 -> status display (set <text>)
 *
 * @module method_PairedLocalization.js
 */

autowatch = 1;
inlets = 1;
outlets = 4;

var OUT_AUDIO = 0;
var OUT_RESULTS = 1;
var OUT_OSC = 2;
var OUT_STATUS = 3;

var NAME = "method_PairedLocalization";

// ---------------------------------------------------------------------------------------------
// Settings (the "localization" block of the config; a scene entry can override any of them with
// its own "localization" block, e.g. a training block with fewer items).
// ---------------------------------------------------------------------------------------------
var DEFAULTS = {
    stimuliFolder: "",               // relative to pathToAudioVideoScenesContent, or absolute
    items: [],                       // [{id, type, targetAzimuth, targetElevation, pair: [{condition, file}, {condition, file}]}]
    repetitions: 2,                  // even (2, 4, ...) outside training; each two rounds flip A/B
    randomize: true,                 // shuffle the items within every round
    startDelayMs: 1500,              // after the participant presses Start
    interTrialIntervalMs: 1000,      // after the B answer, before the next pair
    maxStimulusDurationMs: 8000,     // playback length if it can't be read from the WAV header
    switchFadeMs: 20,                // crossfade when switching between A and B
    loadTimeoutMs: 3000,             // continue if buffer~ doesn't confirm loading within this time
    monoToBothChannels: true,        // mono files are sent to both channels (stereo files are untouched)
    outputChannels: [1, 2],
    gainDb: 0.0,
    requireAlignment: true,          // every playback waits until the participant faces 0 deg
    alignmentToleranceDeg: 5,
    alignmentHoldMs: 500,
    training: false                  // training block: rows get Training = 1, repetitions may be 1
};

var settings = copySettings(DEFAULTS);
var baseLocalization = {};
var sceneOverrides = {};
var contentDirectory = "";

var items = [];          // resolved items (see resolveItems)
var pairs = [];          // [{itemIndex, round, aEntry}]
var currentTrial = -1;
var state = "idle";      // idle | waiting_start | starting | loading | pair_idle | aligning | playing | iti | complete
var pair = null;         // runtime state of the current pair (see newPairState)
var pendingSide = "";    // side requested with /play, waiting for alignment
var alignedYaw = null;
var alignedPitch = null;
var pairsCompleted = 0;
var selectedSide = "";   // audible side during a playback
var loadPending = null;  // {A: bool, B: bool} while loading the buffers
var bufferInfo = { A: null, B: null };   // {ms, channels} from the WAV headers

var BUFFER = { A: "qexe_pair_A", B: "qexe_pair_B" };   // names of the buffer~ objects in the patcher

var currentSceneID = "config";
var currentUnitySceneID = "_config";
var currentVideoFile = "null";
var currentVideoID = "null";

var persisted = new Dict("qexe_paired_localization_state");

var startTask = new Task(beginNextPair, this);
var itiTask = new Task(beginNextPair, this);
var endTask = new Task(playbackTimeReached, this);
var loadTask = new Task(loadTimedOut, this);

// ---------------------------------------------------------------------------------------------
// Messages from testmanager.js
// ---------------------------------------------------------------------------------------------

/** @param {string} json {"localization": {...}, "contentDirectory": "...", "scenes": [{stimuli_ID, localization}]} */
function setTest(json) {
    persisted.set("settings", json);
    applySettings(json);
}

function applySettings(json) {
    var cfg;
    try {
        cfg = JSON.parse(json);
    } catch (e) {
        error(NAME + ": could not parse settings:", e, "\n");
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
    resetBlock();   // never keep an order built from previous settings
    status("Loaded " + items.length + " items");
}

function applyEffectiveSettings(sceneID) {
    settings = copySettings(DEFAULTS);
    mergeInto(settings, baseLocalization);
    if (sceneID && sceneOverrides[sceneID]) mergeInto(settings, sceneOverrides[sceneID]);

    items = resolveItems();
    outlet(OUT_AUDIO, "gain", dbToLin(settings.gainDb));
    if (settings.outputChannels && settings.outputChannels.length === 2) {
        outlet(OUT_AUDIO, "channels", settings.outputChannels[0], settings.outputChannels[1]);
    }
    post(NAME + ":", sceneID ? sceneID : "(defaults)", settings.training ? "[TRAINING]" : "",
         items.length, "items x", effectiveRepetitions(), "repetitions =",
         items.length * effectiveRepetitions(), "pairs\n");
}

/** Repetitions actually used: at least 2 and even outside training, so A/B can be flipped. */
function effectiveRepetitions() {
    var r = Math.max(1, Math.round(Number(settings.repetitions) || 1));
    if (settings.training) return r;
    if (r < 2) return 2;
    return (r % 2 === 1) ? r + 1 : r;
}

function copySettings(src) {
    var out = {};
    for (var k in src) out[k] = src[k];
    return out;
}

function mergeInto(target, src) {
    for (var k in src) {
        if (!src.hasOwnProperty(k)) continue;
        if (!DEFAULTS.hasOwnProperty(k)) post(NAME + ": setting '" + k + "' is not used by paired localization (ignored)\n");
        else target[k] = src[k];
    }
}

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
        var r = Number(settings.repetitions);
        if (!settings.training && r !== effectiveRepetitions()) {
            post(NAME + ": WARNING repetitions = " + settings.repetitions + " but paired localization needs an even number " +
                 "(each item once with each rendering as A). Using " + effectiveRepetitions() + ".\n");
        }
        state = "waiting_start";
        status("Item " + currentSceneID + ": " + pairs.length + " pairs, waiting for participant to press Start");
    }
}

/** Called by testmanager.js before advancing to the next item. */
function WriteResult(itemNumber) {
    flushPlayback();
    var result = {
        "SceneID": currentSceneID,
        "UnitySceneID": currentUnitySceneID,
        "VideoFile": currentVideoFile,
        "VideoID": currentVideoID,
        "Method": "PairedLocalization",
        "Training": settings.training ? 1 : 0,
        "PairsPlanned": pairs.length,
        "PairsCompleted": pairsCompleted,
        "BlockComplete": state === "complete" ? 1 : 0
    };
    outlet(OUT_RESULTS, "WriteResult", itemNumber, JSON.stringify(result));
    stopAll();
}

// ---------------------------------------------------------------------------------------------
// Messages from Unity
// ---------------------------------------------------------------------------------------------

/** /qexe/pair/start */
function Start() {
    if (state !== "waiting_start") {
        post(NAME + ": Start ignored in state", state, "\n");
        return;
    }
    if (pairs.length === 0) {
        error(NAME + ": no pairs. Check the 'items' list in the localization block of the config file.\n");
        outlet(OUT_OSC, "/qexe/pair/abort");   // lets Unity show Start again
        return;
    }
    state = "starting";
    outlet(OUT_OSC, "/qexe/pair/mode", settings.training ? "training" : "test", pairs.length);
    status("Starting " + (settings.training ? "TRAINING " : "") + "block of " + pairs.length + " pairs...");
    startTask.schedule(settings.startDelayMs);
}

/** /qexe/pair/play i:trial s:side */
function Play(trial, side) {
    side = String(side);
    if (!checkTrial(trial, "play")) return;
    if (state === "aligning" && side === pendingSide) {
        // Repeated request (e.g. a lost message): ask for alignment again.
        outlet(OUT_OSC, "/qexe/pair/ready", currentTrial, side,
               Number(settings.alignmentToleranceDeg), Math.round(settings.alignmentHoldMs));
        return;
    }
    if (state === "playing") {
        // While comparing (A answered): switch the audible side. Before that only A plays.
        if (pair.aAnswered && (side === "A" || side === "B") && side !== selectedSide) selectSide(side);
        return;
    }
    if (state !== "pair_idle") {
        post(NAME + ": play", side, "ignored in state", state, "\n");
        if (state !== "loading") sendState();
        return;
    }
    if (!sideEnabled(side)) {
        post(NAME + ": play", side, "ignored: side not active\n");
        sendState();
        return;
    }
    if (settings.requireAlignment) {
        pendingSide = side;
        alignedYaw = null;
        alignedPitch = null;
        state = "aligning";
        outlet(OUT_OSC, "/qexe/pair/ready", currentTrial, side,
               Number(settings.alignmentToleranceDeg), Math.round(settings.alignmentHoldMs));
        status(pairLabel() + ": " + side + " requested, waiting for the participant to face the front");
    } else {
        alignedYaw = null;
        alignedPitch = null;
        startPlayback(side);
    }
}

/** /qexe/pair/aligned i:trial f:headYaw f:headPitch */
function Aligned() {
    var a = arrayfromargs(arguments);
    if (state !== "aligning" || a[0] !== currentTrial) {
        post(NAME + ": aligned for pair", a[0], "ignored in state", state, "\n");
        return;
    }
    alignedYaw = a.length > 1 ? a[1] : null;
    alignedPitch = a.length > 2 ? a[2] : null;
    startPlayback(pendingSide);
}

/** buffer~ (right outlet) reports that a file was read: BufferLoaded A|B */
function BufferLoaded(side) {
    side = String(side);
    if (state !== "loading" || !loadPending || !loadPending.hasOwnProperty(side)) return;
    loadPending[side] = false;
    if (!loadPending.A && !loadPending.B) {
        loadTask.cancel();
        pair.loadConfirmed = 1;
        openPair();
    }
}

/** /qexe/pair/playhead i:trial i:playIndex f:onsetYaw f:onsetPitch f:maxAbsYaw f:maxAbsPitch */
function PlayHead() {
    var a = arrayfromargs(arguments);
    if (!pair || a[0] !== currentTrial) return;
    var p = findPlayback(a[1]);
    if (!p || p.written) return;
    p.onsetYaw = a.length > 2 ? a[2] : null;
    p.onsetPitch = a.length > 3 ? a[3] : null;
    p.maxAbsYaw = a.length > 4 ? a[4] : null;
    p.maxAbsPitch = a.length > 5 ? a[5] : null;
    if (p.endMs !== null) writePlayback(p);
}

/**
 * /qexe/pair/response i:trial s:side f:az f:el f:azHead f:elHead f:headYaw f:headPitch
 *                     f:rtMs s:isoTime s:source f:markTimeMs
 */
function Response() {
    var a = arrayfromargs(arguments);
    var side = String(a[1]);

    if (!pair || a[0] !== currentTrial) {
        post(NAME + ": response for pair", a[0], "ignored (current pair", currentTrial, ")\n");
        return;
    }
    if (state !== "pair_idle" || !answerOpen() || side !== answerSide()) {
        post(NAME + ": response", side, "ignored (state", state, ", expecting", answerSide(),
             answerOpen() ? "" : "- not heard yet", ")\n");
        sendState();
        return;
    }

    var now = Date.now();
    pair.responses[side] = {
        az: a[2], el: a[3], azHead: a[4], elHead: a[5], headYaw: a[6], headPitch: a[7],
        rtUnityMs: a[8],
        unityTimestamp: a.length > 9 ? String(a[9]) : "",
        source: a.length > 10 ? String(a[10]) : "pointer",
        markTimeMs: a.length > 11 ? a[11] : null,
        unixMs: now,
        playsA: pair.completed.A,
        playsB: pair.completed.B,
        afterFirstOwnPlayEndMs: pair.firstEndMs[side] !== null ? now - pair.firstEndMs[side] : null,
        afterLastPlayEndMs: pair.lastEndMs !== null ? now - pair.lastEndMs : null
    };
    outlet(OUT_OSC, "/qexe/pair/answered", currentTrial, side);

    if (side === "A") {
        pair.aAnswered = true;
        status(pairLabel() + ": A answered, B unlocked");
        sendState();
        return;
    }

    // B answered: the pair is complete.
    pair.bAnswered = true;
    flushPlayback();
    writePairRow();
    pairsCompleted++;
    state = "iti";
    if (currentTrial >= pairs.length - 1) {
        completeBlock();
    } else {
        status(pairLabel() + ": done");
        itiTask.schedule(settings.interTrialIntervalMs);
    }
}

// ---------------------------------------------------------------------------------------------
// Operator controls
// ---------------------------------------------------------------------------------------------

/** Abort the running block; the participant can press Start again. */
function Abort() {
    flushPlayback();
    resetBlock();
    state = "waiting_start";
    outlet(OUT_OSC, "/qexe/pair/abort");
    status("Block aborted. The participant can press Start again to restart the block (with a new order).");
}

/** Print the planned pair order to the Max console. */
function PrintTrials() {
    post(NAME + ": " + pairs.length + " pairs (" + items.length + " items x " + effectiveRepetitions() + " rounds)\n");
    for (var i = 0; i < pairs.length; i++) {
        var p = pairs[i];
        var it = items[p.itemIndex];
        var A = it.entries[p.aEntry], B = it.entries[1 - p.aEntry];
        post(i, "round", p.round + 1, it.id, it.type ? "[" + it.type + "]" : "",
             "A=" + A.condition + " (" + A.file + ")", "B=" + B.condition + " (" + B.file + ")\n");
    }
}

// ---------------------------------------------------------------------------------------------
// Pair flow
// ---------------------------------------------------------------------------------------------

function beginNextPair() {
    currentTrial++;
    if (currentTrial >= pairs.length) {
        completeBlock();
        return;
    }
    pair = newPairState();

    // Load both renderings of this pair into the buffers, then open the pair.
    state = "loading";
    loadPending = { A: true, B: true };
    var fileA = entryForSide("A").path, fileB = entryForSide("B").path;
    bufferInfo.A = readWavInfo(fileA);
    bufferInfo.B = readWavInfo(fileB);
    loadTask.schedule(settings.loadTimeoutMs);
    outlet(OUT_AUDIO, "stop");
    outlet(OUT_AUDIO, "loadA", fileA);
    outlet(OUT_AUDIO, "loadB", fileB);
    status(pairLabel() + ": loading A and B");
}

function loadTimedOut() {
    if (state !== "loading") return;
    post(NAME + ": WARNING buffer~ did not confirm loading within " + settings.loadTimeoutMs + " ms (A " +
         (loadPending.A ? "pending" : "ok") + ", B " + (loadPending.B ? "pending" : "ok") +
         ") - continuing. Check the file paths if a playback is silent.\n");
    pair.loadConfirmed = 0;
    openPair();
}

function openPair() {
    loadPending = null;
    var mono = function (side) {
        var info = bufferInfo[side];
        if (!settings.monoToBothChannels) return 0;
        return (info && info.channels === 1) ? 1 : 0;
    };
    outlet(OUT_AUDIO, "monoA", mono("A"));
    outlet(OUT_AUDIO, "monoB", mono("B"));
    state = "pair_idle";
    outlet(OUT_OSC, "/qexe/pair/pair", currentTrial, pairs.length, currentItem().id);
    sendState();
    status(pairLabel() + ": waiting for the participant to play A");
}

function newPairState() {
    return {
        startMs: Date.now(),
        aAnswered: false,
        bAnswered: false,
        plays: [],
        started: { A: 0, B: 0 },
        completed: { A: 0, B: 0 },
        firstEndMs: { A: null, B: null },
        lastEndMs: null,
        aPlaysDuringB: 0,
        responses: { A: null, B: null },
        anyLeftTolerance: 0,
        loadConfirmed: 0,
        comparisonPlays: 0,
        comparisonSwitches: 0,
        comparisonMs: { A: 0, B: 0 }
    };
}

function sideEnabled(side) {
    if (!pair || pair.bAnswered) return false;
    if (side === "A") return true;
    if (side === "B") return pair.aAnswered;
    return false;
}

function answerSide() {
    return pair && pair.aAnswered ? "B" : "A";
}

/** The side that is being answered has been heard completely at least once and is not answered yet. */
function answerOpen() {
    if (!pair || pair.bAnswered) return false;
    var side = answerSide();
    return pair.completed[side] > 0 && !pair.responses[side];
}

function sendState() {
    if (!pair || currentTrial < 0) return;
    outlet(OUT_OSC, "/qexe/pair/state", currentTrial,
           sideEnabled("A") ? 1 : 0, sideEnabled("B") ? 1 : 0, answerOpen() ? 1 : 0, answerSide());
}

function startPlayback(side) {
    flushPlayback();
    var entry = entryForSide(side);
    var playIndex = pair.plays.length;
    var length = playbackLengthMs();
    var p = {
        index: playIndex, side: side, condition: entry.condition, file: entry.file,
        phase: pair.aAnswered ? "answerB" : "answerA",
        onsetMs: Date.now(), endMs: null, endedBy: length.fromHeader ? "length" : "fallback",
        plannedMs: length.ms,
        switches: [{ side: side, t: 0 }],
        msOn: { A: 0, B: 0 },
        alignedYaw: alignedYaw, alignedPitch: alignedPitch,
        onsetYaw: null, onsetPitch: null, maxAbsYaw: null, maxAbsPitch: null,
        written: false
    };
    pair.plays.push(p);
    pair.started[side]++;
    if (pair.aAnswered) pair.comparisonPlays++;

    // Both players start together; the levels decide what is heard.
    state = "playing";
    selectedSide = side;
    outlet(OUT_AUDIO, "levelA", side === "A" ? 1 : 0, 0);
    outlet(OUT_AUDIO, "levelB", side === "B" ? 1 : 0, 0);
    outlet(OUT_AUDIO, "start");
    outlet(OUT_OSC, "/qexe/pair/playing", currentTrial, side, playIndex);
    endTask.schedule(length.ms + 30);
    status(pairLabel() + ": playing " + side + " (" + entry.condition + ")" + (pair.aAnswered ? " - A/B switching on" : ""));
}

/** Comparison: crossfade to the other side at the same position. */
function selectSide(side) {
    var p = pair.plays[pair.plays.length - 1];
    selectedSide = side;
    p.switches.push({ side: side, t: Date.now() - p.onsetMs });
    var fade = Math.max(0, Number(settings.switchFadeMs) || 0);
    outlet(OUT_AUDIO, "levelA", side === "A" ? 1 : 0, fade);
    outlet(OUT_AUDIO, "levelB", side === "B" ? 1 : 0, fade);
    outlet(OUT_OSC, "/qexe/pair/selected", currentTrial, side);
    status(pairLabel() + ": switched to " + side + " (" + entryForSide(side).condition + ")");
}

/** Length of a playback: the longer of the two files (both play together). */
function playbackLengthMs() {
    var a = bufferInfo.A, b = bufferInfo.B;
    var ms = Math.max(a && a.ms ? a.ms : 0, b && b.ms ? b.ms : 0);
    if (ms > 0) return { ms: ms, fromHeader: true };
    return { ms: Number(settings.maxStimulusDurationMs), fromHeader: false };
}

function playbackTimeReached() {
    if (state === "playing") playbackEnded();
}

function playbackEnded() {
    endTask.cancel();
    outlet(OUT_AUDIO, "stop");
    var p = pair.plays[pair.plays.length - 1];
    var now = Date.now();
    p.endMs = now;

    // Time each side was audible. The audio itself lasts plannedMs, whatever the scheduler jitter.
    var total = p.plannedMs;
    for (var i = 0; i < p.switches.length; i++) {
        var from = Math.min(p.switches[i].t, total);
        var to = i + 1 < p.switches.length ? Math.min(p.switches[i + 1].t, total) : total;
        p.msOn[p.switches[i].side] += Math.max(0, to - from);
    }
    var heard = { A: p.msOn.A > 0, B: p.msOn.B > 0 };
    var sides = ["A", "B"];
    for (var k = 0; k < 2; k++) {
        var s = sides[k];
        if (!heard[s]) continue;
        pair.completed[s]++;
        if (pair.firstEndMs[s] === null) pair.firstEndMs[s] = now;
    }
    if (pair.aAnswered) {
        if (heard.A) pair.aPlaysDuringB++;
        pair.comparisonSwitches += p.switches.length - 1;
        pair.comparisonMs.A += p.msOn.A;
        pair.comparisonMs.B += p.msOn.B;
    }
    pair.lastEndMs = now;

    state = "pair_idle";
    outlet(OUT_OSC, "/qexe/pair/played", currentTrial, selectedSide, p.index);
    sendState();
    status(pairLabel() + ": playback ended, " +
           (answerOpen() ? "waiting for the " + answerSide() + " answer" : "waiting for the participant"));
}

function completeBlock() {
    flushPlayback();
    stopAll();
    state = "complete";
    outlet(OUT_OSC, "/qexe/pair/complete", pairs.length);
    status("Block complete: " + pairsCompleted + "/" + pairs.length + " pairs");
}

function stopAll() {
    startTask.cancel();
    itiTask.cancel();
    endTask.cancel();
    loadTask.cancel();
    loadPending = null;
    outlet(OUT_AUDIO, "stop");
}

function resetBlock() {
    stopAll();
    pairs = buildPairs();
    currentTrial = -1;
    pair = null;
    pendingSide = "";
    pairsCompleted = 0;
    state = "idle";
}

// ---------------------------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------------------------

function currentItem() {
    return items[pairs[currentTrial].itemIndex];
}

function entryForSide(side) {
    var p = pairs[currentTrial];
    var it = items[p.itemIndex];
    return it.entries[side === "A" ? p.aEntry : 1 - p.aEntry];
}

function pairLabel() {
    if (currentTrial < 0 || currentTrial >= pairs.length) return "-";
    var it = currentItem();
    return "Pair " + (currentTrial + 1) + "/" + pairs.length + " " + it.id +
           " (A=" + entryForSide("A").condition + ", B=" + entryForSide("B").condition + ")";
}

function findPlayback(index) {
    if (!pair) return null;
    for (var i = 0; i < pair.plays.length; i++) if (pair.plays[i].index === index) return pair.plays[i];
    return null;
}

/** Writes every finished playback of the current pair that has not been written yet (head data may be missing). */
function flushPlayback() {
    if (!pair) return;
    for (var i = 0; i < pair.plays.length; i++) {
        var p = pair.plays[i];
        if (!p.written && p.endMs !== null) writePlayback(p);
    }
}

function writePlayback(p) {
    p.written = true;
    var tol = Number(settings.alignmentToleranceDeg);
    var left = null;
    if (settings.requireAlignment && p.maxAbsYaw !== null && p.maxAbsPitch !== null) {
        left = (p.maxAbsYaw > tol || p.maxAbsPitch > tol) ? 1 : 0;
        if (left) pair.anyLeftTolerance = 1;
    }
    var it = currentItem();
    var record = {
        "SceneID": currentSceneID,
        "Training": settings.training ? 1 : 0,
        "Trial": currentTrial,
        "Round": pairs[currentTrial].round + 1,
        "PairItemID": it.id,
        "PairItemType": it.type,
        "PlayIndex": p.index,
        "Phase": p.phase,
        "StartSide": p.side,
        "StartCondition": p.condition,
        "EndSide": p.switches[p.switches.length - 1].side,
        "Switches": p.switches.length - 1,
        "SwitchLog": switchLog(p),
        "MsOnA": p.msOn.A,
        "MsOnB": p.msOn.B,
        "OnsetUnixMs": p.onsetMs,
        "EndUnixMs": p.endMs,
        "DurationMs": p.endMs - p.onsetMs,
        "PlannedMs": p.plannedMs,
        "LengthFrom": p.endedBy,
        "RequireAlignment": settings.requireAlignment ? 1 : 0,
        "AlignmentToleranceDeg": settings.requireAlignment ? tol : null,
        "AlignedHeadYaw": p.alignedYaw,
        "AlignedHeadPitch": p.alignedPitch,
        "OnsetHeadYaw": p.onsetYaw,
        "OnsetHeadPitch": p.onsetPitch,
        "MaxAbsHeadYawDuringStimulus": p.maxAbsYaw,
        "MaxAbsHeadPitchDuringStimulus": p.maxAbsPitch,
        "LeftToleranceDuringStimulus": left
    };
    outlet(OUT_RESULTS, "WriteLog", "playbacks", JSON.stringify(record));
}

/** e.g. "A@0;B@1520;A@2210" (ms after onset) */
function switchLog(p) {
    var parts = [];
    for (var i = 0; i < p.switches.length; i++) parts.push(p.switches[i].side + "@" + Math.round(p.switches[i].t));
    return parts.join(";");
}

function writePairRow() {
    var p = pairs[currentTrial];
    var it = items[p.itemIndex];
    var A = it.entries[p.aEntry], B = it.entries[1 - p.aEntry];
    var now = Date.now();
    var record = {
        "SceneID": currentSceneID,
        "UnitySceneID": currentUnitySceneID,
        "Training": settings.training ? 1 : 0,
        "Trial": currentTrial,
        "TrialCount": pairs.length,
        "Round": p.round + 1,
        "PairItemID": it.id,
        "PairItemType": it.type,
        "TargetAzimuth": it.targetAzimuth,
        "TargetElevation": it.targetElevation,
        "ConditionA": A.condition,
        "FileA": A.file,
        "ConditionB": B.condition,
        "FileB": B.file,
        "PairStartUnixMs": pair.startMs,
        "PairEndUnixMs": now,
        "PairDurationMs": now - pair.startMs,
        "PlaysA_BeforeAnswerA": pair.responses.A.playsA,
        "PlaysA_WhileAnsweringB": pair.aPlaysDuringB,
        "PlaysB_BeforeAnswerB": pair.responses.B.playsB,
        "ComparisonPlaybacks": pair.comparisonPlays,
        "ComparisonSwitches": pair.comparisonSwitches,
        "MsOnA_WhileAnsweringB": pair.comparisonMs.A,
        "MsOnB_WhileAnsweringB": pair.comparisonMs.B,
        "BuffersLoadConfirmed": pair.loadConfirmed,
        "RequireAlignment": settings.requireAlignment ? 1 : 0,
        "AlignmentToleranceDeg": settings.requireAlignment ? Number(settings.alignmentToleranceDeg) : null,
        "AnyPlaybackLeftTolerance": settings.requireAlignment ? pair.anyLeftTolerance : null
    };
    addAnswer(record, "A", pair.responses.A);
    addAnswer(record, "B", pair.responses.B);
    outlet(OUT_RESULTS, "WriteTrial", JSON.stringify(record));
}

function addAnswer(record, side, r) {
    record[side + "_ResponseAzimuth"] = r.az;
    record[side + "_ResponseElevation"] = r.el;
    record[side + "_ResponseAzimuthHead"] = r.azHead;
    record[side + "_ResponseElevationHead"] = r.elHead;
    record[side + "_HeadYaw"] = r.headYaw;
    record[side + "_HeadPitch"] = r.headPitch;
    record[side + "_Source"] = r.source;
    record[side + "_MarkTimeMs"] = r.markTimeMs;
    record[side + "_RTUnityMs"] = r.rtUnityMs;
    record[side + "_RTAfterFirstPlayEndMs"] = r.afterFirstOwnPlayEndMs;
    record[side + "_RTAfterLastPlayEndMs"] = r.afterLastPlayEndMs;
    record[side + "_ResponseUnixMs"] = r.unixMs;
    record[side + "_UnityTimestamp"] = r.unityTimestamp;
}

// ---------------------------------------------------------------------------------------------
// Order
// ---------------------------------------------------------------------------------------------

/**
 * Rounds: every item once per round (shuffled if randomize). Round 1 assigns which entry is A,
 * balanced over items whose entries differ; every following round flips each item's order.
 * Consecutive rounds never present the same item twice in a row.
 */
function buildPairs() {
    var n = items.length;
    if (n === 0) return [];
    var rounds = effectiveRepetitions();

    // Balanced base assignment.
    var base = [];
    var differing = [];
    for (var i = 0; i < n; i++) {
        base.push(Math.random() < 0.5 ? 0 : 1);   // identical entries: arbitrary
        if (!items[i].identical) differing.push(i);
    }
    shuffle(differing);
    var half = Math.floor(differing.length / 2);
    var oddExtra = Math.random() < 0.5 ? 0 : 1;
    for (var k = 0; k < differing.length; k++) {
        base[differing[k]] = k < half ? 0 : (k < 2 * half ? 1 : oddExtra);
    }

    var list = [];
    var previous = -1;
    for (var r = 0; r < rounds; r++) {
        var order = [];
        for (var j = 0; j < n; j++) order.push(j);
        if (settings.randomize) shuffle(order);
        if (n > 1 && order[0] === previous) {
            var swapWith = 1 + Math.floor(Math.random() * (n - 1));
            var tmp = order[0]; order[0] = order[swapWith]; order[swapWith] = tmp;
        }
        for (var m = 0; m < n; m++) {
            list.push({ itemIndex: order[m], round: r, aEntry: base[order[m]] ^ (r % 2) });
        }
        previous = order[n - 1];
    }
    return list;
}

function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
}

// ---------------------------------------------------------------------------------------------
// Items
// ---------------------------------------------------------------------------------------------

function resolveItems() {
    var folder = joinPath(contentDirectory, settings.stimuliFolder);
    var list = [];
    var src = settings.items || [];
    if (src.length === 0) error(NAME + ": the localization block has no 'items'.\n");

    for (var i = 0; i < src.length; i++) {
        var it = src[i];
        var id = it.id !== undefined ? String(it.id) : ("item" + i);
        if (!it.pair || it.pair.length !== 2) {
            error(NAME + ": item '" + id + "' needs a 'pair' with exactly two entries - skipped\n");
            continue;
        }
        var entries = [];
        var ok = true;
        for (var e = 0; e < 2; e++) {
            var en = it.pair[e] || {};
            if (!en.file) {
                error(NAME + ": item '" + id + "' pair entry " + e + " has no 'file' - skipped\n");
                ok = false;
                break;
            }
            entries.push({
                condition: en.condition !== undefined ? String(en.condition) : ("entry" + e),
                file: String(en.file),
                path: isAbsolute(String(en.file)) ? String(en.file) : joinPath(folder, String(en.file))
            });
        }
        if (!ok) continue;
        list.push({
            id: id,
            type: it.type !== undefined ? String(it.type) : "",
            targetAzimuth: it.targetAzimuth === undefined ? null : it.targetAzimuth,
            targetElevation: it.targetElevation === undefined ? null : it.targetElevation,
            entries: entries,
            identical: entries[0].condition === entries[1].condition && entries[0].file === entries[1].file
        });
    }
    return list;
}

// ---------------------------------------------------------------------------------------------
// WAV header (length and channel count of a file, without loading it)
// ---------------------------------------------------------------------------------------------

/** {ms, channels} of a WAV file, or null if it can't be read (missing file, not a WAV). */
function readWavInfo(path) {
    var f;
    try {
        f = new File(path, "read");
        if (!f.isopen) {
            post(NAME + ": WARNING cannot open " + path + "\n");
            return null;
        }
        f.byteorder = "little";
        var info = parseWav({
            size: f.eof,
            seek: function (pos) { f.position = pos; },
            chars: function (n) { return f.readchars(n).join(""); },
            u16: function () { return f.readint16(1)[0] & 0xffff; },
            u32: function () { var v = f.readint32(1)[0]; return v < 0 ? v + 4294967296 : v; }
        });
        f.close();
        if (!info) post(NAME + ": WARNING " + path + " is not a readable WAV file; using maxStimulusDurationMs\n");
        return info;
    } catch (e) {
        if (f) try { f.close(); } catch (e2) {}
        post(NAME + ": WARNING could not read " + path + ": " + e + "\n");
        return null;
    }
}

/** Parses RIFF/WAVE (incl. WAVE_FORMAT_EXTENSIBLE and RF64-free files); r = byte reader. */
function parseWav(r) {
    r.seek(0);
    if (r.chars(4) !== "RIFF") return null;
    r.u32();
    if (r.chars(4) !== "WAVE") return null;
    var pos = 12, channels = 0, sampleRate = 0, blockAlign = 0, dataBytes = -1;
    while (pos + 8 <= r.size) {
        r.seek(pos);
        var id = r.chars(4);
        var size = r.u32();
        if (id === "fmt ") {
            r.u16();                 // format tag
            channels = r.u16();
            sampleRate = r.u32();
            r.u32();                 // byte rate
            blockAlign = r.u16();
        } else if (id === "data") {
            dataBytes = size;
            break;
        }
        pos += 8 + size + (size % 2);
    }
    if (channels <= 0 || sampleRate <= 0 || blockAlign <= 0 || dataBytes < 0) return null;
    var frames = Math.floor(dataBytes / blockAlign);
    return { ms: frames / sampleRate * 1000, channels: channels, sampleRate: sampleRate };
}

// ---------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------

function checkTrial(trial, what) {
    if (!pair || trial !== currentTrial) {
        post(NAME + ":", what, "for pair", trial, "ignored (current pair", currentTrial, ")\n");
        return false;
    }
    return true;
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

function dbToLin(db) {
    return Math.pow(10, db / 20);
}

// ---------------------------------------------------------------------------------------------
// Restore state after a script reload (autowatch)
// ---------------------------------------------------------------------------------------------

function restoreAfterReload() {
    var json = persisted.get("settings");
    if (!json) return;
    post(NAME + ": script reloaded, restoring settings from the last loaded config\n");
    applySettings(String(json));
    var item = persisted.get("item");
    if (item) {
        try {
            applyItem(JSON.parse(String(item)));
        } catch (e) {
            post(NAME + ": could not restore the current item:", e, "\n");
        }
    }
}
restoreAfterReload();
