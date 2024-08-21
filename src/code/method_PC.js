<<<<<<< HEAD
/**
 * @fileOverview Contains all functions related setting multi stimulus methodology within the methodmultistimulus.maxpat file.
 * @author  Robotham., T.M
 * @version 1.0
 * @module  pairedcomparison.js
 */

autowatch = 1;
// inlets and outlets
// inlets = 1;
outlets = 2;


// Global variables and arrays
var _numConditions = 0; // Global variable used to store number of conditions / _sliders.
var _mapping;    // Global variable used to store the randomization _mapping information for conditions and buttons.
var _theRatings; // Stores the received rating values of the conditions from the _sliders.
var _results;                       // Stores the rating values for each condition and the respective condition from the _mapping[] randomization array.

var currentConditionPair = 0;
var comparisonPairObj;
var currentSceneID = "config";
var currentUnitySceneID = "_config";
var currentVideoFile = "<null>";
var currentVideoID = "<null>";

var conA_btn;   // Reference to GUI A button
var conB_btn;   // Reference to GUI B button

var currentPairCondition = 0;

// *************************
// Instansiate objects
// *************************

function setTest(val)
{

    var tmpPairs = new Dict();
    var tmpPairSets = new Dict();

    if(arguments.length) // Bail if no arguments
    {
        // Parse arguments
        a = arguments[0];

        // Clip input to min and max
        if ( a < 2 ){
            Post("Number of conditions must be 2 or greater for pairwise comparison test. \n");
            return;
        }

        // Update global number of pairs
        post("Number of conditions:", a, '\n');
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
        post("Created pairings: " + JSON.stringify(comparisonPairObj) + "\n");

        if(_numConditions > 2){
            _ratings =  new Array(comparisonPairObj.Pair.length);
            _randomizedOrder = new Array(comparisonPairObj.Pair.length);
        }

        if(_numConditions == 2){
            _ratings =  new Array(1);
            _randomizedOrder = new Array(1);
        }

        // Initialize the ratings array to 0.
        if(_numConditions > 2)
        {
            for (i=0; i<comparisonPairObj.Pair.length; i++)
            {
                _randomizedOrder[i] = i;
                _ratings[i] = 0;
            }
        }

        if(_numConditions == 2)
        {
            _randomizedOrder[0] = 0;
            _ratings[0] = 0;
        }


        // FlipConditions();
        RandomizeConditions();

        post("Initialize Paired Comparison ordering:", _randomizedOrder, "\n");
        // post("Current Pair:", "A =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition1, "B =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition2, '\n');

        // Select A condition. 
        conA_btn = this.patcher.getnamed("conA");
        conB_btn = this.patcher.getnamed("conB");
        SelectCondition(0);

    } else // Complain about arguments
    {
      post("setTest message needs arguments");
    }
}

// *************************
// Test operation
// *************************


