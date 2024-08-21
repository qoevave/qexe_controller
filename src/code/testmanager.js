/**
 * @fileOverview Contains all functions used to read the configuration file and parse all required
 * information to Max.
 *
 * @author  Robotham., T.M
 * @version 2.0
 * @module  testmanager.js
 */

autowatch = 1;
inlets = 2;
outlets = 6;

setTestMethod.local = 1;

// Import class functions. 
var utilsmodule = require("utils");
var _method_MS_calc = require("method_MS_calc");            // Multiple stimulus comparison method (without reference).
var _method_MUSHRA_calc = require("method_MUSHRA_calc");    // MuSHRA method (with reference)
var _method_ACR_calc = require("method_ACR_calc");          // Simgle stimulus rating method. 
var _method_EBA_calc = require("method_EBA_calc");          // Elimination by Aspects method. 
var _method_PC_calc = require("method_PC_calc");            // PC method. 

var outlet_JSON = 0;

/**
 * Loaded {}.json file stored as Javascript object.
 * @type {object}
 */
var _objtxt;

/**
 * Constructed test paradigm from the .json file stored as a Javascript object.
 * @type {object}
 */
var _objParadigm;

// File paths. 
var PATCHDIRECTORY;
var CONTENTDIRECTORY = null;
var RESULTSDIRECTORY = null;
var VSTDIRECTORY = null;

// Object variables.
var randomization = [];
var currentSceneIndex = -1;

// Audio rendering 
var numberOfAudioRenderingVSTs = 0;

// local objects from top level patcher used to send information directly to modules. 
var SENDTO_PANEL_TEST_INFORMATION = this.patcher.getnamed("send_to_panel_test_information");
var SENDTO_PANEL_SCENE_INFORMATION = this.patcher.getnamed("send_to_panel_current_scene_information");
var SENDTO_PANEL_AUDIO_INFORMATION = this.patcher.getnamed("send_to_panel_audio_information");
var SEND_PANEL_DIRECTORY_INFORMATION= this.patcher.getnamed("send_to_panel_directory_information");
var SEND_PANEL_CURRENT_ITEM_SIMPLE = this.patcher.getnamed("send_panel_current_item_display_simple");
var SEND_MODULE_METHOD_QUESTIONNAIRE = this.patcher.getnamed("send_to_module_methods_questionnaire");
var SEND_MODULE_OSC_MANAGER = this.patcher.getnamed("send_to_module_osc_manager");
var SEND_MODULE_RESULTS_WRITER = this.patcher.getnamed("send_to_module_results_writer");

/**
 * Sets the path of the loaded main.maxpat for the local machine. Needed to tansfer the relative
 * paths to absolute paths for audio data.
 * @param {string} dir Local directory of the main.maxpat
 */
function SetLocalDirectory(dir)
{
    PATCHDIRECTORY = dir;
    post("Setting local directory: ", dir, "\n");
    //SEND_PANEL_DIRECTORY_INFORMATION.message("DisplayWorkingDirectory", PATCHDIRECTORY);
}

function SetResultsDirectory(dir){
    RESULTSDIRECTORY = dir;
    post("Setting results directory: ", dir, "\n");
    SEND_MODULE_RESULTS_WRITER.message("OpenFolder", dir);
}



/**
 * Loads a {}.json file and configures the test.
 * A {}.json file is loaded and stored into a local Max dict object. Afterwards, this is parsed
 * into a javascript object which can be accessed at any time to load various aspects of the test.
 * @param {string} filePath - Absolute path to the {}.json file location.
 * @access public
 */
