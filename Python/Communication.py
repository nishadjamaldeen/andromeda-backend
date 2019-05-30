import serial
import serial.tools.list_ports
from serial.serialutil import SerialException
import time
import datetime
import sys
import numpy as np


from Definitions import *

# ============================================= Functions =============================================


## ======================================================================
# The function writes to the port the passed in message and reads the response
# from the port on the serial monitor.
## ======================================================================
def portWriteAndRead(message, openedPort):
    openedPort.reset_input_buffer()
    openedPort.write((message).encode())
    openedPort.flush()

    return parseResponse(openedPort.readline())


## ======================================================================
# From a given serial repsone, function returns if it is a valid command
# the response type, and the arguments for each sensor. The response type
# is given by the first letter of the serial repsonse, the arguments
# are the proceeding words after each comma.
# Returns:  isValid:    Whether the given serialResponse is a valid input
#           respType:   A single letter representing the response from the
#                       arduino to the computer
#           respData:   An array storing the response for each sensor
#                       in each entry of the array.
## ======================================================================
def parseResponse(serialResponse):
    serialResponse = serialResponse.decode()
    isValid= False
    respType = None
    respData = None

    if (serialResponse != None) and (len(serialResponse)) > 0:

        strResponse = str(serialResponse)
        if (strResponse[0] in responses) and (';' in strResponse):
            isValid = True

            # creating an array with each entry holding one sensor data value
            response = strResponse.replace(';\r\n','').split(',')
            respType = responses[response[0]]
            respData = response[1:]
            if len(respData) == 1:
                respData = respData[0]

        else:
            pass

    else:
        pass

    return isValid, respType, respData


## ======================================================================
# The function finds a list of devices with the name of the usbmodel in
# its name.
# Returns:  ports:  A list of available usbmodem ports
## ======================================================================
def findSerialDevices():

    # find COM port for arduino
    ports = list(serial.tools.list_ports.comports())

    if ((len(ports) > 0) and (ports != None)):
        print("Found the following arduinos:")

        for port in ports:
            print(port[0])

        print("Connecting...")

    else:
        print("Arduino not found")
        print("Check Arduino connection and whether drivers are installed")

    return ports


## ======================================================================
# The function checks the different serial ports to see which one is
# connected by sending in a ping command and getting a response
# Returns:  returnport: Returns the single port that is connected
## ======================================================================
def sensorHandshake(serialPorts):

    foundSuitableDevice = False
    returnPort = None

    for port in serialPorts:

        try:
            openedPort = serial.Serial(port[0], baudrate=57600, timeout = 0.1)
            if DEBUG: print("attempting to open serial port")
            time.sleep(3)
        except:
            if DEBUG: print("gone to exception")
            continue

        # writes PING to the port, looking for PONG response
        isValid, respType, respData = portWriteAndRead(commands["PCPING"]+";", openedPort)
        openedPort.close()

        if DEBUG:
            print(openedPort)
            print(isValid)
            print(respType)
            print(respData)

        if (respData == "PONG"):
            foundSuitableDevice = True
            print("Connected at: " + port[0])
            returnPort = port
            time.sleep(1)
            break

    return returnPort

## ======================================================================
# The function constructs a command string to send to the arduino from the
# args parameter. 
# Returns:  portResponse:   Returns the response given by the Arduino
## ======================================================================
def transeiveCmd(port, commandType, *args):

    cmdString = ""
    for arg in args:
        cmdString += ","
        cmdString += arg

    return portWriteAndRead(commands[commandType] + cmdString + ";", port)


# ============================================= Main =============================================


if __name__ == '__main__':

    if(DEBUG):
        print("Start")

    # find available devices, confirm that there is at least one
    availableDevices = findSerialDevices()
    if ( len(availableDevices) == 0 ):
        print("System exiting..")
        sys.exit()

    # find the sensor port is compatible, confirm that there is at least one
    sensorPort = sensorHandshake(availableDevices)
    if ( sensorPort is None ):
        print("None of the arduinos have a suitable protocol")
        print("Check firmware version")
        print("exiting...")
        sys.exit();

    # open the port for communication, wait 2 seconds for Arduino to initialize
    openedSensePort = serial.Serial(sensorPort[0], baudrate=57600, timeout = 0.1)
    time.sleep(2)

    # =============== Begin Worker Thread for Sensor Data ===============


    # close the sensor port to ensure no crossover between threads
    openedSensePort.close()
    closedSensePort = sensorPort[0]

    worker = Process(target=readSensor, \
        args=(dataQueue, timeQueue, fileQueue, closedSensePort, nSensors, ))
    worker.daemon = True
    worker.start()