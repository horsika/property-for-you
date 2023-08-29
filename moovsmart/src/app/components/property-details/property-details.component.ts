import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {PropertyDetailsModel} from "../../models/propertyDetails.model";
import {ActivatedRoute} from "@angular/router";
import * as L from "leaflet";

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  private map: any;
  propertyId: number;
  property: PropertyDetailsModel = {
    id: -1,
    name: '-',
    numberOfBedrooms: -1,
    numberOfBathrooms: -1,
    priceHistory: [],
    floorArea: -1,
    airConditioning: false,
    images: [],
    address: '-',
    description: '-',
    heatingType: '-',
    propertyType: '-',
    latitude: 0,
    longitude: 0,
  };

  constructor(private propertyService: PropertyService,
              private route: ActivatedRoute,) {
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.property.latitude, this.property.longitude], // Budapest coordinates
      zoom: 10,
      zoomControl: false, // Disable the default zoom control
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    const budapestMarker = L.marker([this.property.latitude, this.property.longitude], {
      icon: L.icon({
        iconUrl: 'assets/leaflet/marker-icon.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png',
        iconSize: [25, 41], // size of the icon
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        shadowSize: [41, 41], // size of the shadow
        shadowAnchor: [12, 41], // the same for the shadow
      })
    }).addTo(this.map);
    budapestMarker.bindPopup(this.property.name).openPopup();

    L.control.zoom({
      position: 'topright', // You can adjust the position
    }).addTo(this.map);
  }

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: value => {
        const idFromParamMap = Number(value.get('id'));
        if (idFromParamMap) {
          this.propertyId = idFromParamMap;
        }
      },
      error: err => console.warn(err),

      // complete: () =>
    })

    this.propertyService.getPropertyById(this.propertyId).subscribe({
      next: value => this.property = value,
      error: err => console.warn(err),
      complete: () => {
        console.log(this.property);
        while (this.property.address.includes('null')) {
          this.property.address = this.property.address.replace('null', '');
        }
        this.initMap();
      }
    });
  }

}
