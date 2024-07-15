autowatch = 1;
inlets = 2;
outlets = 1;

var text_filenames = new Array(32)
initialized = 0;

function initialize(){
    for (var i = 0; i < 32; i++)
    {
        text_filenames[i] = this.patcher.getnamed(String("file"+i));
    }
    initialized = 1;
}

function Filename(index, filename)
{
    if (filename == "clear" && initialized == 1){
        for (var i = 0; i < 32; i++)
        {
            text_filenames[i].setwithtruncation(" ", 100);
        }
        return;
    }
    text_filenames[index].setwithtruncation(filename, 100);
}

