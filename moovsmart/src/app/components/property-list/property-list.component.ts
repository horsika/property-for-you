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
}
