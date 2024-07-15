/**
 * @fileOverview OSC handler module controls all OSC messages pertaining to the test configuration,
 * methodology and item selection.
 * @author  Robotham., T.M
 * @version 1.0
 * @module  oschandler.js
 */


const fs = require("fs");
const path = require("path");
const util = require("util");
const max = require("max-api");
const os = require("os");

// Global vars
var jsonLoaded = false;
var method = null;
var methodVars = [];
var numberOfConditions = 0;

var subjectResultsDirectory;

max.post('node.js: oschandler.js instantiated');


/**
 * @name setClient
 * @function
 * @description Sets the UDP configuration to the correct IP address of the client,
 * and the port the client is listening on.
 * @param  {list} ...args List of IP Address and Port number.
 */
max.addHandler('setClient', (...args) => {
    if (args[0] == 'local' || args[0] == '127.0.0.1' ){
        max.outlet('host', 'localhost');
    }else {
        max.outlet('host', args[0]);
    }
    max.outlet('port', args[1]);
    jsonLoaded = true;
});


/**
 * @name setMethod
 * @function
 * @description Sets the private information regarding the method.
 * @param {string} ...args Name of the method loaded by the .json file.
 */
max.addHandler('setMethod', (...args) => {
    method = args[0];
});


/**
 * @name /isActive
 * @function
 * @description The end branch of an incoming OSC address tree providing information on the client
 * status. Once called, /isActive will automatically check if the a test has been loaded.
 * @param {number} status Status of of the Unity client.  1 = active, 0 = inactive.
 * @return {number} status of the host, if a json file has been loaded. 1 = loaded and ready,
 * 0 = setup not complete.
 */
max.addHandler('/isActive', (status) => {
    if (status == 1){
        max.post('udp:in:paket', 'Client Running.', max.POST_LEVELS.WARN);
        if (jsonLoaded){
            max.outlet('/client/hostConfig/testLoaded', 1);
        }
        else{
            max.outlet('/client/hostConfig/testLoaded', 0);
        }
    }else {
        max.post('udp:in:paket', 'Client Stopped.', max.POST_LEVELS.WARN);
    }
});



/**
 * @name /method
 * @function
 * @description The end branch of an incoming OSC address tree requesting data about the method.
 * Once called, sends information back to the client about the method.
 * @param {string} [request] 'get' call.
 * @return {string} Name of the method to send to the client. The name of the method should exactly
 * match the name of the method interface to be used within the client. E.g, <string> 'P910-11'
 * will look for a prefab call 'P910-11'
 */
max.addHandler('/method', (request) => {
    if(!jsonLoaded) {
        max.post('WARNING: no json test loaded');
        return;
    }
    //max.outlet('/client/test/method', method);
    max.outlet('testmanager.js', '/method', request);
});



/**
 * @name /nextItem
 * @function
 * @description The end branch of an incoming OSC address tree requesting data about the nextItem.
 * Once called, sends message to the host testmanager.js to either get or set the next item.
 * @param  {string} msg       'get' or 'set' call.
 */
max.addHandler('/nextItem', (msg) => {
    if(!jsonLoaded) {
        max.post('WARNING: no json test loaded');
        return;
    }
    max.outlet('testmanager.js', '/nextItem', msg);
});


max.addHandler('/numberOfConditions', (msg) => {
    if(numberOfConditions != null) {
        max.outlet('/client/test/conditions', String(numberOfConditions));
    }
});


max.addHandler('/resultsDir', (msg) => {
    if(numberOfConditions != null && msg == 'get') {
        max.outlet('/client/test/subject/resultsDir', subjectResultsDirectory);
    }
});




/**
 * @name givingNextItem
 * @function
 * @description Returns a list of information about the next item to the client.
 * @param {list} args Information regarding next scene from SceneCondition array in the loaded
 * json file.
 * @return {list} Information to send to client. At minimum, must include '_UnitySceneID'
 */
max.addHandler('givingNextItem', (...args) => {
    if(args.length == 0) {
        max.post('WARNING: Next item has no information');
        return;
    }
    max.outlet('/client/test/nextItem', args[0]);
});


