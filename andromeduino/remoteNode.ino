#include "remoteNode.h"

#define valvePin 6
remoteNode remotenode(valvePin);

void setup(){
    
}

void loop(){
    remotenode.run();
}