function loadTest(filePath)
{
    var dict = new Dict;
    dict.import_json(filePath);

    // Output the dict to a dict.view class for viewing in the visual environment.
    outlet(outlet_JSON, "json", 'clear');
    outlet(outlet_JSON, "json", "dictionary", dict.name);

    // load the JSON file as a String.
    var fileString = utilsmodule.loadFile(filePath);
    SEND_PANEL_DIRECTORY_INFORMATION.message("DisplayTestFile", filePath);

    // Removes any dynamically created objects in max patches. 
    // Objects created dynamically should be instantiated as global variables to be accessed in all functions. 
    clearPatchDynamicObjects();

    // Convert the string to a javascript object.
    try{
        _objtxt = JSON.parse(fileString);
    }catch(e){
        error("Error loading file:", e);
    }

    // Set the incoming and outgoing UPD port information for osc messages.
    // setNetwork();

    // Load in the correct questionnaire class.
    setQuestionnaire(_objtxt.testSettings.questionnaireType,
                     _objtxt.testSettings.questionnaireIntegration);

    // Load in the correct method class and configure the test.
    numberOfAudioRenderingVSTs = _objtxt.testSettings.audioRendering.audioVSTConditions.length;
    setTestMethod(_objtxt.testSettings.methodType);

    // Calculate the paradigm based of off the set variables in the JSON.
    calculateParadigm();

    // Randomize the order of test items. 
    randomizeSequence();

    // Set directories. 
    SEND_MODULE_RESULTS_WRITER.message("OpenFolder", RESULTSDIRECTORY);
    CONTENTDIRECTORY = _objtxt.testSettings.pathToAudioVideoScenesContent;
    SEND_PANEL_DIRECTORY_INFORMATION.message("DisplayContentDirectory", CONTENTDIRECTORY);

    // Reset the test back to the _Main scene if a new file is opened.
    UpdateScenePanelInformation(-1);

    // Set the information in the OSC manager. 
    SetOSCManager();

    // Set the condition info to resultsWriter and Method.
    SetaudioConditions(_objtxt.testSettings.audioRendering);

    // Generic test information.
    DisplayTestInformation();
}


/**
 * Clear this.patcher of any dynamic objects.
 * @access protected
 */
function clearPatchDynamicObjects() {
    if(_objtxt) {
        //this.patcher.remove(_methodObject);
    }
}


/**
 * Resets the test to the _config scene.
 * Sends out _config scene information to `outlet[1]` and `outlet[3]` for GUI display and test
 * modules.
 * Sends out clear messages to `outlet[2]` to reset audio routing matrix.
 * Restarts the results writer via `outlet[5]` to stop any currently open write streams.
 * @access protected
 */
function UpdateScenePanelInformation(SceneIndex) {

    if(SceneIndex == -1)
    {
        post("Scene 0 selected... returning to _confg", "\n");
        currentSceneIndex = -1;

        SENDTO_PANEL_AUDIO_INFORMATION.message("ClearBuffer");

        SEND_MODULE_METHOD_QUESTIONNAIRE.message("setItem", 
                                                "config", 
                                                "_config", 
                                                "null", 
                                                "null", 
                                                0);

        SEND_PANEL_CURRENT_ITEM_SIMPLE.message("itemIndex", 0);

        SEND_MODULE_RESULTS_WRITER.message("Restart");

        SENDTO_PANEL_SCENE_INFORMATION.message("ItemIndex", 0);
        SENDTO_PANEL_SCENE_INFORMATION.message("DisplayInformation", 
                                                "config",   //stimuli_ID
                                                "_config",  //unityScene_ID
                                                "null");     
        SENDTO_PANEL_SCENE_INFORMATION.message("DisplayDimensions", " ");
        SENDTO_PANEL_SCENE_INFORMATION.message("ToggleDimensionsLabel", 0);
        SENDTO_PANEL_SCENE_INFORMATION.message("DisplayVisualInformation", "CGI (Computer generated imagery)", "null");
    }else{ 
        SENDTO_PANEL_SCENE_INFORMATION.message("DisplayInformation", 
                                                _objtxt.Scenes[SceneIndex].stimuli_ID,          //stimuli_ID
                                                _objtxt.Scenes[SceneIndex].unityScene_ID,     //unityScene_ID
                                                SceneIndex+1)                                //SceneIndex
                                                //_objtxt.Scenes[SceneIndex].visualStimuli);   //Visuals   
        
        SENDTO_PANEL_SCENE_INFORMATION.message("ItemIndex", currentSceneIndex+1);                                
        
        SEND_PANEL_CURRENT_ITEM_SIMPLE.message("itemIndex", currentSceneIndex+1);

        

        // Check if CGI or VIDEO.
        if (_objtxt.Scenes[SceneIndex].visualStimuliType == "CGI")
        {
            SENDTO_PANEL_SCENE_INFORMATION.message("ToggleDimensionsLabel", 1);
            SENDTO_PANEL_SCENE_INFORMATION.message("DisplayDimensions", String(
                _objtxt.Scenes[SceneIndex].dimensions[0] + " " +
                _objtxt.Scenes[SceneIndex].dimensions[1] + " " +
                _objtxt.Scenes[SceneIndex].dimensions[2]));
            SENDTO_PANEL_SCENE_INFORMATION.message("DisplayVisualInformation", 
                                                    "CGI (Computer generated imagery)", 
                                                    "null");
        }else{
            SENDTO_PANEL_SCENE_INFORMATION.message("ToggleDimensionsLabel", 0);
            SENDTO_PANEL_SCENE_INFORMATION.message("DisplayDimensions", " ");
            SENDTO_PANEL_SCENE_INFORMATION.message("DisplayVisualInformation", 
                                                    "ODV (Omni-directional video)", 
                                                    _objParadigm.tmpItem[randomization[currentSceneIndex]].videoFile);

        }
    }
}


