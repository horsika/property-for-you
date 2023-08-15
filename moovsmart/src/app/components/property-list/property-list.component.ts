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
  selectedFilterOptionListingType = 'For sale';
  filteredProperties: PropertyListItemModel[] = [];
  deselectAllChecked: boolean = true;
  houseChecked: boolean = true;
  multiFamilyChecked: boolean = true;
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
    const filteredListingType = this.selectedFilterOptionListingType === 'For sale' ? 'SELL' : 'RENT';
    this.properties = this.filterPropertiesListingType(filteredListingType);
  }

  filterPropertiesListingType(listingType: string): PropertyListItemModel[] {
    return this.originalProperties.filter(property => property.listingType === listingType);
  }

  preventDropdownCollapse(event: Event): void {
    event.stopPropagation();
  }

  //Filter by PropertyType----------------------------------------

  toggleSelectAll() {
    if (this.deselectAllChecked) {
      this.houseChecked = false;
      this.multiFamilyChecked = false;
      this.apartmentChecked = false;
      this.condoChecked = false;
      this.rowHouseChecked = false;
      this.summerHouseChecked = false;
    } else {
      this.houseChecked = true;
      this.multiFamilyChecked = true;
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
    if (propertyType === 'HOUSE') {
      this.houseChecked = !this.houseChecked;
    }
    if (propertyType === 'MULTI_FAMILY') {
      this.multiFamilyChecked = !this.multiFamilyChecked;
    }
    if (propertyType === 'APARTMENT') {
      this.apartmentChecked = !this.apartmentChecked;
    }
    if (propertyType === 'CONDO') {
      this.condoChecked = !this.condoChecked;
    }
    if (propertyType === 'ROW_HOUSE') {
      this.rowHouseChecked = !this.rowHouseChecked;
    }
    if (propertyType === 'SUMMER_HOUSE') {
      this.summerHouseChecked = !this.summerHouseChecked;
    }
    this.applyFilterPropertyType();
    this.anyCheckboxChecked = this.houseChecked || this.multiFamilyChecked ||
      this.apartmentChecked || this.condoChecked || this.rowHouseChecked || this.summerHouseChecked;
  }

  applyFilterPropertyType(): void {
    const selectedPropertyTypes: string[] = [];

    if (this.houseChecked) {
      selectedPropertyTypes.push('HOUSE');
    }
    if (this.multiFamilyChecked) {
      selectedPropertyTypes.push('MULTI_FAMILY');
    }
    if (this.apartmentChecked) {
      selectedPropertyTypes.push('APARTMENT');
    }
    if (this.condoChecked) {
      selectedPropertyTypes.push('CONDO');
    }
    if (this.rowHouseChecked) {
      selectedPropertyTypes.push('ROW_HOUSE');
    }
    if (this.summerHouseChecked) {
      selectedPropertyTypes.push('SUMMER_HOUSE');
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
    return this.originalProperties.filter(property => selectedPropertyTypes.includes(property.propertyType))
  }


}
