import React from 'react';
// import logo from './logo.svg';
import L from 'leaflet';
// import './App.css';

class App extends React.Component {
  componentDidMount() {
    // create map
    this.map = L.map('map', {
      // center: [37.983, -121.869],
      center: [51.505, -0.09],
      zoom: 14,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, '
        }),
      ]
    });
    var marker = L.marker([51.5, -0.09]).addTo(this.map);
  }

  render() {
    return <div id="map"></div>
  }
}

export default App;

