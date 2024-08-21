/**
 * @fileOverview OSC handler module controls all OSC messages pertaining to the test configuration,
 * methodology and item selection.
 * @author  Robotham., T.M
 * @version 1.0
 * @module  oschandler.js
 */


// const fs = require("fs");
// const path = require("path");
// const util = require("util");
const max = require("max-api");
// const os = require("os");

// Global vars
var jsonLoaded = false;
var method = "null";
var questionnaire = "null";
var questionnaireIntegration = "null";
var numberOfConditions = 0;
var subjectResultsDirectory;
var repetionMultiplier = 1;
var idAddress = 0;
var port = 0;

max.post('node.js: oschandler.js instantiated');


// Local object handlers.

/**
 * @name setClient
 * @function
 * @description Sets the UDP configuration to the correct IP address of the client,
 * and the port the client is listening on.
 * @param  {list} ...args List of IP Address and Port number.
 */
max.addHandler('setOSC', (...args) => {
        if (args[0] == 'local' || args[0] == '127.0.0.1' ){
        max.outlet('toclient', 'host', 'localhost');
    }else {
        max.outlet('toclient', 'host', args[0]);
    }
    max.outlet('toclient', 'port', args[1]);
    jsonLoaded = true;
    max.post("Setting OSC variables", jsonLoaded, '\n');
});


// /**
//  * @name setMethod
//  * @function
//  * @description Sets the information regarding the method.
//  * @param {string} ...args Name of the method loaded by the .json file.
//  */
// max.addHandler('setMethod', (...args) => {
//     method = args[0];
// });


// Incoming OSC message handling from Unity. 

// /**
//  * @name /isActive
//  * @function
//  * @description The end branch of an incoming OSC address tree providing information on the client
//  * status. Once called, /isActive will automatically check if the a test has been loaded.
//  * @param {number} status Status of of the Unity client.  1 = active, 0 = inactive.
//  * @return {number} status of the host, if a json file has been loaded. 1 = loaded and ready,
//  * 0 = setup not complete.
//  */
// max.addHandler('/isActive', (status) => {
//     if (status == 1){
//         max.post('udp:in:packet', 'Client Running.', max.POST_LEVELS.WARN);
//         if (jsonLoaded){
//             max.outlet('toclient', '/client/', 'json_loaded', 1);
//         }
//         else{
//             max.outlet('toclient', '/client/', 'json_loaded', 0);
//         }
//     }else {
//         max.post('udp:in:packet', 'Client Stopped.', max.POST_LEVELS.WARN);
//     }
// });

// /**
//  * @name /method
//  * @function
//  * @description The end branch of an incoming OSC address tree requesting data about the method.
//  * Once called, sends information back to the client about the method.
//  * @param {string} [request] 'get' call.
//  * @return {string} Name of the method to send to the client. The name of the method should exactly
//  * match the name of the method interface to be used within the client. E.g, <string> 'P910-11'
//  * will look for a prefab call 'P910-11'
//  */
// max.addHandler('/method', (request) => {
//     if(!jsonLoaded) {
//         max.post('WARNING: no json test loaded');
//         return;
//     }
//     //max.outlet('/client/test/method', method);
//     max.outlet('testmanager', '/method', request);
// });



// Calls incoming from Unity to go to the MaxMSP testmanager.js
max.addHandler('TestManager', (...args) => {handle_TestManager(...args)});

function handle_TestManager(...args){
    var msg = args[0];

    if(jsonLoaded===0){
        max.post('WARNING: no json test loaded', jsonLoaded);
        return;
    }

    switch (msg){
        case 'get_next_item':
            //max.post('Unity requesting next item information');
            max.outlet('testmanager', 'OSCCall', 'getitem');
            break;
        case 'set_next_item':
            max.post('Unity setting next item');
            max.outlet('testmanager', 'OSCCall', 'setitem');
            break;
        case 'client_is_active':
            max.post('Client is active:', args[1], max.POST_LEVELS.WARN);
            max.outlet('toclient', '/client/configuration/', 'json_loaded', 1);
            break;
        case 'get_paradigm_information':
            //max.post('Unity requesting method information');
            handle_SendToUnity('give_paradigm_information');
            break;
        case 'get_results_directory':
            max.outlet('testmanager', 'OSCCall', 'getdirectory');
        default:
            max.post('/control/testmanager has no handler for msg value');
            break;
    }
}


