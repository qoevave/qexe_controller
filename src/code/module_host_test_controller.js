autowatch = 1;
compile = 1;
outlets = 2;

// var btn_play = this.patcher.getnamed("btn_play");
// var btn_next = this.patcher.getnamed("btn_next");


function HostSimulatorControl(msg){
    switch(msg){
        case "Play":
            post("Host test controller: Play", '\n');
            // deactivate play button when play btn pressed. 
            // btn_play.message("bgcolor", 0.471, 0.537, 0.569, 1.000);
            // btn_play.message("active", 0);
            // // activate next btn. 
            // btn_next.message("bgcolor", 0.251, 0.302, 0.325, 1.000);
            // btn_next.message("active", 1);

            outlet(1, "script send btn_play bgcolor 0.471 0.537 0.569 1.000");
            outlet(1, "script send btn_play active 0");
            outlet(1, "script send btn_next bgcolor 0.251 0.302 0.325 1.000");
            outlet(1, "script send btn_next active 1");

            outlet(0, "HostTestController", "Play");
            break;

        case "Next":
            post("Host test controller: Next", '\n');
            // activate play button when next btn pressed. 
            // btn_play.message("bgcolor", 0.251, 0.302, 0.325, 1.000);
            // btn_play.message("active", 1)
            // // deactivate next btn. 
            // btn_next.message("bgcolor", 0.471, 0.537, 0.569, 1.000);
            // btn_next.message("active", 0);

            outlet(1, "script send btn_play bgcolor .251 0.302 0.325 1.000");
            outlet(1, "script send btn_play active 1");
            outlet(1, "script send btn_next bgcolor 0.471 0.537 0.569 1.000");
            outlet(1, "script send btn_next active 0");

            outlet(0, "HostTestController", "Next");
            break;

        default:
            post("Simulator message not a message", '\n');
            break;
    }
}
