import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn : boolean;
  constructor(private userService: UserService) {
  }

  ngOnInit() {

    const token = localStorage.getItem('token');
    this.loggedIn = !!token;

    this.userService.tokenIsPresent.subscribe((isTokenPresent: boolean) => {
      this.loggedIn = isTokenPresent;
    })
  }

}
