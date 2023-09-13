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
    console.log(address);
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
    this.onSearch.emit(this.searchResults);
  }


  protected readonly event = event;
}
