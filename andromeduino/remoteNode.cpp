#include "remoteNode.h"

#include "Arduino.h"
#include "stdio.h"

#define RUN '1'
#define STOP '0'


remoteNode::remoteNode(int valvePin){
    _valvePin = valvePin;
    _init();
    
}

remoteNode::_init(){
    pinMode(_valvePin, OUTPUT);
    pinMode(LED_BUILTIN, OUTPUT);
    Serial.begin(9600);

    _delay = 500; // default delay value
    String delayString = "";

    if (Serial.available() > 0){
        do{
            _delayChar = Serial.read();
            delayString.append(_delayChar);
        } while (_delayChar != 'X');
        _delay = std::stoi(delayString);
    }
    Serial.write("Delay Set");
}

remoteNode::run(){
    if(Serial.available() > 0){
        char t = Serial.read();
        if (t == RUN){
            digitalWrite(_valvePin, HIGH);
            delay(_delay);
        } else {
            digitalWrite(_valvePin, LOW);
        }
    } else {
        digitalWrite(_valvePin, LOW);
    }
}

