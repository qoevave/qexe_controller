

function visuals(args)
{
    switch (arguments[0])
    {
        // Display the dimensions x,y,z and color the label active.
        case "360Video":
            this.patcher.message("script", "sendbox", "videoFile", "textcolor", 0.584, 0.584, 0.584, 1.000);
            this.patcher.message("script", "sendbox", "visualsType", "set", arguments[0]);
            break;
        // Colour the label inactive.
        case "Simulated":
            this.patcher.message("script", "sendbox", "videoFile", "textcolor", 0.161, 0.157, 0.157, 1.000);
            this.patcher.message("script", "sendbox", "visualsType", "set", arguments[0]);
            break;
        default:
            post("Visuals type not recognized...");
            break;
    }
}



function elipse(s, len)
{
    var tmp
    if (s.length > len)
    {
        tmp = s.slice(0,len);
        tmp = tmp.concat("...");
        return(tmp);
    }else
    {
        return(s);
    }
}