/**
 * Sets the network port and IP address information from the {}.json file via `outlet[4]` to the
 * OSCManager.
 * @access protected
 */
function SetOSCManager() {

    SEND_MODULE_OSC_MANAGER.message("setOSC", 
                                    _objtxt.testSettings.ip,  
                                    _objtxt.testSettings.udpPortOut, 
                                    _objtxt.testSettings.udpPortIn);

    SEND_MODULE_OSC_MANAGER.message("SetLocalVars", 
                                    "set_paradigm_info", 
                                    _objtxt.testSettings.methodType,                     // set method.
                                    numberOfAudioRenderingVSTs,         // set number of VST loaded.
                                    _objtxt.testSettings.questionnaireType,         // set type of questionnaire.
                                    _objtxt.testSettings.questionnaireIntegration, // set the intrgation mode of the questionnaire. 
                                    _objtxt.testSettings.repetionMultiplier);       // set the number of repetitions for the test.            
}

/**
 * Sets which questionnaire module should be loaded into the tool.
 * Sends the information to `outlet[1]` to GUI display, and to the results writer to have the
 * questionnaire details.
 * @param {string} questionnaire Name of questionnaire defined in the .json file.
 * @tutorial Adding A Questionnaire
 */
function setQuestionnaire(questionnaireType, integrationType) {

    if(questionnaireType === null){
        SEND_MODULE_RESULTS_WRITER.message("SetInfoForQuestionnaire", 
                                            0, 
                                            "null", 
                                            "None");
        return;
    }

    switch (questionnaireType)
    {
        case 'SSQ':          
            SEND_MODULE_METHOD_QUESTIONNAIRE.message("patch", "script sendbox bpatcherQuestionnaire replace questionnaire_SSQ");
            break;

        case "NASA-TLX":
            SEND_MODULE_METHOD_QUESTIONNAIRE.message("patch", "script sendbox bpatcherQuestionnaire replace questionnaire_NASA-TLX");
            break;
        
        case "PointAllocation":
            SEND_MODULE_METHOD_QUESTIONNAIRE.message("patch", "script sendbox bpatcherQuestionnaire replace questionnaire_PointAllocation");
            break;

        default :
            error("Error: questionnaireType : ", questionnaireType, " is not recognized in .json file.", "\n");
    }

    post("Importing questionnaire:", questionnaireType, '\n');
    SEND_MODULE_RESULTS_WRITER.message("SetInfoForQuestionnaire", 
                                        1, 
                                        questionnaireType, 
                                        integrationType);
}

