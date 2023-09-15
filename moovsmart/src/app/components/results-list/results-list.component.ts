import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NominatimResponseModel} from "../../models/nominatimResponse.model";

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent {
  @Input() results: NominatimResponseModel[];

  @Output()
  locationSelected = new EventEmitter();

  constructor() {

  }

  selectResult(result: NominatimResponseModel) {
    this.locationSelected.emit(result);
  }

}
