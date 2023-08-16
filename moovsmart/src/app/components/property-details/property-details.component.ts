import {Component, OnInit, AfterViewInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {PropertyDetailsModel} from "../../models/propertyDetails.model";
import {ActivatedRoute} from "@angular/router";
import * as L from "leaflet";

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit, AfterViewInit {

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
  };

  ngAfterViewInit(): void {
    this.initMap();
  }

  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }


  constructor(private propertyService: PropertyService,
              private route: ActivatedRoute,) {
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
      }
    });

    document.getElementById("button").click();
  }
}
