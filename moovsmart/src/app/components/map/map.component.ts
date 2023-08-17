import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {


  ngAfterViewInit() {
    const apiKey = '';
    const map = L.map('map', {
      center: [47.5, 19.04], // Budapest coordinates
      zoom: 10,
      zoomControl: false, // Disable the default zoom control
    });

    L.tileLayer(
      'https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=yEsZDIbsQkQ7kmkNDrne', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      }).addTo(map);


    const budapestMarker = L.marker([47.4979, 19.0402], {
      icon: L.icon({
        iconUrl: 'assets/leaflet/marker-icon.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png',
        iconSize: [25, 41], // size of the icon
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        shadowSize: [41, 41], // size of the shadow
        shadowAnchor: [12, 41], // the same for the shadow
      })
    }).addTo(map);
    budapestMarker.bindPopup('Budapest').openPopup();

    L.control.zoom({
      position: 'topright', // You can adjust the position
    }).addTo(map);

    // const geocodingControl = L.Control.geocoder({
    //   defaultMarkGeocode: false,
    //   collapsed: false,
    //   placeholder: 'Enter city name...',
    //   geocoder: new L.Control.Geocoder.MapTiler(apiKey)
    // }).addTo(map);
    //
    // geocodingControl.on('markgeocode', (event) => {
    //   const { center } = event.geocode;
    //   map.setView(center, 13);
    //   L.marker(center).addTo(map);
    // });
  }
}
