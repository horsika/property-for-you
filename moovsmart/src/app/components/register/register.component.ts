import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {validationHandler} from "../../utils/validationHandler";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  user: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.user = this.formBuilder.group({
      email:['', Validators.required],
      password:['', [Validators.required, Validators.min(6)]],
      firstName:['', Validators.required],
      lastName:['', Validators.required]
      // TODO profilePicture upload??
    })
  }



  onSubmit() {
    const data = this.user.value;
    this.userService.registerUser(data).subscribe(
    () => this.router.navigate(["property-list"]),
      error => validationHandler(error, this.user)
    );
  }

}
