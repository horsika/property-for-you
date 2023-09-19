import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NominatimResponseModel} from "../../models/nominatimResponse.model";
import * as L from 'leaflet';
import {icon, latLng, LeafletMouseEvent, Map, MapOptions, Marker, tileLayer} from 'leaflet';
import {MapPointModel} from "../../models/map-point.model";
import {NominatimService} from "../../services/nominatim.service";
import {AddressModel} from "../../models/address.model";

@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.component.html',
  styleUrls: ['./address-map.component.css']
})
export class AddressMapComponent implements OnInit {
  map: Map;
  mapPoint: MapPointModel;
  options: MapOptions;
  lastLayer: Marker;

  results: NominatimResponseModel[];

  @Output() mapPointUpdated = new EventEmitter<MapPointModel>();

  constructor(private nominatimService: NominatimService) {

  }

  ngOnInit() {
    this.initializeDefaultMapPoint();
    this.initializeMapOptions();
  }

  initializeMap(map: Map) {
    this.map = map;
    this.createMarker();
  }

  getAddress(result: NominatimResponseModel) {
    this.updateMapPoint(result.latitude, result.longitude);
    this.createMarker();
  }

  refreshSearchList(results: NominatimResponseModel[]) {
    this.results = results;
  }

  private initializeMapOptions() {
    this.options = {
      zoom: 10,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'OSM'})
      ],
      center: latLng([47.49791200, 19.04023500])
    }
  }

  private initializeDefaultMapPoint() {
    this.mapPoint = {
      address: new AddressModel(0, '', '', ''),
      latitude: 47.49791200,
      longitude: 19.04023500
    };
  }

  onMapClick(e: LeafletMouseEvent) {
    this.clearMap();
    this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    this.createMarker();
  }

  private updateMapPoint(latitude: number, longitude: number) {
    this.mapPoint.latitude = latitude;
    this.mapPoint.longitude = longitude;

    this.nominatimService.coordLookup(latitude, longitude).subscribe({
      next: address => {
        this.mapPoint.address = new AddressModel(
          address.postcode,
          address.city,
          address.road,
          address.house_number)
      },
      error: err => console.warn(err),
      complete: () => {
        this.mapPointUpdated.emit(this.mapPoint);
      }
    });
  }

  private createMarker() {
    this.clearMap();
    const mapIcon = this.getDefaultIcon();
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = new L.Marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, this.map.getZoom());
  }

  private getDefaultIcon() {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: '/assets/leaflet/marker-icon.png'
    });
  }

  private clearMap() {
    if (this.lastLayer != undefined && this.map.hasLayer(this.lastLayer)) {
      this.map.removeLayer(this.lastLayer);
    }
  }

}