/**
 * Dynamically sets the correct Max code for the required methodology listed in the {}.json file
 * (_objtxt).
 * Loading Method Code
 * `outlet[3]` of the testManager.js connects direct to the methodology container. The methodology
 * defined in the .json file will be loaded into the container using bpatcher objects in
 * presentation view. After the methodology patch is loaded, further information from testManager.js
 * can be sent to initialize the test (i.e., number of parallel conditions).
 *
 * @param {string} method - Name of methodology to load, defined in {}.json "TestMethod" Key.
 * @access protected
 * @tutorial Adding A Method
 */
function setTestMethod(method) {
    switch (method)
    {
        case 'ACR':
            post("Importing test methodology: ", method, "\n");
            SEND_MODULE_METHOD_QUESTIONNAIRE.message("patch", "script sendbox bpatcherMethod replace method_ACR");
            break;

        case 'MS':
            post("Importing test methodology: ", method, "\n");
            SEND_MODULE_METHOD_QUESTIONNAIRE.message("patch", "script sendbox bpatcherMethod replace method_MS");
            SEND_MODULE_METHOD_QUESTIONNAIRE.message("setTest", numberOfAudioRenderingVSTs);
            break;

        case 'PC':
            post("Importing test methodology: ", method, "\n");
            SEND_MODULE_METHOD_QUESTIONNAIRE.message("patch", "script sendbox bpatcherMethod replace method_PC");
            SEND_MODULE_METHOD_QUESTIONNAIRE.message("setTest",numberOfAudioRenderingVSTs, _objtxt.testSettings.repetionMultiplier);
            break;

        case 'MUSHRA':
            SEND_MODULE_METHOD_QUESTIONNAIRE.message("patch", "script sendbox bpatcherMethod replace method_MUSHRA");
            SEND_MODULE_METHOD_QUESTIONNAIRE.message("setTest", numberOfAudioRenderingVSTs);         
            break;

        case 'EBA':
            SEND_MODULE_METHOD_QUESTIONNAIRE.message("patch", "script sendbox bpatcherMethod replace method_EBA");
            SEND_MODULE_METHOD_QUESTIONNAIRE.message("setTest", numberOfAudioRenderingVSTs);
            break;

        default:
            error("Error: methodType : ", method, " is not recognized in .json file.", "\n");
    }
}

/**
 * Shows generic test information to display module for the user. Provides some console information
 * regarding the type of "Modality" defined in the {}.json file (A, V, or AV) <br>
 * `outlet[1]` sends the test information to testinfogeneric.maxpat module.
 * @access protected
 */
function DisplayTestInformation() {
    SENDTO_PANEL_TEST_INFORMATION.message("DisplayInformation",  
                                            _objtxt.testSettings.methodType,
                                            _objtxt.testSettings.modalityRatio,
                                            _objtxt.testSettings.questionnaireType,
                                            _objtxt.testSettings.questionnaireIntegration,
                                            _objtxt.testSettings.udpPortIn,
                                            _objtxt.testSettings.udpPortOut,
                                            _objtxt.testSettings.ip); 

    giveUserModalityDescriptions(_objtxt.testSettings.modalityRatio);
}

/**
 * Sets the information for the conditions. Creates an array, and sends to `outlet[5]` to the
 * resultsWriter, which is used a legend to save the audio conditions employed.
 * Initializes the number of voices on the poly~ object to the number of VSTs.
 */