// Randomly flip the A/B conditions so they are not always presented as the same condition. 
function FlipConditions(){
    if(_numConditions > 2){
        for(i=0; i<comparisonPairObj.Pair.length;i++){
            if(Math.round(Math.random())==1){
                var tmp1 = comparisonPairObj.Pair[i].condition1;
                var tmp2 = comparisonPairObj.Pair[i].condition2; 
    
                comparisonPairObj.Pair[i].condition1 = tmp2;
                comparisonPairObj.Pair[i].condition2 = tmp1;
            }
        }
    }
    if(_numConditions == 2){
        for(i=0; i<=1;i++){
            if(Math.round(Math.random())==1){
                var tmp1 = comparisonPairObj.Pair.condition1;
                var tmp2 = comparisonPairObj.Pair.condition2; 
    
                comparisonPairObj.Pair.condition1 = tmp2;
                comparisonPairObj.Pair.condition2 = tmp1;
            }
        }
    }

    if(_numConditions > 2){
        post("Current Pair:", "A =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition1, "B =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition2, '\n');
    }
    if(_numConditions == 2){
        post("Current Pair:", "A =", comparisonPairObj.Pair.condition1, "B =", comparisonPairObj.Pair.condition2, '\n');
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



// function writeResults()
// {
//     try
//     {
//     //post(_ratings, '\n');
//     pair = 0;

//     for (i=0; i<_ratings.length; i++)
//     {
//         _results[pair] = comparisonPairObj.Pair[i].condition1;          // Condition A.
//         _results[pair+1] = comparisonPairObj.Pair[i].condition2;        // Condition B.
//         _results[pair+2] = _ratings[i];
//         pair += 3;
//     }
//     outlet(1, "writeResults", currentSceneID, String(" Rating: " + _results),  String(" Info: " + [currentUnitySceneID, currentVideoFile, currentVideoID].join(' ')));
//     RandomizeConditions();
//     }catch(error)
//     {
//         post(error, '\n');
//     }
// }

function WriteResult(ThisItemNumber) {
    outlet(1, "WriteResult", ThisItemNumber, JSON.stringify(ConstructDict()));
    //RandomizeConditions();
}

function ConstructDict(){

    var result = {
        "SceneID" : currentSceneID,
        "UnitySceneID" : currentUnitySceneID,
        "VideoFile" : currentVideoFile,
        "VideoID" : currentVideoID,
        "Ratings" : {}
    };

    var results_list = [];

    if(_numConditions > 2){
        for (i=0; i<comparisonPairObj.Pair.length; i++)
        {   
            var pair = {
                "condition01" : comparisonPairObj.Pair[i].condition1,
                "condition02" : comparisonPairObj.Pair[i].condition2,
                "Rating" : _ratings[i]
            }
            results_list.push(pair);
        }
        result.Ratings = results_list;              
    }
    if(_numConditions <= 2){
        var pair = {
            "condition01" : comparisonPairObj.Pair.condition1,
            "condition02" : comparisonPairObj.Pair.condition2,
            "Rating" : _ratings[0]
        }
        //results_list.push(pair);
        result.Ratings = pair
    }

    return(result)
}


// Randomize the conditions. 
function RandomizeConditions()
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

    // if(_numConditions > 2){
    //     post("Current Pair:", "A =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition1, "B =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition2, '\n');
    // }
    // if(_numConditions == 2){
    //     post("Current Pair:", "A =", comparisonPairObj.Pair.condition1, "B =", comparisonPairObj.Pair.condition2, '\n');
    // }


    // Reset the results to 0.
    if(_numConditions > 2){
        for (i=0; i<comparisonPairObj.Pair.length; i++)
        {
            _ratings[i] = 0;
        }
    }
    if(_numConditions <= 2){
        _ratings[0] = 0;
    }

    // Randomly flip the conditions again. 
    FlipConditions()
}

function SelectCondition()
{
    if(_numConditions > 2){
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
    if(_numConditions == 2){
        switch(arguments[0])
        {
            case 0:
                currentPairCondition = 0; 
                outlet(0, "selectCondition", comparisonPairObj.Pair.condition1);
                conA_btn.message("bgfillcolor", 0.14, 0.51, 0.47, 1.000);
                conB_btn.message("bgfillcolor", 0.2, 0.2, 0.2, 1.000);                       
                break;

            case 1:
                currentPairCondition = 1;
                outlet(0, "selectCondition", comparisonPairObj.Pair.condition2);
                conB_btn.message("bgfillcolor", 0.14, 0.51, 0.47, 1.000);
                conA_btn.message("bgfillcolor", 0.2, 0.2, 0.2, 1.000);           
                break; 
        }
    }
}

function IncrementPair()
{
    if(currentConditionPair+1 < comparisonPairObj.Pair.length){
        post("Set Rating:", "A =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition1, "B =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition2, "Rating = ", _ratings[_randomizedOrder[currentConditionPair]],'\n');
    }

    if(currentConditionPair<comparisonPairObj.Pair.length-1)
    {      
        currentConditionPair++;
        post("Current Pair:", "A =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition1, "B =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition2, '\n');
        this.patcher.getnamed("PCslider").message("float", 60);
        SelectCondition(0);
    }   
    post(currentConditionPair+1, "out of", comparisonPairObj.Pair.length, '\n');
}






=======
/**
 * @fileOverview Contains all functions related setting multi stimulus methodology within the methodmultistimulus.maxpat file.
 * @author  Robotham., T.M
 * @version 1.0
 * @module  pairedcomparison.js
 */

autowatch = 1;
// inlets and outlets
// inlets = 1;
outlets = 2;


// Global variables and arrays
var _numConditions = 0; // Global variable used to store number of conditions / _sliders.
var _mapping;    // Global variable used to store the randomization _mapping information for conditions and buttons.
var _theRatings; // Stores the received rating values of the conditions from the _sliders.
var _results;                       // Stores the rating values for each condition and the respective condition from the _mapping[] randomization array.

var currentConditionPair = 0;
var comparisonPairObj;
var currentSceneID = "config";
var currentUnitySceneID = "_config";
var currentVideoFile = "<null>";
var currentVideoID = "<null>";

var conA_btn;   // Reference to GUI A button
var conB_btn;   // Reference to GUI B button

var currentPairCondition = 0;

// *************************
// Instansiate objects
// *************************

function setTest(val)
{

    var tmpPairs = new Dict();
    var tmpPairSets = new Dict();

    if(arguments.length) // Bail if no arguments
    {
        // Parse arguments
        a = arguments[0];

        // Clip input to min and max
        if(a<=0){
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
        // post(JSON.stringify(comparisonPairObj));

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

        // FlipConditions();
        RandomizeConditions();

        // post("Initialize Paired Comparison ordering:", _randomizedOrder, "\n");
        // post("Current Pair:", "A =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition1, "B =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition2, '\n');

        // Select A condition. 
        conA_btn = this.patcher.getnamed("conA");
        conB_btn = this.patcher.getnamed("conB");
        SelectCondition(0);

    } else // Complain about arguments
    {
      post("_sliders message needs arguments");
    }
}

// *************************
// Test operation
// *************************


// Randomly flip the A/B conditions so they are not always presented as the same condition. 
function FlipConditions(){
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



// function writeResults()
// {
//     try
//     {
//     //post(_ratings, '\n');
//     pair = 0;

//     for (i=0; i<_ratings.length; i++)
//     {
//         _results[pair] = comparisonPairObj.Pair[i].condition1;          // Condition A.
//         _results[pair+1] = comparisonPairObj.Pair[i].condition2;        // Condition B.
//         _results[pair+2] = _ratings[i];
//         pair += 3;
//     }
//     outlet(1, "writeResults", currentSceneID, String(" Rating: " + _results),  String(" Info: " + [currentUnitySceneID, currentVideoFile, currentVideoID].join(' ')));
//     RandomizeConditions();
//     }catch(error)
//     {
//         post(error, '\n');
//     }
// }

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
        "Ratings" : {}
    };

    var results_list = [];

    for (i=0; i<comparisonPairObj.Pair.length; i++)
    {   
        var pair = {
            "condition01" : comparisonPairObj.Pair[i].condition1,
            "condition02" : comparisonPairObj.Pair[i].condition2,
            "Rating" : _ratings[i]
        }

        results_list.push(pair);
    }
    result.Ratings = results_list;
    return(result)
}


// Randomize the conditions. 
function RandomizeConditions()
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
    FlipConditions()
}

function SelectCondition()
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

function IncrementPair()
{
    if(currentConditionPair+1 < comparisonPairObj.Pair.length){
        post("Set Rating:", "A =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition1, "B =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition2, "Rating = ", _ratings[_randomizedOrder[currentConditionPair]],'\n');
    }

    if(currentConditionPair<comparisonPairObj.Pair.length-1)
    {      
        currentConditionPair++;
        post("Current Pair:", "A =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition1, "B =", comparisonPairObj.Pair[_randomizedOrder[currentConditionPair]].condition2, '\n');
        this.patcher.getnamed("PCslider").message("float", 60);
        SelectCondition(0);
    }   
    post(currentConditionPair+1, "out of", comparisonPairObj.Pair.length, '\n');
}






>>>>>>> e7510e68f2033ab163d2489a175efb232549d479
