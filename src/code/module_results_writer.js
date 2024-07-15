const fs = require("fs");
// const path = require("path");
// const util = require("util");
const max = require("max-api");
// const os = require("os");

max.post('node.js: writeresults.js instantiated');

var resultsWriteStream;
var resultsStreamOpen = false;
var questionnaireWriteStream;
var questionnaireStreamOpen = false;

// var audioConditions = ["GBR", "GBR2", "SPAARTA"];

// var audioConditionsMapper = ["../path1", "../path/deeper", "../Aalto"];

var TodaysPath;

var SubjectsPath;

var Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Information for results files. 
var AudioConditionsID = [];
var ConditionPathArray = [];
var HRTFInfoArray = [];
var ParameterMap = [];
var Numberofitems = 3;
var SubjectID = "null";
var Methodology = "null";
var Modality = "null";
var QuestionnaireType = "null";
var QuestionnaireIntegration = "null";
var QuestionnaireActive = 0;


// Create a results folder for today is there isn't one there.
max.addHandler('OpenFolder', (path) => {
    date = GetDate();
    if(path == null){
        path = process.cwd();
        TodaysPath = path+'../results/'+date;
        CreateDir(TodaysPath);
    }else{
        TodaysPath = path+'/'+date;
        CreateDir(TodaysPath);
    }
    SubjectID = 'id_unknown';
});

// Sets the subjects ID. 
max.addHandler('SetSubjectID', (id) => {
    SubjectID = id;
    max.post('Subject ID set:', SubjectID);
});

max.addHandler('SetInfoForResults', (...args) => {
    Methodology = args[0];
    Modality = args[1];
    Numberofitems = args[2];
});

max.addHandler('SetInfoForQuestionnaire', (...args) => {
    QuestionnaireActive = args[0];
    QuestionnaireType = args[1];
    QuestionnaireIntegration = args[2];
});

max.addHandler('SetConditionID', (...args) => {
    AudioConditionsID = args;
});

max.addHandler('SetConditionPath', (...args) => {
    ConditionPathArray = args;
});

max.addHandler('SetConditionHRTF', (...args) => {
    HRTFInfoArray = args;
});

max.addHandler('SetConditionParameterMap', (...args) => {
    ParameterMap = args;
});

max.addHandler("Restart", () => {
    CloseStreams();
    CloseQuestionnaireStream();
});

max.addHandler("GiveSubjectsResultsFile", (...args) => {
    max.outlet('subjectsDir', 'SendToUnity', 'give_subjects_results_directory', SubjectsPath);
});

// ********************
// Test results writing
// ********************

max.addHandler("WriteResult", (...args) => {   
    max.post("module_ResultsWriter:", args[0], args[1]);
    if(args[0] == 0){
        CreateTestStream();
        WriteResultsOpeningPreamble();
    }
    if(args[0] == Numberofitems){
        resultsWriteStream.write(args[1] + '\n');
        resultsWriteStream.write("]");
        CloseStreams();
    }
    if(args[0] < Numberofitems){
        resultsWriteStream.write(args[1] + ", " + '\n');
    }
    if(args[0] > Numberofitems){
        CloseStreams();
    }
});

// Methods 
function CreateTestStream(){
    if(resultsStreamOpen) {
        CloseStreams();
    }

    // Open directory.
    var time = GetTime('short');
    SubjectsPath = TodaysPath + '/subj_' + SubjectID + '_' + time;
    CreateDir(SubjectsPath);

    // Construct filename.
    var resultfilename = ['results_', SubjectID, '_', time, '.json'];
    resultfilename = resultfilename.join('');

    // Open stream.
    try{
        max.post(process.cwd(), '\n');
        resultsWriteStream = fs.createWriteStream(SubjectsPath + '/' + resultfilename, {flags:'a+'});
        resultsStreamOpen = true;
    }catch(error){
        max.post("Error in results createWriteStream():", error, '\n');
    }
}

function WriteResultsOpeningPreamble(){
    resultsWriteStream.write("{ \"ResultsFile\" :" + '\n');
    resultsWriteStream.write("{ \"TestInformation\" :" + '\n');
    WriteTestInformation();
    WriteAudioConditionsInformation();
    resultsWriteStream.write("\"TestResults\" : [" + '\n');
}

function WriteTestInformation(){
    var TestInformation = {
        "Method" : Methodology,
        "Modality" : Modality,
        "NumberOfItems" : Numberofitems,
        "QuestionnaireType" : QuestionnaireType,
        "QuestionnaireIntegration" : QuestionnaireIntegration
    }
    resultsWriteStream.write(JSON.stringify(TestInformation) + ", " + '\n');
}


