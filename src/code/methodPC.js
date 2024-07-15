/**
 * @fileOverview Contains all functions related setting multi stimulus methodology within the methodmultistimulus.maxpat file.
 * @author  Robotham., T.M
 * @version 1.0
 * @module  pairedcomparison.js
 */

autowatch = 1;
// inlets and outlets
// inlets = 1;
// outlets = 2;


// Global variables and arrays

/**
 * Global variable used to store number of conditions / _sliders.
 * @type {Number}
 */
var _numConditions = 0;

/**
 * Global variable used to store the randomization _mapping information for conditions and buttons.
 * @type {Array}
 */
var _mapping;

/**
 * Stores the received rating values of the conditions from the _sliders.
 * @type {Array}
 */
var _theRatings;

/**
 * Stores the rating values for each condition and the respective condition from the _mapping[] randomization array.
 * @type {Array}
 */
var _results;

var currentConditionPair = 0;

var comparisonPairObj;

var currentSceneID;
var currentUnitySceneID;
var currentVideoFile;
var currentVideoID;
var currentAudioConditionID;

var conA_btn;
var conB_btn; 

var currentPairCondition = 0;

/**
 * Sets global variables and calls internal methods for instantiating and initializing objects.
 * @param {Integer} val Number of conditions to be tested.
 * @this {parentPatcher}
 */
function setTest(val)
{

    var tmpPairs = new Dict();
    var tmpPairSets = new Dict();

    if(arguments.length) // Bail if no arguments
    {
        // Parse arguments
        a = arguments[0];

        // Clip input to min and max
        if(a<=0)
        {
            a = 0; // Minimum of 1 condition
        }

        // Update global number of pairs
        _numConditions = a;

        // Create a dictionary for the condition sets within a scene. 
        for (k=0; k<_numConditions; k++)
        {
            for(x=k+1; x<_numConditions; x++)
            {
                tmpPairs.set("condition1", k);
                tmpPairs.set("condition2", x);
                for(reps=0; reps<1; reps++)
                {
                    tmpPairSets.append("Pair", tmpPairs);
                }
            }
        }

        // Save the MaxMSP dict as an object. 
        comparisonPairObj = JSON.parse(tmpPairSets.stringify());

        // Arrays to save the data. 
        _condition1 = new Array(comparisonPairObj.Pair.length);
        _condition2 = new Array(comparisonPairObj.Pair.length);
        _flipped = new Array(comparisonPairObj.Pair.length);
        _ratings =  new Array(comparisonPairObj.Pair.length);
        _randomizedOrder = new Array(comparisonPairObj.Pair.length);
        _results = new Array(comparisonPairObj.Pair.length*3);

        for (i=0; i<comparisonPairObj.Pair.length; i++)
        {
            _randomizedOrder[i] = i;
            _ratings[i] = 0;
        }


        flipConditions();

        post("Initialize Paired Comparison ordering:", _randomizedOrder, "\n");
        post("Current Pair:", "A =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition1, "B =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition2, '\n');

        // Select A condition. 
        conA_btn = this.patcher.getnamed("conA");
        conB_btn = this.patcher.getnamed("conB");
        selectCondition(0);

    } else // Complain about arguments
    {
      post("_sliders message needs arguments");
    }
}


/**
 * Randomly flip the A/B conditions so they are not always presented as the same condition. 
 */
function flipConditions(){
    for(i=0; i<comparisonPairObj.Pair.length;i++){
        if(Math.round(Math.random())==1){
            var tmp1 = comparisonPairObj.Pair[i].condition1;
            var tmp2 = comparisonPairObj.Pair[i].condition2; 

            comparisonPairObj.Pair[i].condition1 = tmp2;
            comparisonPairObj.Pair[i].condition2 = tmp1;
        }
    }
}





/**
 * Store the incoming rating for the current pair to the '_ratings' array.
 * @param {Integer} args Incoming _slider value.
 */
function setRating()
{
    if(arguments.length==1)
    {
        _ratings[_randomizedOrder[currentConditionPair]] = arguments[0];
    }
}


function setItem() {
    currentSceneID = arguments[0];
    currentUnitySceneID = arguments[1];
    currentVideoFile = arguments[2];
    currentVideoID = arguments[3];
    //currentAudioConditionID = arguments[4];
}


/**
 * Sends out '_results' array to be written to the results file.
 */
function writeResults()
{
    try
    {
    //post(_ratings, '\n');
    pair = 0;

    for (i=0; i<_ratings.length; i++)
    {
        _results[pair] = comparisonPairObj.Pair[i].condition1;          // Condition A.
        _results[pair+1] = comparisonPairObj.Pair[i].condition2;        // Condition B.
        _results[pair+2] = _ratings[i];
        pair += 3;
    }
    outlet(0, "writeResults", currentSceneID, String(" Rating: " + _results),  String(" Info: " + [currentUnitySceneID, currentVideoFile, currentVideoID].join(' ')));
    nextScene();
    }catch(error)
    {
        post(error, '\n');
    }
}


/**
 * Called from parentPatcher when moving from one scene to the next. Randomizes the _randomizedOrder mapping for the next scene.
 */
