import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {errorHandler, validationHandler} from "../../utils/validationHandler";
import {AuthResponseModel} from "../../models/auth-response.model";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: FormGroup;
  auth: FormGroup;
  toggle: boolean;
  badCredentials: string | null = null;
  emailSent: string | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;
  passwordsMatch: boolean;
  constructor(private userService: UserService,
              private adminService: AdminService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.user = this.formBuilder.group({
      'email': ['', [Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"), Validators.required]],
      'password': ['', [Validators.minLength(6), Validators.required]],
      'password2': [''],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required]
    });

    this.auth = this.formBuilder.group({
      'loginEmail': ['', [Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"), Validators.required]],
      'loginPassword': ['', [Validators.required, Validators.minLength(6)]]
    });

    this.toggle = true; //true: Register tab is active
  }

  onPasswordChange() {
    let pass1 = this.user.get('password').value;
    let pass2 = this.user.get('password2').value;
    console.log(pass1, pass2, pass1 === pass2);
    this.passwordsMatch =  (pass1 === pass2);
  }

  onRegister() {
    const data = this.user.value;
    this.loading = true;
    this.userService.registerUser(data).subscribe(
      () => {
      },
      error => {
        validationHandler(error, this.user);
        this.errorMessage = errorHandler(error);
        this.loading = false;
      },
      () => {
        this.toggle = false;
        this.loading = false;
        this.emailSent = "We've sent an email to you. Please click the link inside to verify yourself. Then, you may log in."
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

        if(JSON.parse(atob(token.split('.')[1])).role === 'ROLE_ADMIN'){
          this.adminService.isAdmin.next(true);
        } else {
          this.adminService.isAdmin.next(false);
        }
      },
      error => {
        this.badCredentials = 'Email or password are incorrect';
      },
      () => {
        this.router.navigate(["/homepage"])
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
