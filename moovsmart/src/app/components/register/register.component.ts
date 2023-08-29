import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
export class RegisterComponent{

  user: FormGroup;
  auth: FormGroup;
  toggle: boolean;
  badCredentials: string | null = null;


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

    this.auth = this.formBuilder.group({
      'loginEmail': ['', Validators.required],
      'loginPassword': ['', Validators.required]
    });

    this.toggle = true;
  }

  onRegister() {
    const data = this.user.value;
    this.userService.registerUser(data).subscribe(
      () => {
      },
      error => {
        validationHandler(error, this.user)
      },
      () => {
        this.toggle = false;
        this.router.navigate(["register"])
      }
    )
  }

  onLogin() {
    const data = this.auth.value;
    this.userService.loginUser(data).subscribe(
      (response: AuthResponseModel) => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.userService.tokenIsPresent.next(true);
      },
      error => {
        this.badCredentials = 'Email or password are incorrect';
      },
      () => {
        this.router.navigate(["property-list"])
      }
    )
  }

  goToLogin() {
    this.toggle = false;
  }

  goToRegister() {
    this.toggle = true;
  }

}
