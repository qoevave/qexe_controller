autowatch = 1;
compile = 1;

g = new Global("blah")
g.bar = 1000
g.thing = "x y z";


function loadbang(){
    text_scene_id = this.patcher.getnamed("text_scene_id");
    text_unity_scene_id = this.patcher.getnamed("text_unity_scene_id");
    text_degrees_of_freedom = this.patcher.getnamed("text_degrees_of_freedom");
    text_scene_index = this.patcher.getnamed("text_scene_index");
    text_dimensions = this.patcher.getnamed("text_dimensions");
    label_dimensions = this.patcher.getnamed("label_dimensions");
}

function testing(val){
    g.sendnamed("foo", val);
}