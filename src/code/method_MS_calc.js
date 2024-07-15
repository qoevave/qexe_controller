
exports.MSParadigm = function (_objtxt)
{
    var tmpTest = new Dict();               // Temp dictionary to add all tmp items too.
    var tmpItem = new Dict();               // Temp dictionary for each test item.

    var itemCount=0;                        // Count for the Scenes.

    switch (_objtxt.Modality)
    {
        // For AudioVisual tests. (All combinations)
        case "AV":
            error("Multiple Stimulus (MS) is an audio only test method... cannot test multiple parallel visual conditions in parallel. Please set the modalityRatio to 'A' in the .json file", '\n');
        break;

        case "A":
            audioConditionsArray = [];
            // Loop through all AudioConditions for each scene.
            for (k=0; k<_objtxt.audioRendering.audioVSTConditions.length; k++)
            {
                audioConditionsArray.push(k);
            }

            // Loop through scenes.
            for (i=0; i<_objtxt.Scenes.length; i++)
            {
                switch(_objtxt.Scenes[i].visualStimuliType)
                {
                    case "ODV":
                        tmpItem.set("sceneIndex", i);
                        tmpItem.set("stimuli_ID", _objtxt.Scenes[i].stimuli_ID);
                        tmpItem.set("unityScene_ID", _objtxt.Scenes[i].unityScene_ID);
                        // Will automatically take the first video file entry.
                        tmpItem.set("videoFile", _objtxt.Scenes[i].videoFiles[0].pathToFile);
                        tmpItem.set("video_ID", _objtxt.Scenes[i].videoFiles[0].video_ID);
                        tmpItem.set("audioCondition", audioConditionsArray);
                        tmpTest.append("tmpItem", tmpItem);
                        itemCount ++;
                    break;

                    case "CGI":
                        tmpItem.set("sceneIndex", i);
                        tmpItem.set("stimuli_ID", _objtxt.Scenes[i].stimuli_ID);
                        tmpItem.set("unityScene_ID", _objtxt.Scenes[i].unityScene_ID);
                        tmpItem.set("videoFile", "null");
                        tmpItem.set("video_ID", "null");
                        tmpItem.set("audioCondition", audioConditionsArray);
                        tmpTest.append("tmpItem", tmpItem);
                        itemCount ++;
                    break;
                }
            }
        break;
        
        case "V":
            error("Multiple Stimulus (MS) is an audio only test method... cannot test multiple parallel visual conditions in parallel. Please set the modalityRatio to 'A' in the .json file", '\n');
        break;
    }

    //delete tmpItem;
    return(tmpTest);
}