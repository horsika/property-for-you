import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {PropertyService} from "../../services/property.service";
import {MyAccountModel} from "../../models/my-account.model";
import {MyPropertyListItemModel} from "../../models/my-property-list-item.model";
import {Router} from "@angular/router";
import {PropertyActiveToggleModel} from "../../models/property-active-toggle.model";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  users: MyAccountModel[];
  usersOwnedProperties: MyPropertyListItemModel[];
  allProperties: MyPropertyListItemModel[];
  activePage: string = 'TBD';
  activeUserPage: string = 'AllUsers';
  constructor(private adminService: AdminService, private propertyService: PropertyService, private router: Router) { }


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
