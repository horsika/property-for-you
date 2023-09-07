import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {PropertyService} from "../../services/property.service";
import {PropertyListItemModel} from "../../models/propertyListItem.model";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map: any;
  private isMapInitialized = false;

  constructor(private propertyService: PropertyService) {
  }

  ngAfterViewInit() {
    this.initMap();
    this.propertyService.commonFilteredProperties$.subscribe((properties => {
      console.log('Properties changed:', properties);
      this.displayPropertiesOnMap(properties);
    }))
  }

  private initMap(): void {

    if (!this.isMapInitialized) {
      this.map = L.map('map', {
        center: [47.5, 19.04], // Budapest coordinates
        zoom: 10,
        zoomControl: false, // Disable the default zoom control
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      tiles.addTo(this.map);

      L.control.zoom({
        position: 'topright', // You can adjust the position
      }).addTo(this.map);

      this.isMapInitialized = true;
    }


  }

  displayPropertiesOnMap(properties: Array<PropertyListItemModel>): void {

    if (!this.map){
      return;
    }

    const propertyMarkers: L.Marker[] = [];

    this.map.eachLayer((layer: any) =>{
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer)
      }
    })
    for (const property of properties) {
      const lat = parseFloat(String(property.latitude));
      const lon = parseFloat(String(property.longitude));
      const propertyMarker = L.marker([lat, lon], {
        icon: L.icon({
          iconUrl: 'assets/leaflet/marker-icon.png',
          shadowUrl: 'assets/leaflet/marker-shadow.png',
          iconSize: [25, 41], // size of the icon
          iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
          shadowSize: [41, 41], // size of the shadow
          shadowAnchor: [12, 41], // the same for the shadow
        })
      });
      propertyMarker.bindPopup(property.name);
      propertyMarker.addTo(this.map);
      propertyMarkers.push(propertyMarker);
    }

    //calculate the bounds based on markers
    if (propertyMarkers.length > 0) {
      const markerBounds = L.featureGroup(propertyMarkers).getBounds();
      this.map.fitBounds(markerBounds);
    }
  }


  // const budapestMarker = L.marker([47.4979, 19.0402], {
  //   icon: L.icon({
  //     iconUrl: 'assets/leaflet/marker-icon.png',
  //     shadowUrl: 'assets/leaflet/marker-shadow.png',
  //     iconSize: [25, 41], // size of the icon
  //     iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  //     shadowSize: [41, 41], // size of the shadow
  //     shadowAnchor: [12, 41], // the same for the shadow
  //   })
  // }).addTo(this.map);
  // budapestMarker.bindPopup('Budapest').openPopup();


}