function nextScene()
{
    // Fisher-yates shuffle to randomize the conditions
    xlen = _randomizedOrder.length;
    while (0 !== xlen)
    {
        randomx = Math.floor(Math.random()*xlen);
        xlen -=1;
        tmp = _randomizedOrder[xlen];
        _randomizedOrder[xlen] = _randomizedOrder[randomx];
        _randomizedOrder[randomx] = tmp;
    }
    post("Randomizing conditions:", _randomizedOrder, "\n");
    outlet(0, "selectCondition", 0);

    // Set the slider back to 0.
    this.patcher.getnamed("PCslider").message("float", 60);
    currentConditionPair = 0;
    post("Current Pair:", "A =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition1, "B =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition2, '\n');

    // Reset the results to 0.
    for (i=0; i<comparisonPairObj.Pair.length; i++)
    {
        _ratings[i] = 0;
    }

    // Randomly flip the conditions again. 
    flipConditions()
}


/**
 * Selects the current condition based on the '_mapping' array
 * @param  {Integer} args Number corresponding to the condition presented to the user.
 */
function selectCondition(args)
{
    switch(arguments[0])
    {
        case 0:
            currentPairCondition = 0; 
            outlet(0, "selectCondition", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition1);
            conA_btn.message("bgfillcolor", 0.14, 0.51, 0.47, 1.000);
            conB_btn.message("bgfillcolor", 0.2, 0.2, 0.2, 1.000);                       
            break;

        case 1:
            currentPairCondition = 1;
            outlet(0, "selectCondition", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition2);
            conB_btn.message("bgfillcolor", 0.14, 0.51, 0.47, 1.000);
            conA_btn.message("bgfillcolor", 0.2, 0.2, 0.2, 1.000);           
            break; 
    }
}


function incrementPair()
{
    if(currentConditionPair<comparisonPairObj.Pair.length-1)
    {
        post("Set Rating:", "A =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition1, "B =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition2, "Rating = ", _ratings[_randomizedOrder[currentConditionPair]],'\n');
        
        currentConditionPair++;
        post("Current Pair:", "A =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition1, "B =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition2, '\n');
        this.patcher.getnamed("PCslider").message("float", 60);
        selectCondition(0);
    }       
}





/**
 * Calculates the paradigm for the P910-11 test. Initially checks for the Modality 'A', 'V', or
 * 'AV'. Afterwards, loops through the scenes and audio renderers to create all the test items.
 * @param {object} _objtxt The loaded {}.json test file as a javascript object, passed from the
 * testmanager.js
 * @returns {dictionary} Dictionary of the created paradigm.
 * @access public
 * @module methodBS1534
 */
exports.PCParadigm = function (_objtxt)
{
    var tmpTest = new Dict();               // Temp dictionary to add all tmp items too.
    var tmpItem = new Dict();               // Temp dictionary for each test item.

    var tmpPairs = new Dict();
    var tmpPairList = new Dict();

    var itemCount=0;                        // Count for the Scenes.

    var numberOfUniqueComparisons;

    switch (_objtxt.Modality)
    {
        // For AudioVisual tests. (All combinations)
        case "AV":
            error("Paired Comparison Method is currently an audio test only... cannot test multiple parallel visual conditions. Please set Modaility: A in {}.json file", '\n');
        break;

        case "A":
            audioConditionsArray = [];
            numberOfUniqueComparisons = (_objtxt.AudioRendering.AudioVSTConditions.length*(_objtxt.AudioRendering.AudioVSTConditions.length - 1))/2;
            post("Number of unique pairs (no-self comparison) =", numberOfUniqueComparisons, '\n');
            post("Number of repetitions = 3", '\n');

            // Loop through all AudioConditions for each scene.
            for (k=0; k<_objtxt.AudioRendering.AudioVSTConditions.length; k++)
            {
                for(x=k+1; x<_objtxt.AudioRendering.AudioVSTConditions.length; x++)
                {
                    tmpPairs.set("condition1", k);
                    tmpPairs.set("condition2", x);
                    // Add in 3 repetitions per comparison
                    for(reps=0; reps<1; reps++)
                    {
                        tmpPairList.append("Pair", tmpPairs);
                    }
                }
            }

            // Loop through scenes.
            for (i=0; i<_objtxt.Scenes.length; i++)
            {
                switch(_objtxt.Scenes[i].VisualStimuli)
                {
                    case "360Video":
                        tmpItem.set("SceneIndex", i);
                        tmpItem.set("SceneID", _objtxt.Scenes[i].SceneID);
                        tmpItem.set("UnitySceneID", _objtxt.Scenes[i].UnitySceneID);
                        // Will automatically take the first video file entry.
                        tmpItem.set("VideoFile", _objtxt.Scenes[i].VideoFiles[0].PathToFile);
                        tmpItem.set("VideoID", _objtxt.Scenes[i].VideoFiles[0].VideoID);
                        tmpItem.append("AudioCondition", tmpPairList);
                        tmpTest.append("tmpItem", tmpItem);
                        itemCount ++;
                    break;

                    case "Simulated":
                        tmpItem.set("SceneIndex", i);
                        tmpItem.set("SceneID", _objtxt.Scenes[i].SceneID);
                        tmpItem.set("UnitySceneID", _objtxt.Scenes[i].UnitySceneID);
                        // Will automatically take the first video file entry.
                        tmpItem.set("VideoFile", "null");
                        tmpItem.set("VideoID", "null");
                        tmpItem.set("AudioCondition", tmpPairList);
                        tmpTest.append("tmpItem", tmpItem);
                        itemCount ++;
                    break;
                }
            }
        break;

        case "V":
            error("BS1284 is currently an audio test only... cannot test multiple parallel visual conditions. Please set Modaility: A in {}.json file", '\n');
        break;
    }

    //delete tmpItem;
    return(tmpTest);
}



