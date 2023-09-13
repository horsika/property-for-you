import {Component, OnInit} from '@angular/core';
import {NominatimResponseModel} from "../../models/nominatimResponse.model";
import {icon, latLng, MapOptions, marker, Map, tileLayer, LeafletMouseEvent, Marker} from 'leaflet';
import {MapPointModel} from "../../models/map-point.model";
import * as L from "leaflet";

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

  constructor () {

  }

  ngOnInit () {
    this.initializeDefaultMapPoint();
    this.initializeMapOptions();
  }

  initializeMap (map: Map) {
    this.map = map;
    this.createMarker();
    console.log('init ' + this.lastLayer)
  }

  getAddress (result: NominatimResponseModel) {
    this.updateMapPoint(result.latitude, result.longitude, result.displayName);
    this.createMarker();
  }

  refreshSearchList (results: NominatimResponseModel[]) {
    this.results = results;
  }

  private initializeMapOptions () {
    this.options = {
      zoom: 12,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'OSM'})
      ],
      center: latLng([47.49791200, 19.04023500])
    }
  }

  private initializeDefaultMapPoint () {
    this.mapPoint = {
      name: 'Hello',
      latitude: 47.49791200,
      longitude: 19.04023500
    };
  }

  onMapClick(e: LeafletMouseEvent) {
    this.clearMap();
    this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    this.createMarker();
  }

  private updateMapPoint (latitude: number, longitude: number, name?: string) {
    this.mapPoint = {
      latitude: latitude,
      longitude: longitude,
      name: name ? name : this.mapPoint.name
    };
  }

  private createMarker () {
    this.clearMap();
    const mapIcon = this.getDefaultIcon();
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = new L.Marker(coordinates).setIcon(mapIcon).addTo(this.map);
    console.log('create marker ' + this.lastLayer);
    this.map.setView(coordinates, this.map.getZoom());
  }

  private getDefaultIcon () {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: '/assets/leaflet/marker-icon.png'
    });
  }

  private clearMap () {
    console.log('clear map ' + this.lastLayer);
    if (this.lastLayer != undefined && this.map.hasLayer(this.lastLayer)) {
      this.map.removeLayer(this.lastLayer);
    }
  }

}
