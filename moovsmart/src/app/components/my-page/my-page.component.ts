import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {errorHandler, validationHandler} from "../../utils/validationHandler";
import {MyAccountModel} from "../../models/my-account.model";
import {PropertyService} from "../../services/property.service";
import {MyPropertyListItemModel} from "../../models/my-property-list-item.model";
import {PropertyActiveToggleModel} from "../../models/property-active-toggle.model";
import {PasswordChangeModel} from "../../models/password-change.model";
import {AdminService} from "../../services/admin.service";
import {OpenHouseService} from "../../services/open-house.service";
import {OpenHouseFormDataModel} from "../../models/open-house-form-data.model";
import {control} from "leaflet";

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
  mySavedProperties: MyPropertyListItemModel[];
  password: FormGroup;
  profilePic: FormGroup;
  openHouse: FormGroup;
  selectedPropertyId: number | null = null;
  emailSent: string | null = null;
  loading: boolean = false;

  constructor(private userService: UserService, private propertyService: PropertyService, private router: Router, private formBuilder: FormBuilder, private adminService: AdminService, private openHouseService: OpenHouseService) {
    this.email = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })

    this.password = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

    this.profilePic = this.formBuilder.group({
      file: [null]
    })

    this.openHouse = this.formBuilder.group({
      propertyId: new FormControl(this.selectedPropertyId),
      fromTime: ['', [Validators.required, this.dateValidator()]],
      toTime: ['', [Validators.required, this.dateValidator()]],
      maxParticipants: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
    })
    this.openHouse.get('propertyId').valueChanges.subscribe((newPropertyId) => {
    });
  }

  // -------------- DECIDING WHICH PAGE TO DISPLAY ------------------
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

  showMyProperties() {
    this.activePage = 'MyProperties';
    this.propertyService.getMyProperties().subscribe(response => {
      this.myProperties = response;
    })
  }

  showProfilePictureForm() {
    this.activePage = 'ProfilePicture';
  }

  showMySavedProperties() {
    this.activePage = 'MySavedProperties';
    this.propertyService.getMySavedProperties().subscribe(response => {
      this.mySavedProperties = response;
    })
  }

  showOpenHouseForm(propertyId: number) {
    this.activePage = 'OpenHouse';
    this.selectedPropertyId = propertyId;
    this.openHouse.get('propertyId').setValue(this.selectedPropertyId);
  }

  // ------------------- FUNCTIONS -------------------------
  changeEmail() {
    const data = this.email.value;

    this.userService.changeEmail(data).subscribe(
      () => {
      },
      error => {
        this.emailConflictMessage = errorHandler(error);
      },
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/register']);
      }
    )
  }

  logOut() {
    this.userService.tokenIsPresent.next(false);
    this.adminService.isAdmin.next(false);
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

  onFileChange(event: any) {
    if (event?.target?.files?.length > 0) {
      const file = event.target.files[0];
      this.profilePic.patchValue({
        file
      });
    }
  }

  changeProfilePicture() {
    const data = new FormData();
    data.append('file', this.profilePic.get('file').value);
    this.userService.uploadProfilePicture(data).subscribe(() => {

      },
      error => {
        errorHandler(error);
      },
      () => {
        this.showAccountDetails();
      })
  }


  // creating new open house
  getSelectedPropertyName() {
    const selectedProperty = this.myProperties.find(
      (property) => property.propertyId === this.selectedPropertyId
    );

    if (selectedProperty && selectedProperty.name) {
      return selectedProperty.name;
    } else {
      return '---Choose your property!---';
    }
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (selectedDate < tomorrow) {
        return {dateInPast: true};
      }

      return null;
    };
  }


  createOpenHouse() {
    const data: OpenHouseFormDataModel = this.openHouse.value;
    this.loading = true;
    this.openHouseService.createOpenHouse(data).subscribe({
      next: () => {
      },
      error: err => {
        validationHandler(err, this.openHouse)
      },
      complete: () => {
        this.emailSent = "We've sent an email to you confirming the creation of your Open House event."

        setTimeout(() => {
          this.loading = false;
          this.openHouse.reset();
          this.showMyProperties();
        }, 1000)

      }
    })
  }

}
