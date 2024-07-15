/**
 * @fileOverview Controls functions for audio playback of buffers~ using MaxGen. <br>
 * The module is instantiated with one argument which corresponds to the associated genbuffer~
 * object. E.g., <buffercontrol 2> will identify all trigger events corresponding to buffer 2. <br>
 *
 * `outlet[0]` = play(1)/stop(0) <br>
 * `outlet[1]` = retrigger(1) from beginning <br>
 * @author  Robotham., T.M
 * @version 1.0
 * @module  buffercontrol~.js
 */

autowatch = 1;
outlets = 2;

/**
 * Should this buffer react to incoming trigger events.
 * @type {boolean}
 */
var isTrigger = false;


/**
 * Controls buffer playback responding to audio events.
 * @param  {message} status "triggerPlay" = start playback, "triggerStop" = stop playback and
 * reset buffer, and "triggerPause" = stop playback at current sample.
 */
function event(status)
{
    switch(status)
    {
        case "triggerPlay":
            post("triggering audio file playback", "\n");
            outlet(0, 1);
            outlet(1, 1);
            break;
        case "triggerStop":
            outlet(0, 0);
            outlet(1, 1);
            post("triggering audio file stop", "\n");
            stop();
            break;
        case "triggerPause":
            post("triggering audio playback pause", "\n");
            break;
    }
}


/**
 * Play the audio file corresponding to this buffercontrol, if isTrigger == false.
 */
function play()
{
    if(isTrigger==false)
    {
        outlet(0, 1);
        outlet(1, 1);
    }
}


/**
 * Stop audio file playback, independent of 'isTrigger' status.
 */
function stop()
{
    outlet(0, 0);
    outlet(1, 1);
}


/**
 * Receives the loop setting for this buffer. If the audio file in the JSON test settings has
 * autostart = 1, then 'isTigger' will be set to false, and the audio file will continuously loop.
 * @param  {number} active Loop status. 1 = will loop, 0 = no loop && isTrigger is set to 'true'.
 */
function loop(active)
{
    switch(active)
    {
        case 0:
            isTrigger = true;
            break;
        case 1:
            isTrigger = false;
            break;
        default:
            post("loop type undefined", "\n");
            break;
    }
}




