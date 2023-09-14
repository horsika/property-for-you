import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
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
import {OpenHouseListItemModel} from "../../models/open-house-list-item.model";
import {BookingFormDataModel} from "../../models/booking-form-data.model";
import {BookingService} from "../../services/booking.service";

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {

  activePage: string = "";
  email: FormGroup;
  errorMessage: string | null = null;
  myAccount: MyAccountModel;
  myProperties: MyPropertyListItemModel[];
  mySavedProperties: MyPropertyListItemModel[];
  password: FormGroup;
  profilePic: FormGroup;
  openHouseForm: FormGroup;
  selectedPropertyId: number | null = null;
  emailSent: string | null = null;
  loading: boolean = false;
  openHouseList: OpenHouseListItemModel[];
  bookingForm: FormGroup | null = null;
  selectedOpenHouseId: number | null = null;

  constructor(private userService: UserService,
              private propertyService: PropertyService,
              private router: Router,
              private formBuilder: FormBuilder,
              private adminService: AdminService,
              private openHouseService: OpenHouseService,
              private route: ActivatedRoute,
              private bookingService: BookingService) {
    this.email = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })

    this.password = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

    this.profilePic = this.formBuilder.group({
      file: [null]
    })

    this.openHouseForm = this.formBuilder.group({
      propertyId: new FormControl(this.selectedPropertyId),
      fromTime: ['', [Validators.required, this.dateValidator()]],
      toTime: ['', [Validators.required, this.dateValidator()]],
      maxParticipants: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      currentParticipants: [0],
    })
    this.openHouseForm.get('propertyId').valueChanges.subscribe((newPropertyId) => {
    });


    this.bookingForm = this.formBuilder.group({
      openHouseId: new FormControl(this.selectedOpenHouseId),
      placesToBook: [1, [Validators.required, Validators.min(1)]]
    });
    this.bookingForm.get('openHouseId').valueChanges.subscribe(newOpenHouseId => {
    });
    // this.openHouseForm.get('currentParticipants').valueChanges.subscribe(newCurrentParticipants => {
    //   this.updatePlacesValidation(newCurrentParticipants);
    // });


  }

  // -------------- DECIDING WHICH PAGE TO DISPLAY ------------------
  ngOnInit() {
    this.openHouseService.getActivePage().subscribe((activePage) => {
      this.activePage = activePage;
      console.log(this.activePage);
    });
    this.route.params.subscribe((params) => {
      const propertyId = params['propertyId'];
      this.showOpenHouseList(propertyId);
    });

    this.showAccountDetails();
  }

  showEmailChangePage() {
    this.activePage = 'EmailChange';
    this.errorMessage = null;
  }

  showPasswordChangePage() {
    this.activePage = 'PasswordChange';
    this.errorMessage = null;
  }

  showAccountDetails() {
    this.activePage = 'AccountDetails';
    this.userService.getMyAccountDetails().subscribe(
      response => {
        this.myAccount = response;
      }
    )
    this.errorMessage = null;
  }

  showMyProperties() {
    this.activePage = 'MyProperties';
    this.propertyService.getMyProperties().subscribe(response => {
      this.myProperties = response;
    })
    this.errorMessage = null;
  }

  showProfilePictureForm() {
    this.activePage = 'ProfilePicture';
    this.errorMessage = null;
  }

  showMySavedProperties() {
    this.activePage = 'MySavedProperties';
    this.propertyService.getMySavedProperties().subscribe(response => {
      this.mySavedProperties = response;
    })
    this.errorMessage = null;
  }

  showOpenHouseForm(propertyId: number) {
    this.activePage = 'OpenHouse';
    this.selectedPropertyId = propertyId;
    this.openHouseForm.get('propertyId').setValue(this.selectedPropertyId);
  }

  showOpenHouseList(propertyId: number) {
    this.activePage = 'OpenHouseList';
    this.selectedPropertyId = propertyId;
    this.openHouseService.getActiveOpenHouseList().subscribe(response => {
      this.openHouseList = response.filter(openHouse => openHouse.propertyId === propertyId);
    });


  }

  showBookingForm(openHouseId: number) {
    this.activePage = 'OpenHouseList';
    this.selectedOpenHouseId = openHouseId;
    this.bookingForm.get('openHouseId').setValue(this.selectedOpenHouseId);
  }

  // ------------------- FUNCTIONS -------------------------
  changeEmail() {
    const data = this.email.value;

    this.userService.changeEmail(data).subscribe(
      () => {
      },
      error => {
        this.errorMessage = errorHandler(error);
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
        this.errorMessage = errorHandler(error);
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
    const data: OpenHouseFormDataModel = this.openHouseForm.value;
    this.loading = true;
    this.openHouseService.createOpenHouse(data).subscribe({
      next: () => {
      },
      error: err => {
        validationHandler(err, this.openHouseForm)
      },
      complete: () => {
        this.emailSent = "We've sent an email to you confirming the creation of your Open House event."

        setTimeout(() => {
          this.loading = false;
          this.openHouseForm.reset();
          this.showMyProperties();
        }, 1000)

      }
    })
  }

  //TODO: validation still not working...:(
  private updatePlacesValidation(newCurrentParticipants: number): void {
    const freePlaces = this.openHouseForm.value.maxParticipants - newCurrentParticipants;
    const placesControl = this.bookingForm.get('places');

    placesControl.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(freePlaces), // Set the maximum value based on freePlaces
    ]);

    placesControl.updateValueAndValidity();

  }

  bookATour(){
    const data: BookingFormDataModel = this.bookingForm.value;
    this.loading = true;
    this.bookingService.createBooking(data).subscribe({
      next: () => {
      },
      error: err => {
        validationHandler(err, this.bookingForm)
      },
      complete: () => {
        this.emailSent = "We've sent an email to you confirming the booking to this Open House event."

        setTimeout(() => {
          this.loading = false;
          this.bookingForm.reset();
          this.showMySavedProperties();
        }, 1000)

      }
    })
  }

}
