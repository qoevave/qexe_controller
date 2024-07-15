/**
 * @fileOverview Functions for controlling audio scene information of currently selected scene.
 *
 * `inlet[0]` = Receives all function calls. <br>
 * `outlet[0]` = Send to polybuffer~.js module for buffer control.
 * @author  Robotham., T.M
 * @version 1.0
 * @module  sceneinfoaudio.js
 */

outlets = 3;
autowatch = 1;
compile = 1;


var text_objects_folder = this.patcher.getnamed("objectsFolder");
var text_number_of_objects = this.patcher.getnamed("numberOfObjects");
var text_number_of_files = this.patcher.getnamed("numberOfFiles");
var text_objects_buffer_size = this.patcher.getnamed("polybufferSize");
var text_multichannel_file = this.patcher.getnamed("multichannelFile");

var objectVoiceButtons = new Array(12);
var objectVoiceNumber = 0;

// include("utils.js");

function FindObjects(){

    text_objects_folder = this.patcher.getnamed("objectsFolder");
    text_number_of_objects = this.patcher.getnamed("numberOfObjects");
    text_number_of_files = this.patcher.getnamed("numberOfFiles");
    text_objects_buffer_size = this.patcher.getnamed("polybufferSize");
    text_multichannel_file = this.patcher.getnamed("multichannelFile");
}


function ClearBuffer()
{
    text_number_of_objects.set();
    text_number_of_files.set()
    text_multichannel_file.setwithtruncation(" ", 300);
    text_objects_folder.setwithtruncation(" ", 300);
    text_objects_buffer_size.set();
    outlet(0, "objects" ,"ClearBuffer");
    outlet(0, "multichannel" ,"ClearBuffer");
    outlet(2, "Display", "clear");
    outlet(2, "Filename", 0, "clear");
}



function SetObjectsInformation(args){

    var CONTENTDIRECTORY = arguments[0];
    var SceneSpecificDirectory = String(arguments[1]);
    outlet(0, "objects", "ReadFolder", CONTENTDIRECTORY+"/"+SceneSpecificDirectory);
    text_objects_folder.setwithtruncation(SceneSpecificDirectory, 300);

    post("Audio files count:", arguments[2], "\n");
    text_number_of_files.set(arguments[2]);

    post("Virtual sources count:", arguments[3], "\n");
    text_number_of_objects.set(arguments[3]);
    outlet(1, "numberOfSources", arguments[3]);
}

/**
 * Sets the GUI to display the folder containing files for ambisonic-based audio.
 * @param {list} paths Absolute/path/to/project CONTENTDIRECTORY, path/to/audio/objects directories.
 * @this {parentPatcher}
 */
function SetMultichannelInformation(args)
{
    var CONTENTDIRECTORY = arguments[0];
    var file = arguments[1];
    outlet(0, "multichannel" , "ReadAmbisonicsFolder", CONTENTDIRECTORY+"/"+file);
    text_multichannel_file.setwithtruncation(file, 300)
}



function clearObjects(){
    for(i=0; i<objectVoiceNumber; i++){
        this.patcher.remove(objectVoiceButtons[i]);
    }
}

function SetButtons(pipeline, numberOfObjectVoices){

    clearObjects()
    objectVoiceNumber = numberOfObjectVoices;

    for(i=0;i<objectVoiceNumber; i++) {

        objectVoiceButtons[i] = this.patcher.newdefault(660+(i*30), 330+(i*30), "message");
        objectVoiceButtons[i].message("set", i+1);
        objectVoiceButtons[i].message("presentation", 1);      
        objectVoiceButtons[i].message("bgfillcolor", 0.200, 0.200, 0.200, 1.000);
        objectVoiceButtons[i].message("fontface", 1);
        objectVoiceButtons[i].message("fontsize", 12);
        objectVoiceButtons[i].message("textjustification", 1);

        if (pipeline === "Objects"){
            objectVoiceButtons[i].message("presentation_rect", 137 + (i*40), 381, 30, 20);
            this.patcher.connect(objectVoiceButtons[i], 0, this.patcher.getnamed("prependOpen"), 0);
        }

        if (pipeline ==="Multichannel"){
            objectVoiceButtons[i].message("presentation_rect", 137 + (i*40), 482, 30, 20);
            this.patcher.connect(objectVoiceButtons[i], 0, this.patcher.getnamed("prependOpenAmbis"), 0);
        }
    }
}


function displayObjectBufferSize(bufferSize){
    // this.patcher.message("script", "sendbox", "polybufferSize", "set", bufferSize);
    text_objects_buffer_size.set(bufferSize);
}


function ObjectRouting(index, inputchannel, active, name){
    // Output for the actual control matrix of audio files to audio objects
    outlet(2, "Matrix", index, inputchannel, active);
    // Output for the display GUI with the X and Y axis reversed.
    outlet(2, "Display", inputchannel, index, active);
    // Output of the filename to the GUI
    outlet(2, "Filename", index, name);

}