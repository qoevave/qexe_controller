/**
 * @fileOverview Contains all functions controlling the NASA-TLX questionnaire.
 * @author  Robotham., T.M
 * @version 1.0
 * @module  questionnaireNASATLX.js
 */

autowatch = 1;

// Global Vars
var currentSceneID = "config";
var currentUnitySceneID = "_config";
var currentVideoFile = "<null>";
var currentVideoID = "<null>";
var currentAudioConditionID = "Con_0";
var multislider;

// var questions = ["MentalDemand", "PhysicalEffort", "TemporalDemand", "Performance", "Effort", "Frustration"];
var sliderValues = [0, 0, 0, 0, 0, 0];

function loadbang(){
    multislider = this.patcher.getnamed("NasaSliders");
}


function setTest(){
    // Placeholder - do not remove. 
}


function setItem() {
    currentSceneID = arguments[0];
    currentUnitySceneID = arguments[1];
    currentVideoFile = arguments[2];
    currentVideoID = arguments[3];
    currentAudioConditionID = String("Con_"+arguments[4]);
}


function WriteResult(ThisItemNumber) {
    try{
        outlet(0, "WriteQuestionnaire", ThisItemNumber, JSON.stringify(ConstructDict()));
        multislider.int(0);
    }catch (err){
        error("Error", String(err), '\n');
    }
}

function ConstructDict(){
    var result = {
        "SceneID" : currentSceneID,
        "UnitySceneID" : currentUnitySceneID,
        "VideoFile" : currentVideoFile,
        "VideoID" : currentVideoID,
        "Rating" : {
            "MentalDemand" : sliderValues[0],
            "PhysicalEffort" : sliderValues[1],
            "TemporalDemand" : sliderValues[2],
            "Performance" : sliderValues[3],
            "Effort" : sliderValues[4],
            "Frustration" : sliderValues[5]
            }
        };
    return(result)
}


function SetCurrentRating(){
    for(var i = 0; i < arguments.length; i++){
        sliderValues[i] = arguments[i];
    }
    // post(sliderValues, '\n');
}
