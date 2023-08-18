import {AfterViewInit, Component} from '@angular/core';
import * as L from "leaflet";

@Component({
    selector: 'app-details-map',
    templateUrl: './details-map.component.html',
    styleUrls: ['./details-map.component.css']
})
export class DetailsMapComponent implements AfterViewInit {

    constructor() {
    }

    ngAfterViewInit(): void {
        this.initMap();
    }

    private map: any = null;


    private initMap(): void {
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

        const budapestMarker = L.marker([47.4979, 19.0402], {
            icon: L.icon({
                iconUrl: 'assets/leaflet/marker-icon.png',
                shadowUrl: 'assets/leaflet/marker-shadow.png',
                iconSize: [25, 41], // size of the icon
                iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
                shadowSize: [41, 41], // size of the shadow
                shadowAnchor: [12, 41], // the same for the shadow
            })
        }).addTo(this.map);
        budapestMarker.bindPopup('Budapest').openPopup();

        L.control.zoom({
            position: 'topright', // You can adjust the position
        }).addTo(this.map);
    }

}
