import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {PropertyService} from "../../services/property.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private adminService: AdminService, private propertyService: PropertyService) { }

  ngOnInit(): void {
  }

}
