autowatch = 1;
compile = 1;

var sldrACR = this.patcher.getnamed("slider");
var SliderValue;

function writeResult() {
    // outlet(1, currentSceneID, String(" AudioCondition: " + currentAudioConditionID), String(" Rating: "+  rating), String(" Info: " + [currentUnitySceneID, currentVideoFile, currentVideoID].join(' ')));
    outlet(0, "currentUnitySceneID", JSON.stringify(ConstructDict()));
}

function ConstructDict(){
    var result = {
        "SceneID" : "currentSceneID",
        "UnitySceneID" : "currentUnitySceneID",
        "VideoFile" : "currentVideoFile",
        "VideoID" : "currentVideoID",
        "Rating" : {
            0 : SliderValue
        }
    }
    return(result)
}

function SetRating(rating){
    SliderValue = rating;
}