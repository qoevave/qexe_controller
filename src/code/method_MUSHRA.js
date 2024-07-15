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
var _numSliders = 0;
var _mapping;
var _theRatings;
var _results;
var _theSliders = new Array(128);
var _theValueDisplay = new Array(8);
var _theConditionButtons = new Array(8);
var _conditionButtonLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
var _slider
var _routeSliderObject;
var _routeButtonObject;
var _sliderFunnel;
var _buttonFunnel
var _sliderPrepend;
var _buttonPrepend;

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
        if(a>8){
            a = 8; // Maximum of 8 conditions
            post("Exceeded maximum conditions: clipped to 8", "\n")
        }


        // Clear the patch of any procedural objects ...

        // Must be done first, before updating _numSliders()
        clearPatch();

        // Update global number of conditions
        _numSliders = a;

        // Load a new _mapping array for the amount of conditions and ratings
        _mapping  = new Array(_numSliders);
        _theRatings = new Array(_numSliders);
        _results = new Array(_numSliders*2);

        for (i=0; i<_numSliders; i++)
        {
            _mapping[i] = i;
            _theRatings[i] = 0;
        }
        post("Initialize MultiStimulus condition slots:", _mapping, "\n");

        // ... add new patch objects and update variables
        // If the new number of conditions is valid, create new objects
        if(_numSliders)
        {
            _sliderFunnel = this.patcher.newdefault(450, 370, "funnel", a);
            _buttonFunnel = this.patcher.newdefault(700, 370, "funnel", a);

            _sliderPrepend = this.patcher.newdefault(450, 400, "prepend", "SetRating");
            _buttonPrepend = this.patcher.newdefault(700, 400, "prepend", "SelectCondition");

            // Create route objects for OSC messages
            createRouteObjects(_numSliders);

            // Create the _slider objects, connect them to the funnel
            for(k=0;k<a;k++)
            {
                // Create _sliders and save them into javascript object array.
                _theSliders[k] = this.patcher.newdefault(450+(k*25), 200, "slider");
                // Set _slider resolution.
                _theSliders[k].message("size", 101);
                // Set the number displays for the sliders for visual feedback. 
                _theValueDisplay[k] = this.patcher.newdefault(387, 200+(k*20), "message");
                // sets the conditions buttons;
                _theConditionButtons[k] = this.patcher.newdefault(615, 200+(k*20), "textbutton");

                // GUI settings.
                _theSliders[k].message("presentation", 1);
                _theSliders[k].message("presentation_rect", 90 + (k*48), 160, 25, 180);
                _theSliders[k].message("knobshape", 5);

                _theValueDisplay[k].message("presentation", 1);
                _theValueDisplay[k].message("fontsize", 10);
                _theValueDisplay[k].message("ignoreclick", 1);
                _theValueDisplay[k].message("fontname", "poppins");
                _theValueDisplay[k].message("textjustification", 1);
                _theValueDisplay[k].set(0);
                _theValueDisplay[k].presentation_rect(87+(k*48), 136, 30, 20);
                _theValueDisplay[k].bgfillcolor(1, 1, 1, 0);

                _theConditionButtons[k].presentation(1);
                _theConditionButtons[k].presentation_rect(85+(k*48), 355, 35, 28);
                _theConditionButtons[k].fontsize(16);
                _theConditionButtons[k].fontface(1);
                _theConditionButtons[k].fontname("poppins");
                _theConditionButtons[k].underline(1);
                _theConditionButtons[k].mode(1);
                _theConditionButtons[k].text(_conditionButtonLabels[k]);
                _theConditionButtons[k].texton(_conditionButtonLabels[k]);

                // Connect the objects.
                this.patcher.connect(_theSliders[k], 0, _sliderFunnel, k);
                this.patcher.connect(_routeSliderObject, k, _theSliders[k], 0);
                this.patcher.connect(_routeButtonObject, k, _buttonFunnel, k);
                this.patcher.connect(_theSliders[k], 0, _theValueDisplay[k], 1);
                this.patcher.connect(_theConditionButtons[k], 0, _buttonFunnel, k);
            }
            this.patcher.connect(_routeButtonObject, a, this.patcher.getnamed("btn_ref"), 0);

            // Assign a Maxobj to our js object
            ourself = this.box;
            // Activate condition the REF by default.
            _theConditionButtons[0].int(1);

            this.patcher.connect(_sliderFunnel, 0, _sliderPrepend, 0);
            this.patcher.connect(_buttonFunnel, 0, _buttonPrepend, 0);
            this.patcher.connect(_sliderPrepend, 0, ourself, 0);
            this.patcher.connect(_buttonPrepend, 0, ourself, 0);
        }
    }

    else // Complain about arguments
    {
      post("_sliders message needs arguments");
    }
}

