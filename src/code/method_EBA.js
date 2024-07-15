/**
 * @fileOverview Contains all functions related setting multi stimulus methodology within the methodmultistimulus.maxpat file.
 * @author  Robotham., T.M
 * @version 1.0
 * @module  methodmultistimulus.js
 */

autowatch = 1;
// inlets and outlets
// inlets = 1;
outlets = 2;


// Global variables and arrays
var _numConditions = 0;
var _mapping;
var _theRatings;
var _results;
var _theTextButtons = new Array(8);
var _theConditionButtons = new Array(8);
var _conditionButtonLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
var _slider;
var _eliminationOrder = [];
var _routeEliminationObject;
var _routeButtonObject;
var _eliminationFunnel;
var _buttonFunnel
var _eliminationPrepend;
var _buttonPrepend;
var _currentCondition = 0;

// Scene information
var currentSceneID = "config";
var currentUnitySceneID = "_config";
var currentVideoFile = "<null>";
var currentVideoID = "<null>";
// var currentAudioConditionID;

// *************************
// Instansiate objects
// *************************

/**
 * Sets global variables and calls internal methods for instantiating and initializing objects.
 * @param {Integer} val Number of conditions to be tested.
 * @this {parentPatcher}
 */
function setTest(val)
{
    if(arguments.length) // Bail if no arguments
    {
        // Parse arguments
        a = arguments[0];

        // Clip input to min and max
        if(a<=0){
            a = 0; // Minimum of 1 condition
        }
        if(a>6) {
            a = 6; // Maximum of 6 conditions
            post("Exceeded maximum conditions: clipped to 6", "\n")
        }

        // Clear the patch of any procedural objects ...
        // Must be done first, before updating _numConditions()
        clearPatch();

        // Update global number of conditions
        _numConditions = a;

        // Load a new _mapping array for the amount of conditions
        _mapping  = new Array(_numConditions);

        for (i=0; i<_numConditions; i++){
            _mapping[i] = i;
        }
        post("Initialize MultiStimulus condition slots:", _mapping, "\n");

        // ... add new patch objects and update variables
        // If the new number of conditions is valid, create new objects
        if(_numConditions)
        {
            _eliminationFunnel = this.patcher.newdefault(450, 370, "funnel", a);
            _buttonFunnel = this.patcher.newdefault(700, 370, "funnel", a);

            _eliminationPrepend = this.patcher.newdefault(450, 400, "prepend", "SetEliminate");
            _buttonPrepend = this.patcher.newdefault(700, 400, "prepend", "SelectCondition");

            // Create route objects for OSC messages
            createRouteObjects(a);

            // Create the _slider objects, connect them to the funnel
            for(k=0;k<a;k++)
            {
                // Create _sliders and save them into javascript object array.
                _theTextButtons[k] = this.patcher.newdefault(450+(k*30), 200, "message");
                // sets the conditions buttons;
                _theConditionButtons[k] = this.patcher.newdefault(615, 200+(k*20), "textbutton");

                // GUI settings.
                _theConditionButtons[k].presentation(1);
                _theConditionButtons[k].presentation_rect(80+(k*60), 170, 42, 53);
                _theConditionButtons[k].fontsize(40);
                _theConditionButtons[k].fontface(1);
                _theConditionButtons[k].fontname("poppins");
                _theConditionButtons[k].underline(1);
                _theConditionButtons[k].mode(1);
                _theConditionButtons[k].text(_conditionButtonLabels[k]);
                _theConditionButtons[k].texton(_conditionButtonLabels[k]);

                _theTextButtons[k].message("presentation", 1);
                _theTextButtons[k].message("presentation_rect", 79 + (k*60), 300, 12, 42);
                _theTextButtons[k].message("bgfillcolor", 0.204, 0.478, 0.357, 1.000);
                _theTextButtons[k].message("fontface", 1);
                _theTextButtons[k].fontname("Webdings")
                _theTextButtons[k].message("fontsize", 36);
                _theTextButtons[k].message("textjustification", 1);
                _theTextButtons[k].set("r");

                // Connect the objects.
                this.patcher.connect(_theTextButtons[k], 0, _eliminationFunnel, k);
                this.patcher.connect(_routeEliminationObject, k, _theTextButtons[k], 0);
                this.patcher.connect(_routeButtonObject, k, _buttonFunnel, k);
                this.patcher.connect(_theConditionButtons[k], 0, _buttonFunnel, k);
            }

            // Assign a Maxobj to our js object
            ourself = this.box;
            // Activate condition A by default.
            _theConditionButtons[0].int(1);

            this.patcher.connect(_eliminationFunnel, 0, _eliminationPrepend, 0);
            this.patcher.connect(_buttonFunnel, 0, _buttonPrepend, 0);
            this.patcher.connect(_eliminationPrepend, 0, ourself, 0);
            this.patcher.connect(_buttonPrepend, 0, ourself, 0);
        }
    }

    else // Complain about arguments
    {
      post("_sliders message needs arguments");
    }
}

