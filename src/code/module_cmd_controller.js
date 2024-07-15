/**
 * @author  Robotham., T.M
 * @version 2.0
 */

autowatch = 1;
inlets = 2;
outlets = 2;


function cmd (){
    switch (arguments[0]){
        case "-item":
            if (arguments[1] === "next"){
                post("cmd call: -setitem", arguments[1], '\n');
                outlet(1, 'TestManager', 'selectItem', 'set');
            }
            if (typeof(arguments[1]) === "number"){
                post("cmd call: -setitem scene selected", arguments[1], '\n');
                outlet(1, 'TestManager', 'selectItem', arguments[1]);
            }
            break;
    }
}