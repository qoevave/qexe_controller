/**
 * @fileOverview Contains all functions controlling the PointAllocation questionnaire.
 * @author  Robotham., T.M
 * @version 1.0
 * @module  methods/PointAllocation.js
 */


autowatch = 1;


// Global Vars
var currentSceneID = "config";
var currentUnitySceneID = "_config";
var currentVideoFile = "<null>";
var currentVideoID = "<null>";
var currentAudioConditionID = "Con_0";
var multislider;

var ratings = [];
var sliderValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function loadbang(){
    multislider = this.patcher.getnamed("Sliders");
}


// function writeQuestionnaire() {
//     answers = mapRatings(arguments)
//     outlet(0, currentSceneID, String(" AudioCondition: " + currentAudioConditionID), String(" Questionnaire: " + answers.join(' ')), String(" Info: " + [currentUnitySceneID, currentVideoFile, currentVideoID].join(' ')));
//     //outlet(0, currentSceneID, String(" AudioCondition: " + currentAudioConditionID), String(" Rating: "+  rating), String(" Info: " + [currentUnitySceneID, currentVideoFile, currentVideoID].join(' ')));
// }

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
            "Attribute.1" : sliderValues[0],
            "Attribute.2" : sliderValues[1],
            "Attribute.3" : sliderValues[2],
            "Attribute.4" : sliderValues[3],
            "Attribute.5" : sliderValues[4],
            "Attribute.6" : sliderValues[5],
            "Attribute.7" : sliderValues[6],
            "Attribute.8" : sliderValues[7],
            "Attribute.9" : sliderValues[8],
            "Attribute.10" : sliderValues[9],
            "Attribute.11" : sliderValues[10],
            "Attribute.12" : sliderValues[11],
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

// function mapRatings(ratings) {
//     answers = [];
//     for(i=0;i<16;i++) {
//         answers.push(questions[i]);
//         answers.push(ratings[i]);
//     }
//     return answers;
// }