max.addHandler('SendToUnity', (...args) => {handle_SendToUnity(...args)});

function handle_SendToUnity(...args){

    var msg = args[0];  // identify the message.

    switch (msg){
        case 'give_subjects_results_directory':
            max.post('osc_handler: sending subjects directory to Unity', );
            max.outlet('toclient', '/client/results/', args[1]);               // output to unity. 
            break;
        case 'give_unity_scene_item':
            // max.post('osc_handler: sending next Unity item scene name');
            max.outlet('toclient', '/client/item/', 'set_scene_item', args[1]);                       // output to unity.
            break;
        case 'give_unity_video_info':
            // max.post('osc_handler: sending any video information Unity'); // relevant for 360 video scenes. 
            max.outlet('toclient', '/client/item/', 'set_video_item', args[1], args[2]);     // output to unity.
            break;
        case 'simulator_control':
            max.post('osc_handler: Max tells Unity');
            max.outlet('toclient', '/client/simulatorcontrol/', args[1]);                       // output to unity.
            break;
        case 'give_paradigm_information':
            // max.post('osc_handler: sending paradigm information to Unity');
            max.outlet('toclient', '/client/configuration/', 'set_paradigm_information', method, numberOfConditions, questionnaire, questionnaireIntegration, repetionMultiplier);
            break;
        default:
            max.post('error in handle_SendToUnity()');
            break;
    }
}



max.addHandler('SetLocalVars', (...args) => {
    var msg = args[0]; // identify the message.
    
    switch (msg){
        case 'set_paradigm_info':
            method = args[1];                   // set method
            numberOfConditions = args[2];       // set number of conditions
            questionnaire = args[3];                // set questionnaire
            questionnaireIntegration = args[4]; // set questionnaire integration type
            repetionMultiplier = args[5];       // set repetition multiplier
            break;    
            
        case 'set_subjects_results_directory':
            subjectResultsDirectory = args[1];
            break;
        default:
            max.post('/control/testmanager has no handler for value', ...args);
            break;

    }
});


// /**
//  * @name /nextItem
//  * @function
//  * @description The end branch of an incoming OSC address tree requesting data about the nextItem.
//  * Once called, sends message to the host testmanager.js to either get or set the next item.
//  * @param  {string} msg       'get' or 'set' call.
//  */
// max.addHandler('/nextItem', (msg) => {
//     if(!jsonLoaded) {
//         max.post('WARNING: no json test loaded');
//         return;
//     }
//     max.outlet('testmanager', '/nextItem', msg);
// });

// max.addHandler('/numberOfConditions', (msg) => {
//     if(numberOfConditions != null) {
//         max.outlet('/client/test/conditions', String(numberOfConditions));
//     }
// });

// max.addHandler('/resultsDir', (msg) => {
//     if(numberOfConditions != null && msg == 'get') {
//         max.outlet('/client/test/subject/resultsDir', subjectResultsDirectory);
//     }
// });

// /**
//  * @name givingNextItem
//  * @function
//  * @description Returns a list of information about the next item to the client.
//  * @param {list} args Information regarding next scene from SceneCondition array in the loaded
//  * json file.
//  * @return {list} Information to send to client. At minimum, must include '_UnitySceneID'
//  */
// max.addHandler('givingNextItem', (...args) => {
//     if(args.length == 0) {
//         max.post('WARNING: Next item has no information');
//         return;
//     }
//     max.outlet('/client/test/nextItem', args[0]);
// });

// max.addHandler('givingNextItemVideo', (...args) => {
//     if(args.length == 0) {
//         max.post('WARNING: Next item has no information');
//         return;
//     }
//     max.post("values to send", args[0], args[1]);
//     max.outlet('/client/test/givingNextItemVideo', args[0], args[1]);
// });

