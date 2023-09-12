import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {PropertyService} from "../../services/property.service";
import {MyAccountModel} from "../../models/my-account.model";
import {MyPropertyListItemModel} from "../../models/my-property-list-item.model";
import {Router} from "@angular/router";
import {PropertyActiveToggleModel} from "../../models/property-active-toggle.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  users: MyAccountModel[];
  usersOwnedProperties: MyPropertyListItemModel[];
  allProperties: MyPropertyListItemModel[];
  filters: FormGroup;
  activePage: string = 'TBD';
  activeUserPage: string = 'AllUsers';

  constructor(private adminService: AdminService,
              private propertyService: PropertyService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.filters = formBuilder.group({
      timePeriod: [],
      status: [],
      listingType: [],
      propertyType: []
    })
  }


  ngOnInit(): void {
  }

  // ----- SHOW STUFF -----

  goToUsers() {
    this.activePage = 'Users';
  }

  goToEnabledUsers() {
    this.activeUserPage = 'EnabledUsers';
  }

  goToDisabledUsers() {
    this.activeUserPage = 'DisabledUsers';
  }

  goToAllUsers() {
    this.activeUserPage = 'AllUsers';
  }

  goToAllProperties() {
    this.activePage = 'AllProperties';
  }

  previewProperty(id: number) {
    this.router.navigate(['property-details', id]);
  }

  // ---- GET STUFF DATA ----

  getAllUsers() {
    this.adminService.getAllUsers().subscribe(resp => {
      this.users = resp;
    })
  }

  getEnabledUsers() {
    this.adminService.getEnabledUsers().subscribe(resp => {
      this.users = resp;
    })
  }

  getDisabledUsers() {
    this.adminService.getDisabledUsers().subscribe(resp => {
      this.users = resp;
    })
  }

  getOwnedProperties(id: number) {
    this.adminService.getUsersOwnedProperties(id).subscribe(resp => {
      this.usersOwnedProperties = resp;
    })
  }

  getProperties() {
    const data = this.filters.value;
    this.adminService.getAllProperties().subscribe(resp => {
      this.allProperties = resp;
    })
  }

  // ------ DO STUFF --------

  activateProperty(id: number, userId: number) {
    const data: PropertyActiveToggleModel = {propertyId: id, listingStatus: 'ACTIVE'}
    this.propertyService.setListingStatus(data).subscribe(() => {
      },
      () => {
      },
      () => {
        this.getOwnedProperties(userId);
      }
    )
  }

  deactivateProperty(id: number, userId:number) {
    const data: PropertyActiveToggleModel = {propertyId: id, listingStatus: 'INACTIVE'}
    this.propertyService.setListingStatus(data).subscribe(() => {
      },
      () => {
      },
      () => {
        this.getOwnedProperties(userId)
      }
    )
  }



}
