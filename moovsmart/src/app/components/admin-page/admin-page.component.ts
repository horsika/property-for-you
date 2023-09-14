import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {PropertyService} from "../../services/property.service";
import {MyAccountModel} from "../../models/my-account.model";
import {MyPropertyListItemModel} from "../../models/my-property-list-item.model";
import {Router} from "@angular/router";
import {PropertyActiveToggleModel} from "../../models/property-active-toggle.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserActiveStatusModel} from "../../models/user-active-status.model";

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
  activePage: string;
  currentUser: MyAccountModel;

  constructor(private adminService: AdminService,
              private propertyService: PropertyService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.filters = formBuilder.group({
      timePeriod: ['ALL'],
      status: ['ALL'],
      listingType: ['ALL'],
      propertyType: ['ALL']
    })
  }


  ngOnInit(): void {
  }

  // ----- SHOW STUFF -----

  goToUsers() {
    this.activePage = 'Users';
  }
  goToProperties() {
    this.activePage = 'Properties';
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
    this.whoIsTheCurrentUser(id);
    this.adminService.getUsersOwnedProperties(id).subscribe(resp => {
      this.usersOwnedProperties = resp;
    })
  }

  getProperties() {
    const data = this.filters.value;
    this.adminService.getAllProperties(data).subscribe(resp => {
      this.allProperties = resp;
    })
  }

  whoIsTheCurrentUser(userId: number) {
      this.currentUser = this.users.find((user) => user.id === userId);
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

  activatePropertyNoUser(id: number) {
    const data: PropertyActiveToggleModel = {propertyId: id, listingStatus: 'ACTIVE'}
    this.propertyService.setListingStatus(data).subscribe(() => {
      },
      () => {
      },
      () => {
        this.getProperties();
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

  deactivatePropertyNoUser(id: number) {
    const data: PropertyActiveToggleModel = {propertyId: id, listingStatus: 'INACTIVE'}
    this.propertyService.setListingStatus(data).subscribe(() => {
      },
      () => {
      },
      () => {
        this.getProperties();
      }
    )
  }

  changeUserStatus(status: boolean, userId: number) {
    const data: UserActiveStatusModel = {userId: userId, userStatus: status};
    this.adminService.changeUserStatus(data).subscribe(
      () => {},
      () => {},
      () => {
        this.getAllUsers();
      });
  }



}
