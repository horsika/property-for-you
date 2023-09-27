import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {BookingService} from "../../services/booking.service";
import {BookingFormDataModel} from "../../models/booking-form-data.model";
import {Subscription} from "rxjs";
import {MyOpenHouseListItemModel} from "../../models/my-open-house-list-item.model";
import {MyBookingListItemModel} from "../../models/my-booking-list-item.model";
import * as L from "leaflet";
import {PropertyListItemModel} from "../../models/propertyListItem.model";

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit, OnDestroy {

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
  passwordsMatch: boolean;
  openHouseList: OpenHouseListItemModel[];
  bookingForms: FormGroup[] = [];
  //subscriptions
  openHousePropertySubscription: Subscription;
  newPropertySubscription: Subscription;
  myOpenHouseList: MyOpenHouseListItemModel[];
  bookedTourList: MyBookingListItemModel[];
  private map: any;

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
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: []
    })

    this.profilePic = this.formBuilder.group({
      file: [null, [Validators.required]]
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

  }

  // -------------- DECIDING WHICH PAGE TO DISPLAY ------------------
  ngOnInit() {
    this.openHousePropertySubscription = this.openHouseService.selectedPropertyId$.subscribe((propertyId) => {
      if (propertyId !== null) {
        this.showOpenHouseList(propertyId);
      } else {
        this.showAccountDetails();
      }
    });

    this.newPropertySubscription = this.route.queryParams.subscribe(params => {
      if (params.showMyProperties) {
        this.showMyProperties();
      }
    })

  }

  ngOnDestroy() {
    this.openHousePropertySubscription.unsubscribe();
    this.newPropertySubscription.unsubscribe();
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
    this.openHouseService.getActiveOpenHouseListGroupedByPropertyId().subscribe(response => {
      this.openHouseList = response.filter(openHouse => openHouse.propertyId === propertyId);
      if (this.openHouseList) {

        this.bookingForms = [];

        this.openHouseList.forEach((openHouse) => {
          const freePlaces = openHouse.freePlaces;
          const form = this.formBuilder.group({
            openHouseId: new FormControl(openHouse.openHouseId),
            placesToBook: ['', [Validators.required, Validators.min(1), Validators.max(freePlaces)]],
          });
          this.bookingForms.push(form);
        });

      }
    });

  }

  showMyOpenHouses() {
    this.activePage = 'MyOpenHouses';
    this.openHouseService.getMyOpenHouseList().subscribe(response => {
      this.myOpenHouseList = response;
    })
    this.errorMessage = null;
  }

  showMyBookedTours() {
    this.activePage = 'BookedTours';

    this.openHouseService.getMyBookingList().subscribe(response => {
      this.bookedTourList = response;
      this.initMap(this.bookedTourList);
    })
    this.errorMessage = null;
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
    localStorage.removeItem('token');
    this.adminService.decideIfAdmin();
    this.router.navigate(['/homepage']);
  }

  previewProperty(id: number) {
    this.router.navigate(['property-details', id]);
  }

  goToEditProperty(id: number) {
    this.router.navigate(['property-form', id]);
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

  onPasswordChange() {
    let pass1 = this.password.get('password').value;
    let pass2 = this.password.get('password2').value;
    this.passwordsMatch = (pass1 === pass2);
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
      if (file.size > 2000000) {
        alert('File size exceeds the allowed limit (2MB). Please choose a smaller file.');
        event.target.value = '';
      } else {
        this.profilePic.patchValue({
          file
        });
      }
    }
  }

  changeProfilePicture() {
    const data = new FormData();
    data.append('file', this.profilePic.get('file').value);
    this.loading = true;
    this.userService.uploadProfilePicture(data).subscribe(() => {

      },
      error => {
        this.errorMessage = errorHandler(error);
        this.loading = false;
      },
      () => {
        this.showAccountDetails();
        this.loading = false;
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
        this.loading = false;
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


  bookATour(index: number, openHouseId: number) {
    const form = this.bookingForms[index];
    if (form.valid) {
      const data: BookingFormDataModel = form.value;
      this.bookingService.createBooking(data).subscribe({
        next: () => {
        },
        error: err => {
          this.errorMessage = errorHandler(err)
        },
        complete: () => {
          this.emailSent = "We've sent an email to you confirming the booking to this Open House event."
          setTimeout(() => {
            form.reset();
            this.showMySavedProperties();
          }, 1500)
        }
      })
    }
  }

  private initMap(bookedTourList: MyBookingListItemModel[]): void {

    this.map = L.map('map', {
      center: [47.5, 19.04], // Budapest coordinates
      zoom: 10,
      zoomControl: false, // Disable the default zoom control
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    L.control.zoom({
      position: 'topright', // You can adjust the position
    }).addTo(this.map);

    const propertyMarkers: L.Marker[] = [];

    for (const bookedTour of bookedTourList) {
      const lat = parseFloat(String(bookedTour.latitude));
      const lon = parseFloat(String(bookedTour.longitude));
      // Create a custom popup content with an image
      const popupContent = `
     <div>
      <img src="${bookedTour.image}" alt="${bookedTour.propertyName}" style="max-width: 80%; max-height: 45%;">
      <p>${bookedTour.propertyName}</p>
    </div>
  `;
      // Create a custom icon
      const customIcon = L.divIcon({
        className: 'custom-icon',
        html: '<i class="fas fa-building" style="color: #e96149; font-size: 30px;"></i>',
        iconAnchor: [12, 41], // Adjust anchor point if necessary
      });

      const propertyMarker = L.marker([lat, lon], {
        icon: customIcon,
      });
      propertyMarker.bindPopup(popupContent);
      propertyMarker.on('mouseover', () => {
        propertyMarker.openPopup();
      });
      propertyMarker.addTo(this.map);
      propertyMarkers.push(propertyMarker);
    }
    //calculate the bounds based on markers
    if (propertyMarkers.length > 0) {
      const markerBounds = L.featureGroup(propertyMarkers).getBounds();
      this.map.fitBounds(markerBounds);
    }

  }

  getGoogleMapsUrl(address: string): string {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  }

  calculateDateDifference(property: MyPropertyListItemModel) {
    const currentDate = new Date();
    const activatedAtDate = new Date(property.activatedAt);
    const timeDifference = Math.abs(currentDate.getTime() - activatedAtDate.getTime());
    return Math.ceil(timeDifference / (1000 * 3600 * 24)); //difference in days
  }

}
