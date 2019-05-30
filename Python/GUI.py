# from Definitions import *
# from Communication import *

# import sys
# import numpy as np 
# import folium
# from PySide2.QtWidgets import (QApplication, QLabel, QPushButton,
#                                QVBoxLayout, QWidget, QtWebEngineWidgets)
# from PySide2.QtCore import Slot, Qt

# class MyWidget(QWidget):
#     def __init__(self):
#         QWidget.__init__(self)

#         self.webView = QtWebEngineWidgets.QWebEngineView(MainWindow)
#         self.webView.setGeometry(10,10,400,200)
#         self.url = QtCore.QUrl.fromLocalFile(r"path-to-map\map.html")
#         self.webView.load(self.url)

#         self.button = QPushButton("Click me!")
#         self.text = QLabel("Hello World")
#         self.text.setAlignment(Qt.AlignCenter)

#         self.layout = QVBoxLayout()
#         self.layout.addWidget(self.webView)
#         self.layout.addWidget(self.button)
#         self.setLayout(self.layout)

# if __name__ == "__main__":
#     map_view = folium.Map(location=[51.5074, 0.1278], control_scale=True, zoom_start = 11) # Uses lat then lon. The bigger the zoom number, the closer in you get
#     map_view.save("map.html")

#     app = QApplication(sys.argv)

#     widget = MyWidget()
#     widget.resize(800, 600)
#     widget.show()

#     sys.exit(app.exec_())

# import wx
# import folium
# import wx.html as html

# class MainFrame(wx.Frame):
#     def __init__(self, parent, title):
#         wx.Frame.__init__(self, parent, -1, title)
#         panel = MainPanel(self)

# class MainPanel(wx.Panel):
#     def __init__(self, frame):
#         wx.Panel.__init__(self, frame)

#         txt_style = wx.VSCROLL|wx.HSCROLL|wx.TE_READONLY|wx.BORDER_SIMPLE
#         self.html = html.HtmlWindow(self, -1, size=(300, 150), style=txt_style)
#         folium_map = folium.Map([48., 5.], tiles='stamentoner', zoom_start=6)
#         folium_map.save("map.html")
#         html.LoadPage("C:\\Users\\Jessica\\andromeda\\Python\\map.html")

# app = wx.App()
# frm = MainFrame(None, "Screen layout")
# frm.Show()
# app.MainLoop()


import sys
import subprocess
import os
import folium
from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from PyQt5.QtWebEngineWidgets import QWebEngineView as QWebView,QWebEnginePage as QWebPage
from PyQt5.QtWebEngineWidgets import QWebEngineSettings as QWebSettings
from PyQt5.QtWidgets import QApplication, QWidget, QMainWindow

class WebPage(QWebPage):

    def javaScriptConsoleMessage(self, level, msg, linenumber, source_id):
        try:
            # print('%s:%s: %s' % (source_id, linenumber, msg))
            self.message = msg
            print('%s' % msg)
            sys.stdout.flush()
        except OSError:
            pass

    @pyqtSlot(str)
    def print(self, text):
        print('From JS:', text)

    def getMessage(self):
        return self.message

class checkBox():

    def __init__(self, label, region, color='white'):
        self.region = region
        self.label = label

        self.chkbox = QCheckBox(self.label)
        self.chkbox.setStyleSheet("color: white")
        self.chkbox.stateChanged.connect(self.state_changed)

    def state_changed(self):
        print(self.label)
        sys.stdout.flush()

    def getObject(self):
        return self.chkbox