function WriteAudioConditionsInformation(){
    resultsWriteStream.write(" \"AudioConditions\" : [" + '\n');
    for (i=0;i<AudioConditionsID.length;i++) {
        var TempConditionDict = {
            "Legend" : i,
            "VST" : AudioConditionsID[i],
            "VSTPath" : ConditionPathArray[i],
            "VSTmapper" : ParameterMap[i],
            "HRTF" : HRTFInfoArray[i]
        }
        if(i < AudioConditionsID.length-1){
            resultsWriteStream.write(JSON.stringify(TempConditionDict)  + ", " + '\n');
        }
        if(i == AudioConditionsID.length-1){
            resultsWriteStream.write(JSON.stringify(TempConditionDict) + '\n');
        }
    }
    resultsWriteStream.write("] ," + '\n');
}

function CloseStreams() {
    if(resultsStreamOpen) {
        resultsWriteStream.write("}" + '\n' + "}" + '\n');
        resultsStreamOpen = false;
        resultsWriteStream.close();
    }
}

// *****************************
// Questionnaire results writing
// *****************************

max.addHandler("WriteQuestionnaire", (...args) => {   
    max.post("module_QuestionnaireWriter:", args[0], args[1]);
    if(args[0] == 0){
        CreateQuestionnaireStream();
        WriteQuestionnaireOpeningPreamble();
    }
    if(args[0] == Numberofitems){
        questionnaireWriteStream.write(args[1] + '\n');
        questionnaireWriteStream.write("]");
        CloseQuestionnaireStream();
    }
    if(args[0] < Numberofitems){
        questionnaireWriteStream.write(args[1] + ", " + '\n');
    }
    if(args[0] > Numberofitems){
        CloseQuestionnaireStream();
    }
});

// Methods 
function CreateQuestionnaireStream(){
    if(questionnaireStreamOpen) {
        CloseQuestionnaireStream();
    }

    // Open directory.
    var time = GetTime('short');
    SubjectsPath = TodaysPath + '/subj_' + SubjectID + '_' + time;
    //CreateDir(SubjectsPath);
    // max.outlet('subjectsDir', 'giveResultsDir', SubjectsPath);

    // Construct filename.
    var questionnairefilename = ['questionnaire_', SubjectID, '_', time, '.json'];
    questionnairefilename = questionnairefilename.join('');

    // Open stream.
    try{
        max.post(process.cwd(), '\n');
        questionnaireWriteStream = fs.createWriteStream(SubjectsPath + '/' + questionnairefilename, {flags:'a+'});
        questionnaireStreamOpen = true;
    }catch(error){
        max.post("Error in questionnaire createWriteStream():", error, '\n');
    }
}

function WriteQuestionnaireOpeningPreamble(){
    questionnaireWriteStream.write("{ \"QuestionnaireFile\" :" + '\n');
    questionnaireWriteStream.write("{ \"TestInformation\" :" + '\n');
    WriteQuestionnaireInformation();
    WriteAudioConditionsInformationQuestionnaire();
    questionnaireWriteStream.write("\"QuestionnaireResults\" : [" + '\n');
}

function WriteQuestionnaireInformation(){
    var TestInformation = {
        "Method" : Methodology,
        "Modality" : Modality,
        "NumberOfItems" : Numberofitems,
        "QuestionnaireType" : QuestionnaireType,
        "QuestionnaireIntegration" : QuestionnaireIntegration
    }
    questionnaireWriteStream.write(JSON.stringify(TestInformation) + ", " + '\n');
}

function WriteAudioConditionsInformationQuestionnaire(){
    questionnaireWriteStream.write(" \"AudioConditions\" : [" + '\n');
    for (i=0;i<AudioConditionsID.length;i++) {
        var TempConditionDict = {
            "Legend" : i,
            "VST" : AudioConditionsID[i],
            "VSTPath" : ConditionPathArray[i],
            "VSTmapper" : ParameterMap[i],
            "HRTF" : HRTFInfoArray[i]
        }
        if(i < AudioConditionsID.length-1){
            questionnaireWriteStream.write(JSON.stringify(TempConditionDict)  + ", " + '\n');
        }
        if(i == AudioConditionsID.length-1){
            questionnaireWriteStream.write(JSON.stringify(TempConditionDict) + '\n');
            }
        }
        questionnaireWriteStream.write("] ," + '\n'); 
}

function CloseQuestionnaireStream(){
    if(questionnaireStreamOpen) {
        questionnaireWriteStream.write("}" + '\n' + "}" + '\n');
        questionnaireStreamOpen = false;
        questionnaireWriteStream.close();
    }
}

// *********
// Utilities
// *********

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
    date = [Days[day], date, (month), year];
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