function GetMeshIDs(){
    outlet(0, "xml", "getElementsByTagName 0 Mesh");
}

function ReportElementIndex(){
    var dict = JSON.stringify(arguments[0])
    post(dict, '\n');
}