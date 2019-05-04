import React from 'react';
// import logo from './logo.svg';
import L from 'leaflet';
// import './App.css';

class App extends React.Component {
  componentDidMount() {
    // create map
    this.map = L.map('map', {
      center: [50, 12],
      zoom: 8,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
  }

  render() {
    return <div id="map"></div>
  }
}

export default App;