// Create the routing objects for the buttons and sliders incoming OSC messages.
function createRouteObjects(val)
{
    // Create names for incoming OSC _slider and button messages
    var routeSliderNames = new Array(val);
    var routeButtonNames = new Array(val);

    for (i = 0; i<val; i++)
    {
        routeSliderNames[i] = String("/slider/bs1534/"+(i+1));
        routeButtonNames[i] = String("/btn/condition/bs1534/"+(i+1));
    }
    routeButtonNames[val] = String("/btn/condition/bs1534/ref");


    // Create the route object, with the route address "routeSliderNames"
    _routeSliderObject = this.patcher.newdefault(450, 100, "route", routeSliderNames);
    _routeButtonObject = this.patcher.newdefault(700, 100, "route", routeButtonNames);

    this.patcher.connect(this.patcher.getnamed("udpreceive"), 0, _routeSliderObject, 0);
    this.patcher.connect(this.patcher.getnamed("udpreceive"), 0, _routeButtonObject, 0);
}


// Remove and current patch objects.
function clearPatch()
{
    if(_numSliders)
    {
        this.patcher.remove(_routeSliderObject);     // route
        this.patcher.remove(_sliderFunnel);          // funnel
        this.patcher.remove(_sliderPrepend);         // prepend

        this.patcher.remove(_routeButtonObject);     // route
        this.patcher.remove(_buttonFunnel);          // funnel
        this.patcher.remove(_buttonPrepend);         // prepend

        for(i=0;i<_numSliders;i++) // _sliders
        {
            this.patcher.remove(_theSliders[i]);
            this.patcher.remove(_theValueDisplay[i]);
            this.patcher.remove(_theConditionButtons[i]);
        }
    }
}

// *************************
// Test operation
// *************************

function SetRating(args){
    if(arguments.length==2)
    {
        _slider = arguments[0];
        _theRatings[_slider] = arguments[1];
    }
}


function setItem() {
    currentSceneID = arguments[0];
    currentUnitySceneID = arguments[1];
    currentVideoFile = arguments[2];
    currentVideoID = arguments[3];
    currentAudioConditionID = arguments[4];
}



// function writeResults()
// {
//     pair = 0;
//     for (i=0; i<_numSliders; i++)
//     {
//         _results[pair] = _mapping[i];           // the mapped condition
//         _results[pair+1] = _theRatings[i];      // the rating
//         pair += 2;
//     }
//     outlet(0, "writeResults", currentSceneID, String(" Rating: " + _results),  String(" Info: " + [currentUnitySceneID, currentVideoFile, currentVideoID].join(' ')));

//     nextScene();
// }


function WriteResult(ThisItemNumber) {
    outlet(1, "WriteResult", ThisItemNumber, JSON.stringify(ConstructDict()));
    // post("Sending to module_ResultsWriter:", ThisItemNumber, JSON.stringify(ConstructDict()), '\n');
    // sldrACR.message("int", 0);
    RandomizeConditions();
}

function ConstructDict(){
    var result = {
        "SceneID" : currentSceneID,
        "UnitySceneID" : currentUnitySceneID,
        "VideoFile" : currentVideoFile,
        "VideoID" : currentVideoID,
        "Rating" : {}
    };

    var theMappedConditions = []
    for (i=0; i<_numSliders; i++){
        theMappedConditions[i] = String("Con_"+_mapping[i]);
        result.Rating[theMappedConditions[i]] = _theRatings[i];
    }

    return(result)
}



/**
 * Called from parentPatcher when moving from one scene to the next. Randomizes the conditions '_mapping' for the next scene.
 */
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
    outlet(0, "SelectCondition", 0);    // Always return to the reference. 

    // Set sliders back to 100.
    for (i=0; i<_numSliders; i++){
        _theSliders[i].message("int", 100);
    }
}


// Selects the condition from the randomized array.
function SelectCondition()
{
    outlet(0, "SelectCondition", _mapping[arguments[0]]);
    post(_mapping[arguments[0]]);
    for(i=0; i<_numSliders; i++){
        _theConditionButtons[i].set(0);
    }
    _theConditionButtons[arguments[0]].set(1);
    this.patcher.getnamed("btn_ref").set(0);
}

function SelectReference(){
    // outlet(0, "SelectCondition", _mapping[arguments[1]]);
    // post(_mapping[arguments[0]]);
    for(i=0; i<_numSliders; i++){
        _theConditionButtons[i].set(0);
    }
    this.patcher.getnamed("btn_ref").set(1);
}

// Keyboard input to control the UI. 
function KeyNavigation(){

}


// Position the ticks automatically.
// Only used when changing the GUI layout. 
function PositionTicks(){
    var ticks = new Array (11);
    ticks[0] = this.patcher.getnamed('tick_0');
    ticks[1] = this.patcher.getnamed('tick_10');
    ticks[2] = this.patcher.getnamed('tick_20');
    ticks[3] = this.patcher.getnamed('tick_30');
    ticks[4] = this.patcher.getnamed('tick_40');
    ticks[5] = this.patcher.getnamed('tick_50');
    ticks[6] = this.patcher.getnamed('tick_60');
    ticks[7] = this.patcher.getnamed('tick_70');
    ticks[8] = this.patcher.getnamed('tick_80');
    ticks[9] = this.patcher.getnamed('tick_90');
    ticks[10] = this.patcher.getnamed('tick_100');

    for (i=0; i<11; i++){
        ticks[i].message("presentation_rect", 25, 325 - (i*17), 54, 20);
    }
}