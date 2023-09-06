declare var bootstrap: any;

import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
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
              private router: Router,
              private renderer: Renderer2, //to manipulate DOM elements
              private el: ElementRef) {
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

  ngAfterViewInit() {
    const prevButton = this.el.nativeElement.querySelector('#prevButton');
    const nextButton = this.el.nativeElement.querySelector('#nextButton');
    const mediaScroller = this.el.nativeElement.querySelector('.media-scroller');

    prevButton.addEventListener('click', () => {
      mediaScroller.scrollBy({ left: -200, behavior: 'smooth' }); // Adjust the scrolling amount (-200) as needed
    });

    nextButton.addEventListener('click', () => {
      mediaScroller.scrollBy({ left: 200, behavior: 'smooth' }); // Adjust the scrolling amount (200) as needed
    });
  }

}

