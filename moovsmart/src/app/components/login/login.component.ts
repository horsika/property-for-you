import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthResponseModel} from "../../models/auth-response.model";
import {validationHandler} from "../../utils/validationHandler";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  auth: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.auth = this.formBuilder.group({
      'loginEmail': ['', Validators.required],
      'loginPassword': ['', Validators.required]
    });

  }
  onLogin() {
    const data = this.auth.value;
    console.log(this.auth.value);
    this.userService.loginUser(data).subscribe(
      (response: AuthResponseModel) => {
        const token = response.token;
        localStorage.setItem('token', token);
      },
      error => validationHandler(error, this.auth),
      () => {
        this.router.navigate(["property-list"])
      }
    )
  }

  goToRegister() {
    this.router.navigate(["register"])
  }

}