function SetaudioConditions(AudioRendering) {
    if (AudioRendering.active === 1){

        SENDTO_PANEL_AUDIO_INFORMATION.message("SetButtons", 
                                                AudioRendering.renderingPipeline, 
                                                AudioRendering.audioVSTConditions.length);

        var ConditionIDArray = [];      // Array of dll id's for results.
        var ConditionPathArray = [];    // Array of paths/to/dlls for results.
        var HRTFInfoArray = [];         // HRTF info for the results.
        var ParameterMap = [];          // Parameter maps used for the conversion of coordinate systems for results. 
        vstindex = 0;                   // Int for connecting the VST outlets.

        for(i=0; i<AudioRendering.audioVSTConditions.length; i++){

            // Set the poly~ VST target (needs to be done in separate message)
            SENDTO_PANEL_AUDIO_INFORMATION.message("VSTContainer", 
                                                    AudioRendering.renderingPipeline, 
                                                    "target", (i+1));

            // Load the VST to the correct poly~ VST object.                                         
            SENDTO_PANEL_AUDIO_INFORMATION.message("VSTContainer", 
                                                    AudioRendering.renderingPipeline, 
                                                    "load", 
                                                    AudioRendering.pathToVSTs + "/" + AudioRendering.audioVSTConditions[i].vst, 
                                                    AudioRendering.pathToVSTs + "/" + AudioRendering.audioVSTConditions[i].vstParameterMap, 
                                                    vstindex);
            vstindex = vstindex + 2;

            // Push information to ConditionIDArray for the results file.  
            ConditionIDArray.push(AudioRendering.audioVSTConditions[i].conditionID);
            ConditionPathArray.push(AudioRendering.audioVSTConditions[i].vst);
            HRTFInfoArray.push(AudioRendering.audioVSTConditions[i].hrtf)
            ParameterMap.push(AudioRendering.audioVSTConditions[i].vstParameterMap ? AudioRendering.audioVSTConditions[i].vstParameterMap : "null");
        }
        SEND_MODULE_RESULTS_WRITER.message("SetConditionID", ConditionIDArray);
        SEND_MODULE_RESULTS_WRITER.message("SetConditionPath", ConditionPathArray);
        SEND_MODULE_RESULTS_WRITER.message("SetConditionHRTF", HRTFInfoArray);
        SEND_MODULE_RESULTS_WRITER.message("SetConditionParameterMap", ParameterMap);
    }
}


// ********** Test Control **********

/**
 * Called either externally via the user, or when the last test item ticks over.
 * @access protected
 */
function restart() {
    randomizeSequence();
    UpdateScenePanelInformation(-1);
}


/**
 * Handles whether the /nextItem function call from the client either wants to 'get' the next scene,
 * or 'set' the current scene in the host. 'Get' calls, send next item information to `outlet[4]` to
 * oschandler.js to send to the client.
 * @access protected
 * @param {string} OSCMessage 'get' or 'set' call.
 */
function OSCCall(OSCMessage) {
    // Run if clients wants to know the next scene information.
    if (OSCMessage === 'getitem') {
        if (currentSceneIndex+1 >= _objParadigm.tmpItem.length) {
            SEND_MODULE_OSC_MANAGER.message('SendToUnity', 
                                            'give_unity_scene_item',   
                                            "_config");
        }else {
            // For loading a new unity scene.
            SEND_MODULE_OSC_MANAGER.message('SendToUnity',
                                            'give_unity_scene_item',
                                            _objParadigm.tmpItem[randomization[currentSceneIndex+1]].unityScene_ID);

            // Additional call to send the visual video file if it's a 360 video scene.  
            if(_objParadigm.tmpItem[randomization[currentSceneIndex+1]].unityScene_ID === '_videoPlayer' || _objParadigm.tmpItem[randomization[currentSceneIndex+1]].unityScene_ID === '_videoPlayerSimulator' ){
                var NextvideoFile = CONTENTDIRECTORY + "/" + _objParadigm.tmpItem[randomization[currentSceneIndex+1]].videoFile;
                var Nextvideo_ID = _objParadigm.tmpItem[randomization[currentSceneIndex+1]].video_ID;

                SEND_MODULE_OSC_MANAGER.message('SendToUnity',
                                                'give_unity_video_info',
                                                NextvideoFile, 
                                                Nextvideo_ID);
            }else{
                SEND_MODULE_OSC_MANAGER.message('SendToUnity',
                                                'give_unity_video_info',
                                                "null",
                                                0);
            }
        }
    }
    // Run if client wants to set the next scene in the host.
    if (OSCMessage === 'setitem') {
        selectItem('set');
    }

    if (OSCMessage === 'getdirectory'){
        SEND_MODULE_RESULTS_WRITER.message("GiveSubjectsResultsFile");
    }
}


