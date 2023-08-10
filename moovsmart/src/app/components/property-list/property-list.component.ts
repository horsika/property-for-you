import {Component, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {Router} from "@angular/router";
import {PropertyListItemModel} from "../../models/propertyListItem.model";

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: Array<PropertyListItemModel> = [];

  constructor(private propertyService: PropertyService,
              private router: Router) {
  }

  ngOnInit() {
    this.propertyService.getPropertyList().subscribe(
      propertyListItems => this.properties = propertyListItems
    );
  }

  details(id: number) {
    this.router.navigate(['property-details', id]);
  }

  selectedSortingOption = 'Newest';

  sortByActivatedAtDescending(event: Event, properties: PropertyListItemModel[]): void {
    event.stopPropagation();
    this.properties = properties.slice().sort((a, b) => b.activatedAt.getDate() - a.activatedAt.getDate());
    this.selectedSortingOption = 'Newest';
  }

  sortByFloorAreaDescending(event:Event, properties: PropertyListItemModel[]): void {
    event.stopPropagation();
    this.properties = properties.slice().sort((a, b) => b.floorArea - a.floorArea);
    this.selectedSortingOption = 'SquareFeet (High to Low)';
  }

  sortByFloorAreaAscending(event: Event, properties: PropertyListItemModel[]): void {
    event.stopPropagation();
    this.properties = properties.slice().sort((a, b) => a.floorArea - b.floorArea);
    this.selectedSortingOption = 'SquareFeet (Low to High)';
  }

  sortByPriceDescending(event: Event, properties: PropertyListItemModel[]): void {
    event.stopPropagation();
    this.properties = properties.slice().sort((a, b) => b.price - a.price);
    this.selectedSortingOption = 'Price (High to Low)';
  }

  sortByPriceAscending(event: Event, properties: PropertyListItemModel[]): void {
    event.stopPropagation();
    this.properties = properties.slice().sort((a, b) => a.price - b.price);
    this.selectedSortingOption = 'Price (Low to High)';
  }


}
