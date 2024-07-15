/**
 * @fileOverview Contains all functions for setting a P910-11 test.
 * @author  Robotham., T.M
 * @version 1.0
 * @module  methods/P910.js
 */


autowatch = 1;

/**
 * Calculates the paradigm for the P910-11 test. Initially checks for the Modality 'A', 'V', or
 * 'AV'. Afterwards, loops through the scenes and audio renderers to create all the test items.
 * @param {object} _objtxt The loaded {}.json test file as a javascript object, passed from the
 * testmanager.js
 * @returns {dictionary} Dictionary of the created paradigm.
 * @access public
 */
exports.ACRParadigm = function (_objtxt)
{
    var tmpTest = new Dict();               // Temp dictionary to add all tmp items too.
    var tmpItem = new Dict();               // Temp dictionary for each test item.

    var itemCount=0;                        // Count for the Scenes.

    switch (_objtxt.testSettings.modalityRatio)
    {
        // For AudioVisual tests. (All combinations)
        case "AV":
            // Loop through scenes.
            for (i=0; i<_objtxt.Scenes.length; i++)
            {
            // Check if the scene is CGI or Video.
                switch(_objtxt.Scenes[i].visualStimuliType)
                {
                    case "ODV":
                        // Loop through the versions of different video files within a 360video scene.
                        for(j=0; j<_objtxt.Scenes[i].videoFiles.length; j++)
                        {
                            for (k=0; k<_objtxt.testSettings.audioRendering.audioVSTConditions.length; k++) {
                                tmpItem.set("sceneIndex", i);
                                tmpItem.set("stimuli_ID", _objtxt.Scenes[i].stimuli_ID);
                                tmpItem.set("unityScene_ID", _objtxt.Scenes[i].unityScene_ID);
                                tmpItem.set("videoFile", _objtxt.Scenes[i].videoFiles[j].pathToFile);
                                tmpItem.set("video_ID", _objtxt.Scenes[i].videoFiles[j].video_ID);
                                tmpItem.set("audioCondition", k);
                                tmpTest.append("tmpItem", tmpItem);
                                itemCount ++;
                            }
                        }
                    break;

                    case "CGI":
                        // There is only one version of a CGI scene.
                        // .. But still loop through all AudioConditions.
                        for (k=0; k<_objtxt.testSettings.audioRendering.audioVSTConditions.length; k++)
                        {
                            tmpItem.set("sceneIndex", i);
                            tmpItem.set("stimuli_ID", _objtxt.Scenes[i].stimuli_ID);
                            tmpItem.set("unityScene_ID", _objtxt.Scenes[i].unityScene_ID);
                            tmpItem.set("videoFile", "null");
                            tmpItem.set("video_ID", "null");
                            tmpItem.set("audioCondition", k);
                            tmpTest.append("tmpItem", tmpItem);
                            itemCount ++;
                        }
                    break;
                }
            }
        break;

        case "A":
            // Loop through scenes.
            for (i=0; i<_objtxt.Scenes.length; i++)
            {
                // Loop through all AudioConditions for each scene.
                for (k=0; k<_objtxt.testSettings.audioRendering.audioVSTConditions.length; k++)
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
                            tmpItem.set("audioCondition", k);
                            tmpTest.append("tmpItem", tmpItem);
                            itemCount ++;
                        break;

                        case "CGI":
                            tmpItem.set("sceneIndex", i);
                            tmpItem.set("stimuli_ID", _objtxt.Scenes[i].stimuli_ID);
                            tmpItem.set("unityScene_ID", _objtxt.Scenes[i].unityScene_ID);
                            tmpItem.set("videoFile", "null");
                            tmpItem.set("video_ID", "null");
                            tmpItem.set("audioCondition", k);
                            tmpTest.append("tmpItem", tmpItem);
                            itemCount ++;
                        break;
                    }
                }
            }
        break;

        case "V":
            // Loop through scenes.
            for (i=0; i<_objtxt.Scenes.length; i++)
            {
            // Check if the scene is CGI or Video.
                switch(_objtxt.Scenes[i].visualStimuliType)
                {
                    case "ODV":
                        // Loop through the versions of different video files within a 360video scene.
                        for(j=0; j<_objtxt.Scenes[i].videoFiles.length; j++)
                        {
                            tmpItem.set("sceneIndex", i);
                            tmpItem.set("stimuli_ID", _objtxt.Scenes[i].stimuli_ID);
                            tmpItem.set("unityScene_ID", _objtxt.Scenes[i].unityScene_ID);
                            tmpItem.set("videoFile", _objtxt.Scenes[i].videoFiles[j].pathToFile);
                            tmpItem.set("video_ID", _objtxt.Scenes[i].videoFiles[j].video_ID);
                            tmpItem.set("audioCondition", 0);
                            tmpTest.append("tmpItem", tmpItem);
                            itemCount ++;
                        }
                    break;

                    case "CGI":
                        // There is only one version of a CGI scene.
                        tmpItem.set("sceneIndex", i);
                        tmpItem.set("stimuli_ID", _objtxt.Scenes[i].stimuli_ID);
                        tmpItem.set("unityScene_ID", _objtxt.Scenes[i].unityScene_ID);
                        tmpItem.set("videoFile", "null");
                        tmpItem.set("video_ID", "null");
                        tmpItem.set("audioCondition", 0);
                        tmpTest.append("tmpItem", tmpItem);
                        itemCount ++;
                    break;
                }
            }
        break;
    }

    //delete tmpItem;
    return(tmpTest);
}



