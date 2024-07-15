/**
 * @fileOverview Contains all functions for writing results files.
 *
 * Inlet[0] = Receives all function calls. <br>
 *
 * @author  Robotham., T.M
 * @version 1.0
 * @module  writeresults.js
 */


const fs = require("fs");
const path = require("path");
const util = require("util");
const max = require("max-api");
const os = require("os");

max.post('node.js: writeresults.js instantiated');

//max.outlet('running', 'openFolder');

/**
 * WriteStream for the methodology results.
 */
var resultsWriteStream;

/**
 * WriteStream for the questionnaire results.
 */
var questionnaireWriteStream;

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var todaysPath;     // path to new dir for todays results.
var subjectsPath;   // path to subdir for this subjects results.

var subjectID;

var methodology;

var modality;

var questionnaireActive;

var questionnaireType;

var questionnaireIntegration;

var numberofitems;

var audioConditions=[];

var resultsStreamOpen = false;

var questionStreamOpen = false;


/**
 * @name openFolder
 * @function
 * @description  Called as soon at the application has started and the node script has initialized.
 * Calls @see CreateDir to create a new subdirectory for saving any test results for the current day.
 * Sets 'todaysPath' variable, and default subjectID as 'id_unknown'.
 */
max.addHandler('openFolder', (path) => {
    date = GetDate();
    todaysPath = path+'../results/'+date;
    CreateDir(todaysPath);
    subjectID = 'id_unknown';
});

/**
 * @name setSubjectID
 * @function
 * @description Sets the subject ID to what the user wants. Used when creating the subdirectories for new tests.
 * @param {string} id - Subjects' id to be used in the results file system.
 */
max.addHandler('setSubjectID', (id) => {
    subjectID = id;
    max.post('Subject ID set:', subjectID);
});


/**
 * @name setInfoForResults
 * @function
 * @description Sets the information for the results file.
 * @param  {list} ...args - Ordered list of information containing: methodology, modailty, and number of items.
 */
max.addHandler('setInfoForResults', (...args) => {
    methodology = args[0];
    modality = args[1];
    numberofitems = args[2];
});

/**
 * @name setInfoForQuestionnaire
 * @function
 * @description Recieves the information from testManager.js module to set the information for the questionnaire
 * resuls file.
 * @param  {list} ...agrs - Ordered list of information containing: questionnaireActive, questionnaireType, and
 * questionnaireIntegration.
 */
max.addHandler('setInfoForQuestionnaire', (...args) => {
    questionnaireActive = args[0];
    questionnaireType = args[1];
    questionnaireIntegration = args[2];
});


/**
 * @name setConditions
 * @function
 * @description Receives the list of condition information from the testManager.js module to store in the
 * results files.
 * @param  {list} ...args - List of conditions to save. (Should contain at least the path to the VST and the
 * VSTParameterMap for each condition.)
 */
max.addHandler('setConditions', (...args) => {
    audioConditions = args;
});


/**
 * @name writeResults
 * @function
 * @description Called everytime the user goes from one scene to another via the nextItem(set) incoming
 * OSCmessage. The results in the loaded methodology are assembled into a message and sent out to
 * this class. This writeResults function will recognise if the first scene was 'config'. If yes,
 * the user has begun a test and the function will open up a new subject subdirectory and writeable
 * text streams for the results and questionnaire files.
 * @param  {list} ...args - List of results arguments coming from the methodology. The first
 * argument must always be the SceneID. After that, anything is permissable.
 */
max.addHandler('writeResults', (...args) =>
{
    //max.post(...args);
    if(args[0]=='config') {
        // Close any resultWriteStream if open before opening a new one.
        try
        {
            if(resultsStreamOpen) {
                resultsWriteStream.close();
                resultsStreamOpen = false;
                max.post("Closed previous results node.js stream.");
            }
        }catch(error){
            max.post("Error in closing results write stream:", error, '\n');
        }

        try
        {       
            if(questionStreamOpen) {
            questionnaireWriteStream.close();
            questionStreamOpen = false;
            max.post("Closed previous questionnaire node.js stream");
            }
        }catch(error){
            max.post("Error in closing questionnaire write stream:", error, '\n');
        }


        time = GetTime('short');
        // Create sub-directory for this subject.
        subjectsPath = todaysPath + '/subj_' + subjectID + '_' + time;
        CreateDir(subjectsPath);

        


        // Name of the result file.
        filename = ['results_', subjectID, '_', time, '.txt'];
        filename = filename.join('');

        // Create an append and read results.txt stream.
        try{
            resultsWriteStream = fs.createWriteStream(subjectsPath + '/' + filename, {flags:'a+'});
        }catch(error){
            max.post("Error in results createWriteStream():", error, '\n');
        }
       
        // Write first line, on the time the file was created.
        resultsWriteStream.write("Test start @ " + String(GetTime('long')) + '\n');
        // Used to check if a stream is already open (sometimes there may be access rights to close
        // an open writeStream for non async operations.)
        resultsStreamOpen = true;
        WriteResultsPreamble();

        // Name of the questionnaire file.
        questionFile = ['question_', subjectID, '_', time, '.txt'];
        questionFile = questionFile.join('');
        // Create an append and read question.txt stream.
        try{
            questionnaireWriteStream = fs.createWriteStream(subjectsPath + '/' + questionFile, {flags: 'a+'});
        }catch(error){
            max.post("Error in questionnaire createWriteStream():", error, '\n');
        }

        // Write first line.
        questionnaireWriteStream.write("Test start @ " + String(GetTime('long')) + '\n');
        questionStreamOpen = true;


        WriteQuestionPreamble();
        // TODO: Call anything else (e.g., writing in the conditions, results file preamble. )
    }
    else {
        try{
            resultsWriteStream.write(String(args) + '\n');
        }catch(error){
            max.post("Error in results write():", error, '\n');
        }

    }
});

