import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {PropertyService} from "../../services/property.service";
import {PropertyListItemModel} from "../../models/propertyListItem.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map: any;
  private isMapInitialized = false;

  constructor(private propertyService: PropertyService,
              private router: Router) {
  }

  ngAfterViewInit() {
    this.initMap();
    this.propertyService.commonFilteredProperties$.subscribe((properties => {
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

    if (!this.map) {
      return;
    }

    const propertyMarkers: L.Marker[] = [];

    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer)
      }
    })

    for (const property of properties) {
      const lat = parseFloat(String(property.latitude));
      const lon = parseFloat(String(property.longitude));

      // Create a custom popup content with an image
      const popupContent = `
     <div>
      <img src="${property.images[0]}" alt="${property.name}" style="max-width: 80%; max-height: 45%;">
      <p>${this.formatPrice(property.price)} Million</p>
      <p>${property.floorArea} sqm</p>
      <p>${property.name}</p>
    </div>
  `;


      // Create a custom icon
      const customIcon = L.divIcon({
        className: 'custom-icon',
        html: '<i class="fas fa-building" style="color: #e96149; font-size: 30px;"></i>',
        iconAnchor: [12, 41], // Adjust anchor point if necessary
      });

      const propertyMarker = L.marker([lat, lon], {
        icon: customIcon,
      });

      propertyMarker.bindPopup(popupContent);

      propertyMarker.on('mouseover', () => {
        propertyMarker.openPopup();
      });

      propertyMarker.addTo(this.map);
      propertyMarkers.push(propertyMarker);
    }

    //calculate the bounds based on markers
    if (propertyMarkers.length > 0) {
      const markerBounds = L.featureGroup(propertyMarkers).getBounds();
      this.map.fitBounds(markerBounds);
    }
  }

  formatPrice(price: number): string {
    // Perform formatting logic here
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0
    });
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
