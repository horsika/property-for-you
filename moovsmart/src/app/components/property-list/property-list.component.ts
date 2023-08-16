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
  selectedFilterOptionListingType: string = 'For sale';
  filteredProperties: PropertyListItemModel[] = [];
  deselectAllChecked: boolean = true;
  houseChecked: boolean = true;
  multiFamilyHouseChecked: boolean = true;
  apartmentChecked: boolean = true;
  condoChecked: boolean = true;
  rowHouseChecked: boolean = true;
  summerHouseChecked: boolean = true;
  anyCheckboxChecked: boolean = false;
  isFilterApplied: boolean = false;


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

  //Sorting--------------------------------------------
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

  //Filter by ListingType----------------------------------------
  setFilterOptionListingType(filterOption: string): void {
    this.selectedFilterOptionListingType = filterOption;
  }

  applyFilterListingType(): void {
    this.properties = this.filterPropertiesListingType(this.selectedFilterOptionListingType);
  }

  filterPropertiesListingType(listingTypeDisplayName: string): PropertyListItemModel[] {
    return this.originalProperties.filter(property => property.listingTypeDisplayName === listingTypeDisplayName);
  }

  preventDropdownCollapse(event: Event): void {
    if (!(event.target instanceof HTMLButtonElement && event.target.classList.contains('custom-apply-button'))) {
      event.stopPropagation();
    }
  }

  //Filter by PropertyType----------------------------------------

  toggleSelectAll() {
    if (this.deselectAllChecked) {
      this.houseChecked = false;
      this.multiFamilyHouseChecked = false;
      this.apartmentChecked = false;
      this.condoChecked = false;
      this.rowHouseChecked = false;
      this.summerHouseChecked = false;
    } else {
      this.houseChecked = true;
      this.multiFamilyHouseChecked = true;
      this.apartmentChecked = true;
      this.condoChecked = true;
      this.rowHouseChecked = true;
      this.summerHouseChecked = true;
      this.anyCheckboxChecked = false;
    }
    this.deselectAllChecked = !this.deselectAllChecked;
    this.applyFilterPropertyType();
  }

  togglePropertyType(propertyType: string): void {
    if (propertyType === 'House') {
      this.houseChecked = !this.houseChecked;
    }
    if (propertyType === 'Multi-family house') {
      this.multiFamilyHouseChecked = !this.multiFamilyHouseChecked;
    }
    if (propertyType === 'Apartment') {
      this.apartmentChecked = !this.apartmentChecked;
    }
    if (propertyType === 'Condo') {
      this.condoChecked = !this.condoChecked;
    }
    if (propertyType === 'Row house') {
      this.rowHouseChecked = !this.rowHouseChecked;
    }
    if (propertyType === 'Summer house') {
      this.summerHouseChecked = !this.summerHouseChecked;
    }
    this.applyFilterPropertyType();
    this.anyCheckboxChecked = this.houseChecked || this.multiFamilyHouseChecked ||
      this.apartmentChecked || this.condoChecked || this.rowHouseChecked || this.summerHouseChecked;
  }

  applyFilterPropertyType(): void {
    const selectedPropertyTypes: string[] = [];

    if (this.houseChecked) {
      selectedPropertyTypes.push('House');
    }
    if (this.multiFamilyHouseChecked) {
      selectedPropertyTypes.push('Multi-family house');
    }
    if (this.apartmentChecked) {
      selectedPropertyTypes.push('Apartment');
    }
    if (this.condoChecked) {
      selectedPropertyTypes.push('Condo');
    }
    if (this.rowHouseChecked) {
      selectedPropertyTypes.push('Row house');
    }
    if (this.summerHouseChecked) {
      selectedPropertyTypes.push('Summer house');
    }
    if (selectedPropertyTypes.length === 0) {
      this.filteredProperties = this.originalProperties;
      this.isFilterApplied = false;
    } else {
      this.filteredProperties = this.filterPropertiesPropertyType(selectedPropertyTypes);
      this.isFilterApplied = true;
    }
  }

  filterPropertiesPropertyType(selectedPropertyTypes: string[]): PropertyListItemModel[] {
    return this.originalProperties.filter(property => selectedPropertyTypes.includes(property.propertyTypeDisplayName))
  }


}
