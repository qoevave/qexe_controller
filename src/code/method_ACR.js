/**
 * @fileOverview Contains all functions for setting a P910-11 test.
 * @author  Robotham., T.M
 * @version 1.0
 * @module  methods/P910.js
 */


autowatch = 1;
outlets = 2;
//exports.P910Paradigm();
//

// Global Vars
var currentSceneID = "config";
var currentUnitySceneID = "_config";
var currentVideoFile = "<null>";
var currentVideoID = "<null>";
var currentAudioConditionID = "Con_0";

// Method vars
var sliderValue;

var btnPlay = this.patcher.getnamed("btn/play");
var btnNext = this.patcher.getnamed("btn/next");
var sldrACR = this.patcher.getnamed("sldr/acr");

function setItem() {
    currentSceneID = arguments[0];
    currentUnitySceneID = arguments[1];
    currentVideoFile = arguments[2];
    currentVideoID = arguments[3];
    currentAudioConditionID = "AudioCondition_"+arguments[4];
    post('setItem:', currentSceneID, currentUnitySceneID, currentVideoFile, currentVideoID, currentAudioConditionID);
}


function WriteResult(ThisItemNumber) {
    outlet(1, "WriteResult", ThisItemNumber, JSON.stringify(ConstructDict()));
    // post("Sending to module_ResultsWriter:", ThisItemNumber, JSON.stringify(ConstructDict()), '\n');
    sldrACR.message("int", 0);
}

function ConstructDict(){
    var result = {
        "SceneID" : currentSceneID,
        "UnitySceneID" : currentUnitySceneID,
        "VideoFile" : currentVideoFile,
        "VideoID" : currentVideoID,
        "Rating" : {}
    };
    result.Rating[currentAudioConditionID] = sliderValue;
    return(result)
}

function SetCurrentRating(val){
    sliderValue = val;
}

// ********************************************
// Method Specific messages from testmanager.js 
// ********************************************


/**
 * Control weather the intermediate labels are shown or hidden on the 11-point scale.
 * @param {number} show - 0 = hide intermedate labels, 1 == show intermediate labels.
 * @this {parentPatcher}
 */
function setLabels(show) {
    if(show == 0)
    {
        this.patcher.message("script", "sendbox", "labelsOn", "set", "Off")
        for (i=0; i<6; i++)
        {
         this.patcher.message("script", "sendbox", "label"+i, "presentation", 0);
        }
    }else
    {
        this.patcher.message("script", "sendbox", "labelsOn", "set", "On")
        for (i=0; i<6; i++)
        {
         this.patcher.message("script", "sendbox", "label"+i, "presentation", 1);
        }
    }
}


