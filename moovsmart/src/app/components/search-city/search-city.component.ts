import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchService} from "../../services/search.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit {

  searchForm: FormGroup;
  searchResults: string[] = [];
  isFirstSearch: boolean = true;

  constructor(private formBuilder: FormBuilder,
              public searchService: SearchService,
              private router: Router,
              private route: ActivatedRoute,) {
    this.searchForm = this.formBuilder.group({
      query: ['']
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const initialCity = params['city'];
      if (initialCity) {
        this.searchForm.get('query').setValue(initialCity);
        this.searchService.setSelectedCity(initialCity);
      }
    })

    this.searchForm.get('query').valueChanges.subscribe(query => {
      this.searchResults = this.searchService.filterCities(query);
    })

  }

  onListItemClick(result: string) {
    this.searchService.setSelectedCity(result);
    // this.searchResults = [];
    if (this.isFirstSearch) {

      this.router.navigate(['/property-list'], {queryParams: {city: result}})
      this.isFirstSearch = false;
    }

    setTimeout(() => {
      this.searchResults = [];
    }, 100);


  }


}
