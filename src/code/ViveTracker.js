
const fs = require("fs");
const path = require("path");
const util = require("util");
const max = require("max-api");
const os = require("os");

max.post('ViveTracker.js instantiated');

var trackerStreamOpen = false;

var trackerStream;

var sceneID = "null"

var audioFile = "null"

var videoFile = "null"

max.addHandler('receiveItemInformation', (...args) => 
{
    audioFile = args[0]
    videoFile = args[1]
    sceneID = [2]
});


max.addHandler('receiveTracking', (...args) =>
{
    if(trackerStreamOpen) {
        trackerStream.write(audioFile + sceneID + "rotation " + String(args + '\n'));
    }
});

max.addHandler('receiveMaxMessages', (...args) =>
{
    if(trackerStreamOpen) {
        trackerStream.write(audioFile + sceneID + "maxMessage " + String(args + '\n'));
    }
});

max.addHandler('giveResultsDir', (fileToReceive) => {

    max.post(fileToReceive, '\n');

    try
    {
        if(trackerStreamOpen) {
            trackerStreamOpen.close();
            trackerStreamOpen = false;
            max.post("Closed previous tracker node.js stream.");
        }
    }catch(error){
        max.post("Error in closing tracker write stream:", error, '\n');
    }

    // Create an append and write tracker.txt stream.
    try{
        trackerStream = fs.createWriteStream(fileToReceive + "/Tracker.txt", {flags:'a+'});
    }catch(error){
        max.post("Error in results createWriteStream():", error, '\n');
    }

    trackerStream.write("Test started" + '\n');
    trackerStreamOpen = true;
});


max.addHandler('restart', () => {
    if(trackerStreamOpen) {
        max.post("ViveTracker.js closing streams");
        trackerStream.close();
        trackerStreamOpen = false;
    }

    sceneID = "null"
    audioFile = "null"
    videoFile = "null"
});

