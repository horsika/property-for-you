import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailIsAlreadyInUseHandler} from "../../utils/validationHandler";
import {MyAccountModel} from "../../models/my-account.model";

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit{

  activePage: string = "";
  email: FormGroup;
  emailConflictMessage: string | null = null;
  myAccount: MyAccountModel;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.email = this.formBuilder.group({
      email: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.showAccountDetails();
  }

  showEmailChangePage() {
    this.activePage = 'EmailChange';
  }

  showNameChangePage() {
    this.activePage = 'NameChange';
  }

  changeEmail() {
    const data = this.email.value;

    this.userService.changeEmail(data).subscribe(
      () => {
      },
      error => {
        this.emailConflictMessage = emailIsAlreadyInUseHandler(error);
      },
      () => {
        this.activePage = 'AccountDetails';
        this.router.navigate(['/my-page'])
      }
    )
  }

  showAccountDetails() {
    this.activePage = 'AccountDetails';
    this.userService.getMyAccountDetails().subscribe(
      response => {
        this.myAccount = response;
      }
    )
  }
}