/**
 * Selects an item in the _objParadigm dict, to set as the current item. This can be called
 * either via the user interface, or through button presses in the client.
 * @param {anything} ItemNumber Called with a number will jump to the selected item. Called with a
 * string (bang) will increment to the next item.
 * @access protected
 */
function selectItem(ItemNumber) {
    if (_objParadigm)
    {
        // Increment current item based on Bang input - used when actually doing a test.
        if(typeof ItemNumber === 'string') {

            // Make sure the results for the current scene in the TestMethod continer is being
            // saved, before selecting the next item.
            SEND_MODULE_METHOD_QUESTIONNAIRE.message("WriteResult", currentSceneIndex+1);

            currentSceneIndex++;
            if (currentSceneIndex >= _objParadigm.tmpItem.length) {
                post("-----------------------------------------", '\n', "Test complete, returning to _config", '\n');
                restart();
            }else {
                post("-----------------------------------------", '\n', "Selected Item: ", randomization[currentSceneIndex]+1, '\n');
                SelectSceneCondition(_objParadigm.tmpItem[randomization[currentSceneIndex]].sceneIndex);

                // Do not send the audio condition if the test paradigm is PairedComparison. 
                // This is handled in the method script itself. 
                if(_objtxt.testSettings.methodType != 'PC'){
                    SEND_MODULE_METHOD_QUESTIONNAIRE.message("setItem",
                                                            _objParadigm.tmpItem[randomization[currentSceneIndex]].stimuli_ID,
                                                            _objParadigm.tmpItem[randomization[currentSceneIndex]].unityScene_ID,
                                                            _objParadigm.tmpItem[randomization[currentSceneIndex]].videoFile,
                                                            _objParadigm.tmpItem[randomization[currentSceneIndex]].video_ID,
                                                            _objParadigm.tmpItem[randomization[currentSceneIndex]].audioCondition);
                }else{
                    SEND_MODULE_METHOD_QUESTIONNAIRE.message("setItem",
                                                            _objParadigm.tmpItem[randomization[currentSceneIndex]].unityScene_ID,
                                                            _objParadigm.tmpItem[randomization[currentSceneIndex]].videoFile,
                                                            _objParadigm.tmpItem[randomization[currentSceneIndex]].video_ID);
                }
            }
        }


        // Set item based on int input - used when debugging.
        if (typeof ItemNumber === 'number') {
            currentSceneIndex = ItemNumber-1;

            post("Entered:", ItemNumber, '\n');

            if (currentSceneIndex >= _objParadigm.tmpItem.length) {
                post("Test Item", ItemNumber, "does not exist.", '\n');
            }

            if (currentSceneIndex == -1){
                UpdateScenePanelInformation(-1);
            }

            if (currentSceneIndex >= 0 && currentSceneIndex < _objParadigm.tmpItem.length)
            {
                post("-----------------------------------------", '\n', "Jumped to Item: ", randomization[currentSceneIndex]+1, '\n');
                SelectSceneCondition(_objParadigm.tmpItem[randomization[currentSceneIndex]].sceneIndex);
            }
        }
    }
}


/**
 * When called, will send out all information for the selected scene in the {}.json file. <br>
 * `outlet[1]` send scene information (visuals type, degrees-of-freedom, stimuli_ID ... ).
 * @param {number} val - Index of the requested scene. selectSceneCondition(1) corresponds to
 * `index[0]` in the {}.json file. Calling selectSceneCondition(0) will reset the scene back to
 * the default _config.
 * @access public
 */
