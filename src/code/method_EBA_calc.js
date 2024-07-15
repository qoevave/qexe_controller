
/**
 * Calculates the paradigm for the P910-11 test. Initially checks for the Modality 'A', 'V', or
 * 'AV'. Afterwards, loops through the scenes and audio renderers to create all the test items.
 * @param {object} _objtxt The loaded {}.json test file as a javascript object, passed from the
 * testmanager.js
 * @returns {dictionary} Dictionary of the created paradigm.
 * @access public
 */
exports.EBAParadigm = function (_objtxt)
{
    var tmpTest = new Dict();               // Temp dictionary to add all tmp items too.
    var tmpItem = new Dict();               // Temp dictionary for each test item.

    var itemCount=0;                        // Count for the Scenes.

    switch (_objtxt.testSettings.modalityRatio)
    {
        // For AudioVisual tests. (All combinations)
        case "AV":
            error("Elimination-by-Aspects (EBA) is an audio only test method... cannot test multiple parallel visual conditions in parallel. Please set the modalityRatio to 'A' in the .json file", '\n');
        break;

        case "A":
            audioConditionsArray = [];
            // Loop through all AudioConditions for each scene.
            for (k=0; k<_objtxt.testSettings.audioRendering.audioVSTConditions.length; k++)
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
            error("Elimination-by-Aspects (EBA) is an audio only test method... cannot test multiple parallel visual conditions in parallel. Please set the modalityRatio to 'A' in the .json file", '\n');
        break;
    }

    //delete tmpItem;
    return(tmpTest);
}