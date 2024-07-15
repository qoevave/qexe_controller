/**
 * @fileOverview Contains all functions controlling the SSQ questionnaire.
 * @author  Robotham., T.M
 * @version 1.0
 * @module  methods/SSQ.js
 */


autowatch = 1;


// Global Vars
var currentSceneID = "config";
var currentUnitySceneID = "_config";
var currentVideoFile = "<null>";
var currentVideoID = "<null>";
var currentAudioConditionID = "Con_0";
var multislider;

// var questions = ["GeneralDiscomfort", "Fatigue", "Headache", "Eyestrain", "DifficultyFocusing", "IncreasedSalivation", "Sweating", "Nausea", "DifficultyConcentrating", "FullnessOfHead", "BlurredVision", "Dizziness(EyesOpen)", "Dizziness(EyesClosed)", "Vertigo", "StomachAwareness", "Burping"];
var ratings = [];
var sliderValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function loadbang(){
    multislider = this.patcher.getnamed("SSQSliders");
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
            "GeneralDiscomfort" : sliderValues[0],
            "Fatigue" : sliderValues[1],
            "Headache" : sliderValues[2],
            "Eyestrain" : sliderValues[3],
            "DifficultyFocusing" : sliderValues[4],
            "IncreasedSalivation" : sliderValues[5],
            "Sweating" : sliderValues[6],
            "Nausea" : sliderValues[7],
            "DifficultyConcentrating" : sliderValues[8],
            "FullnessOfHead" : sliderValues[9],
            "BlurredVision" : sliderValues[10],
            "Dizziness(EyesOpen)" : sliderValues[11],
            "Dizziness(EyesClosed)" : sliderValues[12],
            "Vertigo" : sliderValues[13],
            "StomachAwareness" : sliderValues[14],
            "Burping" : sliderValues[15]
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