class GUI():

    def __init__(self, page):

        self.window = QWidget()
        self.layout = QGridLayout()
        self.page = page

        self.window.setAutoFillBackground(True)
        p = self.window.palette()
        p.setColor(self.window.backgroundRole(), QColor(56, 68, 90))
        self.window.setPalette(p)

        # app.setStyleSheet('QMainWindow{background-color: darkgray;border: 1px solid black;}')

        # # Create map in GUI
        # self.web = QWebView()
        # self.web.load(QtCore.QUrl.fromLocalFile(os.path.abspath('map.html')))
        # # web.show()

        # Create checkbox
        # self.cb1 = QCheckBox('Set Tree')
        # self.cb1.toggle()
        # self.cb1.stateChanged.connect(self.updateState)

        # make checkbox class with label, regional code, etc. 

        chkbox_list = []

        self.layout.addWidget (QPushButton('Set All Trees'), 0, 0, 1, 2)
        self.layout.addWidget (QPushButton('Set Region 1 Trees'), 1, 0, 1, 1)
        self.layout.addWidget (QPushButton('Set Region 2 Trees'), 1, 1, 1, 1)
        for i in range(0,5):
            box = checkBox("Set Tree", 1)
            chkbox_list.append(box)
            self.layout.addWidget (box.getObject(), 2+i, 0, 1, 1)
        for i in range(0,5):
            box = checkBox("Set Tree", 2)
            chkbox_list.append(box)
            self.layout.addWidget (box.getObject(), 2+i, 1, 1, 1)
        
        # self.layout.addWidget(self.cb1)
        self.createMap()

        label = QLabel()
        pixmap = QPixmap('logo.png')
        label.setPixmap(pixmap.scaled(300, 200, QtCore.Qt.KeepAspectRatio))

        self.layout.addWidget(label, 7, 0, 1, 2)

        self.window.setLayout(self.layout)
        self.window.show()

    def state_changed(self):
        print("Pressed", self.getLabel())
        sys.stdout.flush()

    def createMap(self):
        self.web = QWebView()
        self.web.setPage(self.page)
        self.web.setHtml('''
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
            <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
            <style>
                body { padding: 0; margin: 0; }
                html, body, #map { height: 100%; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                var map = L.map('map').setView([35.49749,-119.1561], 18);
                L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                          maxZoom: 22,
                          subdomains:['mt0','mt1','mt2','mt3']
                      }).addTo(map);

                var greenIcon = L.icon({
                iconUrl: "file:///C:/Users/Jessica/andromeda/Python/public/cropg.png",
                iconSize:     [24, 24], // size of the icon
                iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -12] // point from which the popup should open relative to the iconAnchor
                });

                function markerOnClick(e) {
                    var latlng = map.mouseEventToLatLng(e.originalEvent);
                    console.log(latlng.lat + ', ' + latlng.lng);
                }

                L.marker([35.49749,-119.1561]).on('click', markerOnClick).addTo(map);
                L.marker([35.4976,-119.1561]).on('click', markerOnClick).addTo(map);
                L.marker([35.49754,-119.1561]).on('click', markerOnClick).addTo(map);

            </script>
        </body>
        </html>

        ''')

        # Add QWebView to the layout
        self.layout.addWidget(self.web, 0, 2, 8, 1)

def onNewData(data):
    print("asynchronous", data)


app = QApplication(sys.argv)
app.setStyle('Fusion')
page = WebPage()
gui = GUI(page)
app.exec_()

print(page.getMessage())


        #         <!DOCTYPE html>
        # <html>
        # <head>
        #     <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
        #     <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
        #     <style>
        #         body { padding: 0; margin: 0; }
        #         html, body, #map { height: 100%; }
        #     </style>
        # </head>
        # <body>
        #     <div id="map"></div>
        #     <script>
        #         var map = L.map('map').setView([49.267,-123.25], 13);
        #         L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        #         {
        #             maxZoom: 24,
        #             attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        #                 '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        #                 'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
        #             id: 'examples.map-i86nkdio',
        #         }).addTo(map);

        #         var greenIcon = L.icon({
        #         iconUrl: "file:///C:/Users/Jessica/andromeda/Python/public/cropg.png",
        #         iconSize:     [24, 24], // size of the icon
        #         iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
        #         popupAnchor:  [0, -12] // point from which the popup should open relative to the iconAnchor
        #         });

        #         function markerOnClick(e) {
        #             var latlng = map.mouseEventToLatLng(e.originalEvent);
        #             console.log(latlng.lat + ', ' + latlng.lng);
        #         }

        #         for (i = 0; i < 5; i++) {
        #             var node = L.marker([49.26+i/1000,-123.24-i*2/1000]).on('click', markerOnClick).addTo(map);
        #         }

        #     </script>
        # </body>
        # </html>

        # ''')





