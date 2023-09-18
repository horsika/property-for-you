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
      'address': [{value: '', disabled: true}, [Validators.required]],
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
        if(reader.result instanceof ArrayBuffer) {
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

    this.propertyService.createProperty(formData).subscribe(
      () => this.router.navigate(['/property-list'], {queryParams: {city: this.getCityFromAddress()}}),
      error => {
        validationHandler(error, this.propertyForm)
        this.errorMessage = errorHandler(error)
      },
      () => {
        this.router.navigate(['/my-page'], {queryParams: {showMyProperties: true}});
      }
    );

  };

  getCityFromAddress() {
    return this.propertyForm.get('address').value.split(' ')[1];
  }

  loadMapPoint(mapPointIncoming: MapPointModel) {
    this.mapPoint = mapPointIncoming;
    this.propertyForm.get('address').setValue(this.mapPoint.address);
    this.propertyForm.get('latitude').setValue(this.mapPoint.latitude);
    this.propertyForm.get('longitude').setValue(this.mapPoint.longitude);
  }
}
