/**
 * @fileOverview Contains all functions related to loading audio buffers within the polybuffer~
 * object.
 * @author  Robotham., T.M
 * @version 1.0
 * @module polybuffer~.js
 */


/**
 * Global Polybuffer~ object.
 * @type {polyBuffer}
 */
var _polybuffer = new PolyBuffer(jsarguments[1]);

var absolutePath;

outlets = 3;


/**
 * Opens the polybuffer~ window to view contained buffer~ array and files (reserved).
 */
function OpenObjectsWindow()
{
    _polybuffer.open();
}


function ClearBuffer(){
    _polybuffer.clear();
}



/**
 * Closes the polybuffer~ window (reserved).
 */
function Closewindow()
{
    _polybuffer.wclose();
}


/**
 * Posts to console the number of items loaded into the polybuffer~
 * @readOnly
 */
function GetCount()
{
    post("Number of items in the polybuffer:", _polybuffer.count);
}


/**
 * Posts to console the memory usage of the polybuffer~ (Bytes)
 * @readonly
 */
function GetSize()
{
    post("Memory used in the polybuffer:", _polybuffer.size, " bytes\n");
    outlet(2, "displayObjectBufferSize", _polybuffer.size);
}


/**
 * Reads a directory of audio files into the polybuffer~ object. <br>
 * Sets all the buffer names inside the gen~ objects. <br>
 *
 * `outlet[0]` = Sequentially sends out names of all audio buffers~ contained within polybuffer~.<br>
 * `outlet[1]` = Stops autostart playback when buffer~ is set. <br>
 * @param  {message} dir - Absolute 'path/to/directory' containing audio files.
 */
function ReadFolder(dir)
{
    // Reads a directory of audio files into the polybuffer~ object.
    //_polybuffer.clear();

    _polybuffer.readfolder(dir);
    post("Reading folder: ", dir, " \n");

    GetCount();
    GetSize();
    checkSampleRates();

    try{
    	for (i = 1; i <= _polybuffer.count; i++)
    	{
    		post("setvalue "+ i + " to buffer" + _polybuffer.name+"."+i +"\n");
            outlet(0, String(i + " sample audio." + (i)));
    	}
    }catch(e){
        post("ERROR setting buffer names...")
    }

    try{
        for (i = _polybuffer.count + 1; i < 63; i++)
        {
            outlet(0, String(i + " sample audio.100"));
        }
    }catch(e){
        post("ERROR setting empty buffers...")
    }

    outlet(1, "stop");
}



/**
 * Parses the absolute path where this.patcher is located on the current machine.
 * @param {message} dir - Absolute 'path/to/directory' where this.patcher is located.
 */
function ProvideAbsolutePath(dir)
{
    // setting the absolute path of the system / machine being used.
    absolutePath = dir;
    post("Setting absolute path: ", dir);
}


function anything()
{
    // dynamically send any message to the polybuffer~ object
    if (arguments.length > 0) {
        eval("_polybuffer." + messagename + "(arrayfromargs(arguments))");
    } else
        eval("_polybuffer." + messagename + "()");
}


function notifydeleted()
{
    // delete the polybuffer
    _polybuffer.freepeer();
}


function printany(name)
{
    // instantiate new polybuffer~ with name "name". if named polybuffer~ exists in patcher,
    // then link to it.
    var tmp = new PolyBuffer(name);
    // post the polybuffer~'s contents to Max window
    tmp.print();
    // delete the polybuffer~
    tmp.freepeer();
}


/**
 * Checks the audio files loaded into the polybuffer for any conflicts of sample rate. <br>
 * Prints console wanring is conflict present.
 */
function checkSampleRates()
{
    var tmp = _polybuffer.dump();
    var sampleRates = [];

    for (i=1; i<=_polybuffer.count;i++)
    {
        sampleRates[i-1] = tmp[(i*5)+(i-1)];
    }

    for (i=1; i<=sampleRates.length-1; i++)
    {
        if(sampleRates[i]!=sampleRates[i-1])
        {
            error("WARNING: Scene audio files loaded have a sample rate conflict.", "\n");
            break;
        }
    }
}
