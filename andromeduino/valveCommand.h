#ifndef valveCommand_h
#define valveCommand_h

#include "Arduino.h"

class valveCommand {
    public:

    valveCommand(int valvePin);
    void init();
    void setDelay(int delayMillis);
    int getResponse();
    void actuate();

    private:
    int _delay;
    char _in;
    int _remoteResponse;
    int _actuateCommand;
};

#endif