function SelectSceneCondition(currentSceneCondition) {
    if (_objtxt)    // If a json test file is loaded.
    {
        if (currentSceneCondition >= 0 && currentSceneCondition < _objtxt.Scenes.length)
        {
            LoadAudioFolders(currentSceneCondition);                // Send the folder to polybuffer to load audio files.
            UpdateScenePanelInformation(currentSceneCondition);     // Update the scene information on various GUI panels. 
        }
    }
}

/**
 * Gets the directory containing the audio files used for this scene. Called from within
 * 'selectSceneCondition()'. `outlet[1]` send the information containing scene audio to the
 * sceneAudioInfo.maxpat.
 *
 * @param {number} val - Index of the scene requested.
 * @access protected
 */
function LoadAudioFolders(SelecedScene) {


    var multichannelAudioFile = _objtxt.Scenes[SelecedScene].multichannelAudio.multichannelAudioFile = null ? "null" : _objtxt.Scenes[SelecedScene].multichannelAudio.multichannelAudioFile;
    var objectsFolder =  _objtxt.Scenes[SelecedScene].objectAudio.objectAudioFolder = null ? "null" : _objtxt.Scenes[SelecedScene].objectAudio.objectAudioFolder;


    SENDTO_PANEL_AUDIO_INFORMATION.message("ClearBuffer");


    if(_objtxt.testSettings.audioRendering.renderingPipeline === "Objects" && objectsFolder != null){

        var all_sources_list = [];
        var autoplay_sources_list = [];

        for(i=0;i<_objtxt.Scenes[SelecedScene].objectAudio.objectAudioRouting.length;i++) {

            all_sources_list.push(_objtxt.Scenes[SelecedScene].objectAudio.objectAudioRouting[i].inputChannel);
            autoplay_sources_list.push(_objtxt.Scenes[SelecedScene].objectAudio.objectAudioRouting[i].autoplay);

            SENDTO_PANEL_AUDIO_INFORMATION.message("ObjectRouting", i, _objtxt.Scenes[SelecedScene].objectAudio.objectAudioRouting[i].inputChannel, 1, _objtxt.Scenes[SelecedScene].objectAudio.objectAudioRouting[i].pathToFile);            SENDTO_PANEL_AUDIO_INFORMATION.message("RouteLoop", i+1, "loop", autoplay_sources_list[i]);

            post("Object Routing: ",  _objtxt.Scenes[SelecedScene].stimuli_ID, i, _objtxt.Scenes[SelecedScene].objectAudio.objectAudioRouting[i].inputChannel, 1, "\n");
        }
        var unique_virtual_sources_list = all_sources_list.filter(removeDuplicates);

        SENDTO_PANEL_AUDIO_INFORMATION.message("SetObjectsInformation", 
                                                CONTENTDIRECTORY, 
                                                _objtxt.Scenes[SelecedScene].objectAudio.objectAudioFolder,
                                                _objtxt.Scenes[SelecedScene].objectAudio.objectAudioRouting.length,
                                                unique_virtual_sources_list.length);
   }

    if(_objtxt.testSettings.audioRendering.renderingPipeline === "Multichannel" && multichannelAudioFile != null){
        // Send out folder for ambisonics audio.
        SENDTO_PANEL_AUDIO_INFORMATION.message("SetMultichannelInformation", 
                                                CONTENTDIRECTORY, 
                                                _objtxt.Scenes[SelecedScene].multichannelAudio.multichannelAudioFile);
    }
}


function removeDuplicates(c, index, array) {
    return(array.indexOf(c) === index);
}



// *********** Test Calculation **********


/**
 * Calls a set of functions depending on which TestMethod is defined in the {}.json file. Calls the
 * method specific code (defined in the methods/* directory) which should return a type dict of the
 * constructed paradigm. For each test item, the constructed paradigm must be have information
 * containing: sceneIndex, unityScene_ID, videoFile (if Simulated content, set to 0), and the audio
 * condition. <br>
 *
 * The paradigm is saved to a local tmp {}.json file and re-imported as a javascript object. This is
 * to check weather the created paradigm has been constructed correctly. If not, parsing of the
 * {}.json file will catch an error. <br>
 *
 *  `outlet[0]` = Sends information to the padarigm dictionary GUI display. <br>
 *  `outlet[1]` = Send the number of items in the paradigm to the GUI test information display.
 * @param  {string} method TestMethod defined in the {}.json file.
 * @access protected
 */
