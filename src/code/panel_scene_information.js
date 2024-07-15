autowatch = 1;
compile =1;

var text_scene_id = this.patcher.getnamed("text_scene_id");
var text_unity_scene_id = this.patcher.getnamed("text_unity_scene_id");
var text_degrees_of_freedom = this.patcher.getnamed("text_degrees_of_freedom");
var text_scene_index = this.patcher.getnamed("text_scene_index");
var text_dimensions = this.patcher.getnamed("text_dimensions");
var label_dimensions = this.patcher.getnamed("label_dimensions");

var text_number_of_items = this.patcher.getnamed("number_of_items");
var text_current_item = this.patcher.getnamed("current_item");

var text_video_file = this.patcher.getnamed("text_video_file");
var text_visuals_type = this.patcher.getnamed("text_visuals_type");


function DisplayInformation(args){
    text_scene_id.setwithtruncation(arguments[0], 150);
    text_unity_scene_id.setwithtruncation(arguments[1], 150);
    text_scene_index.set(arguments[2]);
}

function DisplayDimensions(dimensions)
{
    text_dimensions.set(dimensions);
}

function ToggleDimensionsLabel(toggle){
    if (toggle === 1){
        label_dimensions.textcolor(0.584, 0.584, 0.584, 1.000)
    }
    if (toggle === 0){
        label_dimensions.textcolor(0.161, 0.157, 0.157, 1.000)
    }
}

function DisplayNumberOfItems(numberOfItems){
    text_number_of_items.set(numberOfItems);
}

function ItemIndex(currentItem){
    text_current_item.set(currentItem);
}

function DisplayVisualInformation(args){
    text_visuals_type.setwithtruncation(arguments[0], 330);
    text_video_file.setwithtruncation(arguments[1], 330);
}