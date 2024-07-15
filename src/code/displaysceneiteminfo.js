/**
 * @fileOverview Functions for controlling GUI display for generic scene information of
 * currently selected scene displayed in sceneinfogeneric.maxpat
 *
 * `inlet[0]` = Receives all function calls. <br>
 *
 * @author  Robotham., T.M
 * @version 1.0
 * @module  sceneinfogeneric.js
 */


/**
 * Controls the display of the dimensions.
 * @param  {list} args List of dimensions in x, y, z order defined in JSON file for 6-DoF scenes.
 * @this {parentPatcher}
 */
function dimensions(args)
{
    var dimensionsLen = arguments.length
    switch (dimensionsLen)
    {
        // Display the dimensions x,y,z and color the label active.
        case 3:
            post("Setting scene dimensions", "\n");
            this.patcher.message("script", "sendbox", "dimensionsLabel", "textcolor", 0.584, 0.584, 0.584, 1.000);
            var x = arguments[0];
            var y = arguments[1];
            var z = arguments[2];
            var dimensionsText = [x, y, z].join(', ');
            this.patcher.message("script", "sendbox", "dimensions", "set", dimensionsText);
            break;
        // Colour the label inactive.
        case 2:
            this.patcher.message("script", "sendbox", "dimensionsLabel", "textcolor", 0.161, 0.157, 0.157, 1.000);
            this.patcher.message("script", "sendbox", "dimensions", "set", " ");
            break;
        // Colour the label inactive.
        case 1:
            this.patcher.message("script", "sendbox", "dimensionsLabel", "textcolor", 0.161, 0.157, 0.157, 1.000);
            this.patcher.message("script", "sendbox", "dimensions", "set", " ");
            break;
        // Colour the label inactive.
        case 0:
            this.patcher.message("script", "sendbox", "dimensionsLabel", "textcolor", 0.161, 0.157, 0.157, 1.000);
            this.patcher.message("script", "sendbox", "dimensions", "set", " ");
            break;
    }
}
