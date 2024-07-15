inlets = 2;
outlets = 3;

// Incoming functions from Max. 
function Control (){
    switch (arguments[0]){ // identify message
        case 'set_results_directory':
            break;
        case 'set_next_item':
            break;
        case 'set_video_information':
            break;
        case 'set_paradigm_information':
            break;
        case 'json_loaded':
            break;
    }
}

function SimulatorCalls(){
    switch (arguments[0]){
        case 'Play':
            break;
        case 'Next':
            break;
    }
}

