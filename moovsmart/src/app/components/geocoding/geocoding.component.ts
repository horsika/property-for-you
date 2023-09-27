import {Component, EventEmitter, Output} from '@angular/core';
import {NominatimResponseModel} from "../../models/nominatimResponse.model";
import {NominatimService} from "../../services/nominatim.service";

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.css']
})
export class GeocodingComponent {

  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults: NominatimResponseModel[];

  constructor(private nominatimService: NominatimService) {

  }

  addressLookup(address: string) {
    this.nominatimService.addressLookup(address).subscribe({
      next: results => {
      this.searchResults = results;
    },
    complete: () => this.onSearch.emit(this.searchResults)
    });

    // this.searchResults = [];


  }
}
