import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PropertyService} from '../../services/property.service';
import {Router} from '@angular/router';
import {errorHandler, validationHandler} from '../../utils/validationHandler';
import {PropertyTypeFormListItemModel} from "../../models/property-type-form-list-item.model";
import {HeatingTypeFormListItemModel} from "../../models/heating-type-form-list-item.model";
import {validateNumberOfBathrooms} from "../../utils/custom.validators";
import {MapPointModel} from "../../models/map-point.model";

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css'],
})
export class PropertyFormComponent implements OnInit {

  propertyForm: FormGroup;
  propertyTypeList: PropertyTypeFormListItemModel[];
  heatingTypeList: HeatingTypeFormListItemModel[];
  errorMessage: string | null = null;
  mapPoint: MapPointModel;
  urls: string[] = [];
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private propertyService: PropertyService,
              private router: Router) {
    this.propertyForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(3)]],
      'numberOfBedrooms': ['', [Validators.required, Validators.min(1)]],
      'numberOfBathrooms': ['', [Validators.required, Validators.min(1), validateNumberOfBathrooms]],
      'price': ['', [Validators.required, Validators.min(0.1)]],
      'floorArea': ['', [Validators.required, Validators.min(5)]],
      'airConditioning': [false],
      'description': ['', [Validators.required, Validators.maxLength(600), Validators.minLength(50)]],
      'images': this.formBuilder.array([Validators.required]),
      // 'address': [{value: '', disabled: true}, [Validators.required]],
      'postcode': [{value: '', disabled: true}, [Validators.required]],
      'city': [{value: '', disabled: true}, [Validators.required]],
      'road': [{value: '', disabled: true}, [Validators.required]],
      'house_number': ['', [Validators.min(1), Validators.pattern('^[1-9]\\d*(?:[ -\\/]?(?:[a-zA-Z]+|[1-9]\\d*))?$')]],
      'floor': ['', Validators.min(1)],
      'door': ['', Validators.pattern('^[1-9]\\d*(\\s*)?([-/.]?\\s?[a-zA-Z])?$')],
      'propertyType': ['', Validators.required],
      'heatingType': ['', Validators.required],
      'listingType': ['', Validators.required],
      'latitude': ['', Validators.required],
      'longitude': ['', Validators.required],

    });
  }

  ngOnInit() {
    this.propertyService.getFormOptions().subscribe({
      next: response => {
        this.propertyTypeList = response.propertyTypes;
        this.heatingTypeList = response.heatingTypes;
      },
      error: err => console.warn(err),
    })
  }

  onFileChange(event: any) {
    this.errorMessage = null;
    if (event?.target?.files?.length > 0) {
      const images = event.target.files;
      const imageControls = this.propertyForm.get('images') as FormArray;

      for (const image of images) {
        const fileControl = new FormControl(image);
        imageControls.push(fileControl);
      }

      this.displayPropertyImages(images);
    }
  }

  displayPropertyImages(images: Array<File>) {
    this.urls = [];
    for (let image of images) {

      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          //do not preview
        } else {
          let url = reader.result
          this.urls.push(url);
        }
      }

    }

  }

  submit = () => {
    const formData = new FormData();
    // Loop through the controls in your FormGroup
    Object.keys(this.propertyForm.controls).forEach((key) => {
      const control = this.propertyForm.get(key);
      if (control instanceof FormControl) {
        formData.append(key, control.value);
      } else if (control instanceof FormArray) {
        for (const fileControl of control.controls) {
          formData.append('images', fileControl.value);
        }
      }
    });

    this.loading = true;

    this.propertyService.createProperty(formData).subscribe(
      () => this.router.navigate(['/property-list'], {queryParams: {city: this.propertyForm.get('city').value}}),
      error => {
        validationHandler(error, this.propertyForm)
        this.errorMessage = errorHandler(error)
        this.loading = false
      },
      () => {
        this.router.navigate(['/my-page'], {queryParams: {showMyProperties: true}});
        this.loading = false;
      }
    );

  };

  loadMapPoint(mapPointIncoming: MapPointModel) {
    this.mapPoint = mapPointIncoming;
    if (this.mapPoint.address.house_number) {
      this.propertyForm.get('postcode').setValue(this.mapPoint.address.postcode);
      this.propertyForm.get('city').setValue(this.mapPoint.address.city);
      this.propertyForm.get('road').setValue(this.mapPoint.address.road);
      this.propertyForm.get('house_number').setValue(this.mapPoint.address.house_number);
    }
    else {
      this.propertyForm.get('postcode').setValue(this.mapPoint.address.postcode);
      this.propertyForm.get('city').setValue(this.mapPoint.address.city);
      this.propertyForm.get('road').setValue(this.mapPoint.address.road);
    }
    this.propertyForm.get('latitude').setValue(this.mapPoint.latitude);
    this.propertyForm.get('longitude').setValue(this.mapPoint.longitude);
  }
}
