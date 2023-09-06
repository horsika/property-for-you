import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailIsAlreadyInUseHandler, validationHandler} from "../../utils/validationHandler";
import {MyAccountModel} from "../../models/my-account.model";
import {PropertyService} from "../../services/property.service";
import {PropertyListItemModel} from "../../models/propertyListItem.model";
import {MyPropertyListItemModel} from "../../models/my-property-list-item.model";
import {PropertyActiveToggleModel} from "../../models/property-active-toggle.model";
import {PasswordChangeModel} from "../../services/password-change.model";

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {

  activePage: string = "";
  email: FormGroup;
  emailConflictMessage: string | null = null;
  myAccount: MyAccountModel;
  myProperties: MyPropertyListItemModel[];
  password: FormGroup;

  constructor(private userService: UserService, private propertyService: PropertyService, private router: Router, private formBuilder: FormBuilder) {
    this.email = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })

    this.password = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit() {
    this.showAccountDetails();
  }

  showEmailChangePage() {
    this.activePage = 'EmailChange';
  }

  showPasswordChangePage() {
    this.activePage = 'PasswordChange';
  }

  showAccountDetails() {
    this.activePage = 'AccountDetails';
    this.userService.getMyAccountDetails().subscribe(
      response => {
        this.myAccount = response;
      }
    )
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
        localStorage.removeItem('token');
        this.router.navigate(['/register']);
      }
    )
  }

  showMyProperties() {
    this.activePage = 'MyProperties';
    this.propertyService.getMyProperties().subscribe(response => {
      this.myProperties = response;
    })
  }

  logOut() {
    this.userService.tokenIsPresent.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/homepage']);
  }

  previewProperty(id: number) {
    this.router.navigate(['property-details', id]);
  }

  activateProperty(id: number) {
    const data: PropertyActiveToggleModel = {propertyId: id, listingStatus: 'ACTIVE'}
    this.propertyService.setListingStatus(data).subscribe(() => {
      },
      () => {
      },
      () => {
        this.showMyProperties();
      }
    )
  }

  deactivateProperty(id: number) {
    const data: PropertyActiveToggleModel = {propertyId: id, listingStatus: 'INACTIVE'}
    this.propertyService.setListingStatus(data).subscribe(() => {
      },
      () => {
      },
      () => {
        this.showMyProperties();
      }
    )
  }

  changePassword() {
    const data: PasswordChangeModel = this.password.value;
    this.userService.changePassword(data).subscribe(() => {

      },
      error => {
          validationHandler(error, this.password)
      },
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/register']);
      })
  }
}
