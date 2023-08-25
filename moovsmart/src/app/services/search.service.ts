import {EventEmitter, Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchForm: FormGroup;
  citiesHu: any [] = [];
  listItemClicked: EventEmitter<string> = new EventEmitter<string>();
  selectedCity: string = '';


  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private route: ActivatedRoute) {
    this.searchForm = this.formBuilder.group({
      query: ['']
    });

    this.fetchCities();
  }

  fetchCities(): void {
    this.http.get<any>('assets/data/cities.hu.json').subscribe(data => {
      this.citiesHu = data;
    })
  }

  filterCities(query: string): string[] {
    query = query.toLowerCase();
    let filteredCitiesHu = this.citiesHu
      .filter(city => city.city.toLowerCase().startsWith(query))
      .map(city => city.city);
    return filteredCitiesHu;
  }

  setSelectedCity(city: string) {
    this.selectedCity = city;
  }

  getSelectedCity(): string {
    return this.selectedCity;
  }
}


