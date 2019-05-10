#include "valveCommand.h"

#define delay 1000;

valveCommand vC();

void setup(){
    vC.setDelay(delay);
}

void loop(){
    vC.run();
}