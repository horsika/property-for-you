import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
            'airConditioning': [],
            'description': ['', [Validators.required, Validators.maxLength(600), Validators.minLength(50)]],
            'images': [''],
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

    submit = () => {
        this.propertyService.createProperty(this.propertyForm.value).subscribe(
            () => this.router.navigate(['/property-list'], {queryParams: {city: this.getCityFromAddress()}}),
            error => validationHandler(error, this.propertyForm),
        );

    };

    getCityFromAddress() {
        return this.propertyForm.get('address').value.split(' ')[1];
    }
}
