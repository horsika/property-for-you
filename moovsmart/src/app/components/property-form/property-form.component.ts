import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PropertyService} from '../../services/property.service';
import {Router} from '@angular/router';
import {validationHandler} from '../../utils/validationHandler';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css'],
})
export class PropertyFormComponent implements OnInit {

  propertyForm: FormGroup;
  propertyTypeList: any;
  heatingTypeList: any;

  constructor(private formBuilder: FormBuilder,
              private propertyService: PropertyService,
              private router: Router) {
    this.propertyForm = this.formBuilder.group({
      'name': [''],
      'numberOfBedrooms': [],
      'numberOfBathrooms': [],
      'price': [],
      'floorArea': [],
      'airConditioning': [false],
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
  }

  submit = () => {
    this.propertyService.createProperty(this.propertyForm.value).subscribe(
      () => this.router.navigate(["property-list"]),
      error => validationHandler(error, this.propertyForm),
    );

  };



}
