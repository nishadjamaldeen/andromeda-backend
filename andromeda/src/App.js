
import React from 'react';
import L from 'leaflet';
// import './App.css';

  var style = {
    height:'300px',
    width:'100%'
  };

class App extends React.Component {

  componentDidMount() {
    // create map
    this.map = L.map('map', {
      // center: [37.983, -121.869],
      center: [49.266539,-123.2522682],
      zoom: 16,
      layers: [
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, '
        }),
      ]
    });

    var greenIcon = L.icon({
    iconUrl: "cropg.png",
    iconSize:     [24, 24], // size of the icon
    iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -12] // point from which the popup should open relative to the iconAnchor
    });

    var blueIcon = L.icon({
    iconUrl: "cropb.png",
    iconSize:     [24, 24], // size of the icon
    iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -12] // point from which the popup should open relative to the iconAnchor
    });

    function markerOnClick(e) {
      e.target.setIcon(e.target.options.icon == greenIcon ? blueIcon : greenIcon)
      alert("**Temporary Place Holder** You want to change the state for the tree at " + e.latlng);
    }

    this.node1 = L.marker([49.266539,-123.2522682], {icon: greenIcon}).on('click', markerOnClick).addTo(this.map);
    this.node2 = L.marker([49.266000,-123.2522100], {icon: greenIcon}).on('click', markerOnClick).addTo(this.map); 
  }

  render() {
    return <div id="map" style={style}></div>
  }
}

export default App;
