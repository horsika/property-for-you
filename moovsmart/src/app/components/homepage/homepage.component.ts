declare var bootstrap: any;

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {SearchService} from "../../services/search.service";
import {Router} from "@angular/router";
import {PropertyListItemModel} from "../../models/propertyListItem.model";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewInit {

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

  ngAfterViewInit(): void {
    this.initCarousel();
  }

  initCarousel(): void {
    const carouselElement = document.getElementById('carouselExample');

    // Initialize the carousel using Bootstrap's carousel API
    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000,
        pause: 'hover',
        keyboard: true
      });

      const prevButton = document.querySelector('.carousel-control-prev');
      const nextButton = document.querySelector('.carousel-control-next');

      if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
          carousel.prev();
        });

        nextButton.addEventListener('click', () => {
          carousel.next();
        });
      }
    }
  }
}

