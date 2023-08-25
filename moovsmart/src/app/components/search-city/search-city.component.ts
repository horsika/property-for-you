import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit {

  searchForm: FormGroup;
  searchResults: string[] = [];
  selectedCity: string = '';

  constructor(private formBuilder: FormBuilder,
              public searchService: SearchService) {
    this.searchForm = this.formBuilder.group({
      query: ['']
    })
  }

  ngOnInit(): void {
    this.searchForm.get('query').valueChanges.subscribe(query => {
      this.searchResults = this.searchService.filterCities(query);
      console.log('Search result: ', this.searchResults);
    })

  }
  setSelectedCity(city: string) {
    this.selectedCity = city;
  }

  getSelectedCity(): string {
    return this.selectedCity;
  }
  onListItemClick(result: string) {
    this.searchService.listItemClicked.emit(result);
    this.setSelectedCity(result);
    this.searchResults = [];
  }

}