function createRouteObjects(val)
{
    // Create names for incoming OSC _slider and button messages
    var routeEliminationNames = new Array(val);
    var routeButtonNames = new Array(val);

    for (i = 0; i<val; i++)
    {
        routeEliminationNames[i] = String("/btn/condition/eliminate/"+(i+1));
        routeButtonNames[i] = String("/btn/condition/select/"+(i+1));
    }

    // Create the route object, with the route address "routeSliderNames"
    _routeEliminationObject = this.patcher.newdefault(450, 100, "route", routeEliminationNames);
    _routeButtonObject = this.patcher.newdefault(700, 100, "route", routeButtonNames);

    this.patcher.connect(this.patcher.getnamed("udpreceive"), 0, _routeEliminationObject, 0);
    this.patcher.connect(this.patcher.getnamed("udpreceive"), 0, _routeButtonObject, 0);
}

function clearPatch()
{
    // remove any current patch objects...
    if(_numConditions)
    {
        this.patcher.remove(_routeEliminationObject);     // route
        this.patcher.remove(_eliminationFunnel);          // funnel
        this.patcher.remove(_eliminationPrepend);         // prepend

        this.patcher.remove(_routeButtonObject);     // route
        this.patcher.remove(_buttonFunnel);          // funnel
        this.patcher.remove(_buttonPrepend);         // prepend

        for(i=0;i<_numConditions;i++) // _sliders
        {
            this.patcher.remove(_theTextButtons[i]);
            this.patcher.remove(_theConditionButtons[i]);
        }
    }
}


// *************************
// Test operation
// *************************


function setItem() {
    currentSceneID = arguments[0];
    currentUnitySceneID = arguments[1];
    currentVideoFile = arguments[2];
    currentVideoID = arguments[3];
    // currentAudioConditionID = arguments[4];
}


function WriteResult(ThisItemNumber) {
    outlet(1, "WriteResult", ThisItemNumber, JSON.stringify(ConstructDict()));
    RandomizeConditions();
}

function ConstructDict(){
    var result = {
        "SceneID" : currentSceneID,
        "UnitySceneID" : currentUnitySceneID,
        "VideoFile" : currentVideoFile,
        "VideoID" : currentVideoID,
        "EliminationOrder" : _eliminationOrder
    };

    return(result)
}


// Randomize the conditions array.
function RandomizeConditions()
{
    // Fisher-yates shuffle to randomize the conditions
    xlen = _mapping.length;
    while (0 !== xlen)
    {
        randomx = Math.floor(Math.random()*xlen);
        xlen -=1;
        tmp = _mapping[xlen];
        _mapping[xlen] = _mapping[randomx];
        _mapping[randomx] = tmp;
    }
    post("Randomizing conditions:", _mapping, "\n");
    // outlet(0, "selectCondition", _mapping[0]);

    _eliminationOrder = [];

    for (i=0;i<_numConditions; i++) {
        _theTextButtons[i].message("bgfillcolor", 0.173, 0.490, 0.494, 1.000);
        _theTextButtons[i].message("ignoreclick", 0);
        _theConditionButtons[i].message("textcolor", 0.502, 0.502, 0.502, 1.000);
        _theConditionButtons[i].message("ignoreclick", 0);
    }
    SelectCondition(0);
}

function SetEliminate()
{
    if(arguments.length==2)
    {
        _eliminationOrder.push(_mapping[arguments[0]]);
        _theTextButtons[arguments[0]].message("bgfillcolor", 0.514, 0.322, 0.376, 1.000);
        _theTextButtons[arguments[0]].message("ignoreclick", 1);

        _theConditionButtons[arguments[0]].message("ignoreclick", 1);
        _theConditionButtons[arguments[0]].message("textcolor", 0.314, 0.314, 0.314, 1.000);
    }
    for (i=0; i<_numConditions; i++){

    }
}

// Selects the condition from the randomized array.
function SelectCondition()
{
    outlet(0, "SelectCondition", _mapping[arguments[0]]);
    // post(_mapping[arguments[0]]);
    for(i=0; i<_numConditions; i++){
        _theConditionButtons[i].set(0);
    }
    _theConditionButtons[arguments[0]].set(1);
}

// Keyboard input to control the UI. 
function KeyNavigation(){

}



