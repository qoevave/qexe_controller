outlets = 2;

var vstMapperScript;
var vstIndex;

function load(pathtovst, mappingfile, instance) {
    if (arguments.length < 3 )
        return;

    post("Loading VST:", pathtovst, '\n');
    post("Loading VST Map:", mappingfile, '\n');
    vstIndex = instance;

    clearPatch();

    try {
        outlet(1, "plug", pathtovst);
    } catch (e) {
        error(e, "Could not load VST", '\n');
    }


    try{
        vstMapperScript = this.patcher.newdefault(200, 130, "js", mappingfile, "@autostart", 1, "@watch", 1);
    } catch (e) {
        error(e, "Could not load Mapping File", '\n');
    }

    try{
        this.patcher.connect(vstMapperScript, 0, this.patcher.getnamed("route"), 0);
        this.patcher.connect(this.patcher.getnamed("route"), 0, vstMapperScript, 0);
        this.patcher.connect(this.patcher.getnamed("dynamicData"), 0, vstMapperScript, 0);
    } catch (e) {
        error(e, "Could not connect", '\n');
    }


    var outL = String("out"+(instance+1));
    var outR = String("out"+(instance+2));
    this.patcher.connect(this.patcher.getnamed("vst~"), 0, this.patcher.getnamed(outL), 0);
    this.patcher.connect(this.patcher.getnamed("vst~"), 1, this.patcher.getnamed(outR), 0);
}


function openVST() {
    post("opening vst");
    try {
        outlet(1, "open");
    } catch (e) {
        error(e, "Could not open VST", '\n');
    }
}


function clearPatch() {
    this.patcher.remove(vstMapperScript);
}


function connectAudioIO() {

    // Input
    for (i=1; i<=33; i++)
    {
        this.patcher.connect(this.patcher.getnamed(String("in" + i)), 0, vst, (i-1));
    }
}