/**
 * @name writeQuestionnaire
 * @function
 * @description Write the incomming questionnaire results.
 * @param  {list} ...args List of all the information for one questionnaire.
 */
max.addHandler('writeQuestionnaire', (...args) =>
{
    if(args[0]!='config'){
        questionnaireWriteStream.write(String(args) + '\n');
    }
});


/**
 * @name closeStreams
 * @function
 * @description  Closes any open writeStreams
 */
max.addHandler('closeStreams', () => {
    CloseStreams();
});

/**
 * @name restart
 * @function
 * @description Restarts any data for the resultsWrite. Calls the function to close any open streams.
 */
max.addHandler('restart', () => {
    CloseStreams();
});

/**
 * @name WriteResultsPreamble
 * @function
 * @description  Sends information to the stream for all the test results preamble (Methodology,
 * Modailty, Number of items, and the list of the audio conditions used).
 */
function WriteResultsPreamble() {
    try
    {
        resultsWriteStream.write("# TestInfo" + '\n');
        resultsWriteStream.write("Methodology " + methodology + '\n');
        resultsWriteStream.write("Modality " + modality + '\n');
        resultsWriteStream.write("Number of Items " + numberofitems + '\n');
        resultsWriteStream.write("# AudioConditions" + '\n');
        for (i=0;i<audioConditions.length;i++) {
            resultsWriteStream.write(audioConditions[i] + '\n');
        }
        resultsWriteStream.write("# TestResults" + '\n');
    }catch(error){
        max.post("Error in writing results file preamble:", error, '\n');
    }

}

/**
 * @name WriteQuestionPreamble
 * @function
 * @description  Sends information to the stream for all the questionnaire results preamble (Questionnaire
 * used, type of test integration, and the list of the audio conditions used).
 */
function WriteQuestionPreamble() {
    try{
        questionnaireWriteStream.write("# QuestionnaireInfo" + '\n');
        questionnaireWriteStream.write("Questionnaire " + questionnaireActive + '\n');
        questionnaireWriteStream.write("Type " + questionnaireType + '\n');
        questionnaireWriteStream.write("Integration " + questionnaireIntegration + '\n');
        questionnaireWriteStream.write("# AudioConditions" + '\n');
        for (i=0;i<audioConditions.length;i++) {
            questionnaireWriteStream.write(audioConditions[i] + '\n');
        }
        questionnaireWriteStream.write("# QuestionnaireResults" + '\n');
    }catch(error){
        max.post("Error in writing questionnaire file preamble:", error, '\n');
    }
}

/**
 * Close the streams if they are open.
 */
function CloseStreams() {
    if(resultsStreamOpen) {
        resultsWriteStream.close();
        resultsStreamOpen = false;
    }
    if(questionStreamOpen) {
        questionnaireWriteStream.close();
        questionStreamOpen = false;
    }
}

/**
 * Create a directory to save the subjects result files.
 * @param {string} Directory - Path of the directory to create.
 */
function CreateDir(Directory) {
    try {
        if(!fs.existsSync(Directory)) {
            fs.mkdirSync(Directory, {recursive : true});
            max.post('New directory opened: ', Directory);
        } else {
            max.post('Directory already exists: ', Directory);
        }
    } catch (err) {
        max.post(err);
    }
}

// <summary>
// combines the data returned from the timestamp with '.txt'
// <summary>
function getfilename()
{
    var name = getTimestamp();
    name = name.concat('.txt');
    return(name);
}

// <summary>
// get the current time from the local system
// returns the date weekday/date/month/year
// <summary>
function GetDate()
{
    d = new Date();

    year = d.getFullYear();
    month = ("0" + (d.getMonth() + 1)).slice(-2);
    date  = ("0" + d.getDate()).slice(-2);
    day = d.getDay();
    date = [days[day], date, (month), year];
    date = date.join('_');
    return(date);
}

// <summary>
// get the current time from the local system
// returns the time hours/minutes
// <summary>
function GetTime(format)
{
    d = new Date();

    hours = d.getHours();
    minutes = ("0" + (d.getMinutes() + 1)).slice(-2);
    seconds = d.getSeconds();
    mills = d.getMilliseconds();

    timeShort = [hours, minutes];
    timeShort = timeShort.join('');

    timeLong = [hours, minutes, seconds, mills];
    timeLong = timeLong.join(':');

    return format == 'short' ? timeShort : timeLong
}