function calculateParadigm() {
    var objtmptxt = "";
    var thisTest = new Dict("thisTest");            // Dictionary for the test.

    switch(_objtxt.testSettings.methodType)                                  // Create the paradigm.
    {
        case 'ACR':
            thisTest = _method_ACR_calc.ACRParadigm(_objtxt);
            break;

        case 'MS':
            //thisTest = _method_MS_calc.MSParadigm(_objtxt);
            thisTest = _method_EBA_calc.EBAParadigm(_objtxt);
            break;

        case 'PC':
            thisTest = _method_PC_calc.PCParadigm(_objtxt);
            break;

        case 'MUSHRA':
            thisTest = _method_MUSHRA_calc.MUSHRAParadigm(_objtxt);
            break;

        case 'EBA':
            thisTest = _method_EBA_calc.EBAParadigm(_objtxt);
            break;

        default :
            error("Test method does not currently exist. Cannot construct test items. '\n' ");
            break;
    }


    outlet(outlet_JSON, "paradigm", 'clear');
    outlet(outlet_JSON, "paradigm", "dictionary", thisTest.name);

    thisTest.export_json("jsontmp.json");           // Export the paradigm to a json file.
    var objtmptxt = utilsmodule.loadFile("jsontmp.json");       // Reimport the paradigm json.

    try {
        _objParadigm = JSON.parse(objtmptxt);       // Parse into a javascript object.
    } catch (e) {
        post("Error parsing jsontmp.json");
        return false;
    }


    SEND_PANEL_CURRENT_ITEM_SIMPLE.message("numberOfItems", 
                                            _objParadigm.tmpItem.length);

    SEND_MODULE_RESULTS_WRITER.message("SetInfoForResults", 
                                        _objtxt.testSettings.methodType, 
                                        _objtxt.testSettings.modalityRatio, 
                                        _objParadigm.tmpItem.length);

    SENDTO_PANEL_SCENE_INFORMATION.message("DisplayNumberOfItems",
                                         _objParadigm.tmpItem.length);

}


/**
 * Post information to the console about the Modality type, the user has specified.
 */
function giveUserModalityDescriptions() {
    switch(_objtxt.testSettings.modalityRatio) {
        case "A":
            post("AUDIO evaluation selected: Test priority is given to the audio conditions within the .json file. If 360Video scene conditions have multiple video files, the first video file will be used. \n");
            break;

        case "V":
            post("VISUAL evaluation selected: Test priority is given to the scene conditions within the .json file. If multiple audio conditions are loaded, the first audio rendering condition will be selected to remain constant. \n");
            break;

        case "AV":
            post("AUDIOVISUAL evaluation selected: All combinations of scene and audio conditions within the .json file will be tested. \n");
            break;

        default:
            post("Modaility ratio not recognized...");
    }
}

/**
 * Creates a randomized array the length of the number of items in the paradigm. 
 */
function randomizeSequence() {

    randomization = [];
    var i =  _objParadigm.tmpItem.length;
    var randomizedValue, tempValue;
    var tmpArray = [];

    for(j = 0; j < i; j++){
        tmpArray.push(j);
    }

    if(_objtxt.PresentationOrder == "Random")
    {
        while(0 !== i) {
            randomizedValue = Math.floor(Math.random()* i);
            i -= 1;
    
            tempValue = tmpArray[i];
            tmpArray[i] = tmpArray[randomizedValue];
            tmpArray[randomizedValue] = tempValue;
        }
    }
    randomization = tmpArray;
    post('Randomizing', _objParadigm.tmpItem.length, 'tmpItems:', randomization, '\n');
}