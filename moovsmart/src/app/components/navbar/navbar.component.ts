import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn : boolean = false;
  admin: boolean = false;
  constructor(private userService: UserService, private adminService: AdminService) {
  }

  ngOnInit() {

    const token = localStorage.getItem('token');
    this.loggedIn = !!token;

    this.userService.tokenIsPresent.subscribe((isTokenPresent: boolean) => {
      this.loggedIn = isTokenPresent;
    })

    this.adminService.isAdmin.subscribe(isAdmin => {
      this.admin = isAdmin;
    })
  }

}
