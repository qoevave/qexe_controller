autowatch = 1;

var text_method;
var text_modality;
var text_testitems;
var text_questionnaire;
var test_integration;
var text_portin;
var text_portout;
var text_ip;

function loadbang(){
    text_method = this.patcher.getnamed("text_method");
    text_modality = this.patcher.getnamed("text_modality");
    text_questionnaire = this.patcher.getnamed("text_questionnaire");
    test_integration = this.patcher.getnamed("test_integration");
    text_portin = this.patcher.getnamed("text_portin");
    text_portout = this.patcher.getnamed("text_portout");
    text_ip = this.patcher.getnamed("text_ip");
}

function DisplayInformation(vars){
    text_method.setwithtruncation(arguments[0], 150);
    text_modality.setwithtruncation(arguments[1], 150);
    text_questionnaire.setwithtruncation(arguments[2], 150);
    test_integration.setwithtruncation(arguments[3], 150);
    text_portin.set(arguments[4]);
    text_portout.set(arguments[5]);
    text_ip.setwithtruncation(arguments[6], 150);
    post("port:", arguments[4], "portout:", arguments[5], '\n')
}