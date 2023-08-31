import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PropertyService} from '../../services/property.service';
import {Router} from '@angular/router';
import {validationHandler} from '../../utils/validationHandler';
import {PropertyTypeFormListItemModel} from "../../models/property-type-form-list-item.model";
import {HeatingTypeFormListItemModel} from "../../models/heating-type-form-list-item.model";

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
      'name': [''],
      'numberOfBedrooms': [],
      'numberOfBathrooms': [],
      'price': [],
      'floorArea': [],
      'airConditioning': [],
      'description': [''],
      'images': [''],
      'address': [''],
      'propertyType': [],
      'heatingType': [],
      'listingStatus': [],
      'listingType': [],
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
      () => this.router.navigate(["property-list"]),
      error => validationHandler(error, this.propertyForm),
    );

  };



}
