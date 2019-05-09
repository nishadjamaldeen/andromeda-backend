#include "valveCommand.h"

#include "Arduino.h"
#include "stdio.h"

valveCommand::valveCommand(){
    init();
}

valveCommand::init(){
    pinMode(LED_BUILTIN, OUTPUT);
    Serial.begin(9600);
    _actuateCommand = "1";
}

void valveCommand::setDelay(int delayMillis){
    _delay = delayMillis;
}

int valveCommand::getResponse(){

    if(Serial.available() > 0){
        _in = Serial.read();
        if(_in == '1'){
            printf("Success");
        } else{
            printf("Operation failed with code %d", _in);
        }
    } 
}

void valveCommand::actuate(){
    Serial.println(_actuateCommand);
}
