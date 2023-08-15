import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {validationHandler} from "../../utils/validationHandler";
import {AuthResponseModel} from "../../models/auth-response.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: FormGroup;

  auth: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.user = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', [Validators.required, Validators.min(6)]],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required]
      // TODO profilePicture upload??
    });
  }


  onRegister() {
    const data = this.user.value;
    this.userService.registerUser(data).subscribe(
      (response: AuthResponseModel) => {
        const token = response.token;
        localStorage.setItem('token', token);

      },
      error => {
        validationHandler(error, this.user)
      },
      () => {
        this.router.navigate(["property-list"])
      }
    )
  }

  goToLogin() {
    this.router.navigate(["login"])
  }

}
