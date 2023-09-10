import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PropertyService} from '../../services/property.service';
import {Router} from '@angular/router';
import {validationHandler} from '../../utils/validationHandler';
import {PropertyTypeFormListItemModel} from "../../models/property-type-form-list-item.model";
import {HeatingTypeFormListItemModel} from "../../models/heating-type-form-list-item.model";
import {validateNumberOfBathrooms} from "../../utils/custom.validators";

@Component({
    selector: 'app-property-form',
    templateUrl: './property-form.component.html',
    styleUrls: ['./property-form.component.css'],
})
export class PropertyFormComponent implements OnInit {

    propertyForm: FormGroup;
    propertyTypeList: PropertyTypeFormListItemModel[];
    heatingTypeList: HeatingTypeFormListItemModel[];

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
            'images': this.formBuilder.array([]),
            'address': ['', [Validators.required]],
            'propertyType': ['', Validators.required],
            'heatingType': ['', Validators.required],
            'listingStatus': [''],
            'listingType': ['', Validators.required],
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
    if (event?.target?.files?.length > 0) {
      const images = event.target.files;
      const imageControls = this.propertyForm.get('images') as FormArray;

      for (const image of images) {
        const fileControl = new FormControl(image);
        imageControls.push(fileControl);
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
        } else if(control instanceof FormArray){
          for (const fileControl of control.controls) {
            formData.append('images', fileControl.value);
          }
        }
      });

        this.propertyService.createProperty(formData).subscribe(
            () => this.router.navigate(['/property-list'], {queryParams: {city: this.getCityFromAddress()}}),
            error => validationHandler(error, this.propertyForm),
        );

    };

    getCityFromAddress() {
        return this.propertyForm.get('address').value.split(' ')[1];
    }
}
