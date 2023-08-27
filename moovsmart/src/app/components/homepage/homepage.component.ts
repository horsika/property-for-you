import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {SearchService} from "../../services/search.service";
import {Router} from "@angular/router";
import {PropertyListItemModel} from "../../models/propertyListItem.model";
// import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  properties: Array<PropertyListItemModel> = [];

  constructor(private propertyService: PropertyService,
              private searchService: SearchService,
              private router: Router) {
  }

  ngOnInit() {
    this.propertyService.getPropertyList().subscribe(
      propertyListItems => {
        this.properties = propertyListItems
          .map(property => ({
            ...property,
            activatedAt: new Date(property.activatedAt),
            formattedActivatedAt: new Date(property.activatedAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          }));
      }
    );
  }

  // ngAfterViewInit() {
  //   const carousel = new bootstrap.Carousel(document.getElementById('carouselExample'));
  // }

}
