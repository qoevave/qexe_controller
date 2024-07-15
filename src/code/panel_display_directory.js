autowatch = 1;

var WD;
var ResultsDir;
// var text_working_directory = this.patcher.getnamed("text_working_directory");
// var text_results_directory = this.patcher.getnamed("text_results_directory");
// var text_test_file = this.patcher.getnamed("text_test_file");

function DisplayWorkingDirectory(directory) {
    var text_working_directory = this.patcher.getnamed("text_working_directory");
    text_working_directory.setwithtruncation(directory, 380);
}

function DisplayTestFile(testFile){
    post("Loading test file:", testFile, '\n');
    var text_test_file = this.patcher.getnamed("text_test_file");
    text_test_file.setwithtruncation(testFile, 380);
}

function DisplayContentDirectory(directory) {
    var text_content_directory = this.patcher.getnamed("text_content_directory");
    text_content_directory.setwithtruncation(directory, 380);
}