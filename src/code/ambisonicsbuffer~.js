autowatch = 1;
compile = 1;

var _ambisonicsbuffer = this.patcher.getnamed("ambisonics_buffer");

function ReadAmbisonicsFolder(dir)
{
    // Reads a directory of audio files into the polybuffer~ object.
    post("Reading ambisonics file: ", dir, " \n");
    // _ambisonicsbuffer.message("clear");

    try{
        outlet(0, "replace", dir);
        _ambisonicsbuffer.message("replace", dir);
    }catch(e){
        post("Error in reading ambisoncs folder:", e,'\n');
    }

    // post("Number of channels in buffer:", _ambisonicsbuffer.message("channelcount"), '\n');
}


/**
 * Opens the buffer~ window to view contained buffer~ for ambisoncis file.
 */
function OpenAmbisonicsWindow()
{
    _ambisonicsbuffer.message("open");
}

function ClearBuffer(){
    _ambisonicsbuffer.message("clear");
}
