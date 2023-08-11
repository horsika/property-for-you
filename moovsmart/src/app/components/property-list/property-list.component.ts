import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {Router} from "@angular/router";
import {PropertyListItemModel} from "../../models/propertyListItem.model";

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  originalProperties: Array<PropertyListItemModel> = [];
  properties: Array<PropertyListItemModel> = [];
  selectedSortingOption = 'Newest';
  selectedFilterOption = 'For sale';

  // For dropdown menu to collapse after option has been chosen
  @ViewChild('dropdownBtn') dropdownButton!: ElementRef;


  constructor(private propertyService: PropertyService,
              private router: Router) {
  }

  ngOnInit() {
    this.propertyService.getPropertyList().subscribe(
      propertyListItems => {
        this.originalProperties = propertyListItems.map(property => ({
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
        this.properties = this.originalProperties;
      }
    );
  }

  details(id: number) {
    this.router.navigate(['property-details', id]);
  }

  closeDropdown() {
    this.dropdownButton.nativeElement.click();
  }

  sortByActivatedAtDescending(event: Event, properties: PropertyListItemModel[]): void {
    event.stopPropagation();
    this.properties = properties.slice().sort((a, b) => b.activatedAt.getTime() - a.activatedAt.getTime());
    this.selectedSortingOption = 'Newest';
  }

  sortByFloorAreaDescending(event: Event, properties: PropertyListItemModel[]): void {
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

  sortByBedroomsDescending(event: Event, properties: PropertyListItemModel[]): void {
    event.stopPropagation();
    this.properties = properties.slice().sort((a, b) => b.numberOfBedrooms - a.numberOfBedrooms);
    this.selectedSortingOption = 'Bedrooms';
  }


  setFilterOption(filterOption: string): void {
    this.selectedFilterOption = filterOption;
  }

  applyFilter(): void {
    const filteredListingType = this.selectedFilterOption === 'For sale' ? 'SELL' : 'RENT';
    this.properties = this.filterProperties(filteredListingType);
  }

  filterProperties(listingType: string): PropertyListItemModel[] {
    return this.originalProperties.filter(property => property.listingType === listingType);
  }

  preventDropdownCollapse(event: Event): void {
    event.stopPropagation();
  }


}