// max.addHandler('givingMethod', (Method) =>  {
//     method = Method;
//     max.outlet('/client/test/method', method);
// });

// max.addHandler('givingQuestionnaire', (...args) =>  {
//     max.outlet('/client/test/questionnaire', args[1], args[2]);
// });

// max.addHandler('setNumberOfConditions', (val) =>  {
//     numberOfConditions = val;
//     max.post("Number of parallel conditions = ", numberOfConditions);
// });

// max.addHandler('giveResultsDir', (path) => {
//     subjectResultsDirectory = path;
// });

// max.addHandler('giveSimulator', (msg) => {
//     max.outlet('/client/test/simulator', msg);
// });





// const handlers = {
//   [max.MESSAGE_TYPES.BANG]: () => {
//     console.log("got a bang");
//   },
//   [max.MESSAGE_TYPES.NUMBER]: (num) => {
//   },
//   my_message: () => {
//     console.log("got my_message");
//   },
//   my_message_with_args: (arg1, arg2) => {
//     console.log("got my arged message: ${arg1}, ${arg2} ");
//   },
//   [max.MESSAGE_TYPES.ALL]: (handled, ...args) => {
//     console.log("This will be called for ALL messages");
//     console.log(`The following inlet event was ${!handled ? "not " : "" }handled`);
//     console.log(args);
//   }
// };

// max.addHandlers(handlers);
// /**
//  * @name Sequence Diagram
//  * @description Sequence diagram describing the flow of OSC messages, for the initialization and
//  * progression of a generic test within the QExE framework. The Host refers to the QExE Max program.
//  * The Client can be anything that sends and recieives the correct OSC messages, but by default
//  * refers to the Unity project.
//  * @mermaid
//  * sequenceDiagram
//  *     participant User
//  *     participant Host
//  *     participant Client
//  *     User-->>Host: LoadTest({}.json)
//  *     User-->>Client: Run(_config.unity)
//  *     activate Client
//  *     Client->>Client: OpenVR Initialized
//  *     par [User Tracking: XR Hardware]
//  *         Client->>User: /user/tracking (pos{vector3},rot{vector3})
//  *     and [User Tracking: Host]
//  *         Client->>Host: /user/tracking (pos{vector3},rot{vector3})
//  *     end
//  *     Client->>Host: /host/clientConfig/isActive (1)
//  *     alt {}.json not loaded.
//  *        Host->>Client: /client/hostConfig/testLoaded (0)
//  *        Client->>Client: return;
//  *        Note over Client: User must load in a ().json file and restart the test.
//  *     else {}.json loaded.
//  *        Host->>Client: /client/hostConfig/testLoaded (1)
//  *     end
//  *     Client->>Host: /host/clientConfig/method (get)
//  *     Host->>Client: /client/test/method (method {string})
//  *     Client->>Host: /host/test/nextItem (get)
//  *     Host->>Client: /client/test/nextItem (_UnitySceneID {string})
//  *     User-->>Client: Next
//  *     Client->>Client: LoadScene(_UnitySceneID)
//  *     loop OnSceneLoaded()
//  *         Client->>Host: /host/test/nextItem (set)
//  *         Client->>Host: /host/test/nextItem (get)
//  *         Host->>Client: /client/text/nextItem (UnitySceneID {string})
//  *         User-->>Client: Start
//  *         Client->>Host: /host/audio/playback (start)
//  *         activate Host
//  *         activate Client
//  *         Note over Host,Client: AV playback starts. QoE Evaluation begins.
//  *         User-->>Client: Interaction
//  *         User-->>Client: Next
//  *         Client->>Host: /host/audio/playback (stop)
//  *         deactivate Client
//  *         deactivate Host
//  *         Client->>Client: LoadScene(_UnitySceneID)
//  *     end
//  *     User-->>Client: Stop
//  *     deactivate Client
//  */
// var sequenceDiagram;
