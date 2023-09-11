import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {PropertyService} from "../../services/property.service";
import {MyAccountModel} from "../../models/my-account.model";
import {MyPropertyListItemModel} from "../../models/my-property-list-item.model";

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
  constructor(private adminService: AdminService, private propertyService: PropertyService) { }


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
    this.activeUserPage = 'AllUsers'
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

}