max.addHandler('givingNextItemVideo', (...args) => {
    if(args.length == 0) {
        max.post('WARNING: Next item has no information');
        return;
    }
    max.post("values to send", args[0], args[1]);
    max.outlet('/client/test/givingNextItemVideo', args[0], args[1]);
});


max.addHandler('givingMethod', (Method) =>  {
    method = Method;
    max.outlet('/client/test/method', method);
});


max.addHandler('givingQuestionnaire', (...args) =>  {
    max.outlet('/client/test/questionnaire', args[1], args[2]);
});


max.addHandler('setNumberOfConditions', (val) =>  {
    numberOfConditions = val;
    max.post("Number of parallel conditions = ", numberOfConditions);
});


max.addHandler('giveResultsDir', (path) => {
    subjectResultsDirectory = path;
});


max.addHandler('giveSimulator', (msg) => {
    max.outlet('/client/test/simulator', msg);
});






const handlers = {
  [max.MESSAGE_TYPES.BANG]: () => {
    console.log("got a bang");
  },
  [max.MESSAGE_TYPES.NUMBER]: (num) => {
  },
  my_message: () => {
    console.log("got my_message");
  },
  my_message_with_args: (arg1, arg2) => {
    console.log("got my arged message: ${arg1}, ${arg2} ");
  },
  [max.MESSAGE_TYPES.ALL]: (handled, ...args) => {
    console.log("This will be called for ALL messages");
    console.log(`The following inlet event was ${!handled ? "not " : "" }handled`);
    console.log(args);
  }
};

max.addHandlers(handlers);


/**
 * @name Sequence Diagram
 * @description Sequence diagram describing the flow of OSC messages, for the initialization and
 * progression of a generic test within the QExE framework. The Host refers to the QExE Max program.
 * The Client can be anything that sends and recieives the correct OSC messages, but by default
 * refers to the Unity project.
 * @mermaid
 * sequenceDiagram
 *     participant User
 *     participant Host
 *     participant Client
 *     User-->>Host: LoadTest({}.json)
 *     User-->>Client: Run(_config.unity)
 *     activate Client
 *     Client->>Client: OpenVR Initialized
 *     par [User Tracking: XR Hardware]
 *         Client->>User: /user/tracking (pos{vector3},rot{vector3})
 *     and [User Tracking: Host]
 *         Client->>Host: /user/tracking (pos{vector3},rot{vector3})
 *     end
 *     Client->>Host: /host/clientConfig/isActive (1)
 *     alt {}.json not loaded.
 *        Host->>Client: /client/hostConfig/testLoaded (0)
 *        Client->>Client: return;
 *        Note over Client: User must load in a ().json file and restart the test.
 *     else {}.json loaded.
 *        Host->>Client: /client/hostConfig/testLoaded (1)
 *     end
 *     Client->>Host: /host/clientConfig/method (get)
 *     Host->>Client: /client/test/method (method {string})
 *     Client->>Host: /host/test/nextItem (get)
 *     Host->>Client: /client/test/nextItem (_UnitySceneID {string})
 *     User-->>Client: Next
 *     Client->>Client: LoadScene(_UnitySceneID)
 *     loop OnSceneLoaded()
 *         Client->>Host: /host/test/nextItem (set)
 *         Client->>Host: /host/test/nextItem (get)
 *         Host->>Client: /client/text/nextItem (UnitySceneID {string})
 *         User-->>Client: Start
 *         Client->>Host: /host/audio/playback (start)
 *         activate Host
 *         activate Client
 *         Note over Host,Client: AV playback starts. QoE Evaluation begins.
 *         User-->>Client: Interaction
 *         User-->>Client: Next
 *         Client->>Host: /host/audio/playback (stop)
 *         deactivate Client
 *         deactivate Host
 *         Client->>Client: LoadScene(_UnitySceneID)
 *     end
 *     User-->>Client: Stop
 *     deactivate Client
 */
var sequenceDiagram;
