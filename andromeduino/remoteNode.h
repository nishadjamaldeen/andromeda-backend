#ifndef REMOTENODE_H
#define REMOTENODE_H

#include "Arduino.h"

class remoteNode{
    public:
    remoteNode(int valvePin);
    void run();

    private:
    void _init();
    int _valvePin;
    char _delayChar;
    char _command;
    int _delay


};

#endif