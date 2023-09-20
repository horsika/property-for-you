import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PropertyService} from '../../services/property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {errorHandler, validationHandler} from '../../utils/validationHandler';
import {PropertyTypeFormListItemModel} from "../../models/property-type-form-list-item.model";
import {HeatingTypeFormListItemModel} from "../../models/heating-type-form-list-item.model";
import {validateNumberOfBathrooms} from "../../utils/custom.validators";
import {MapPointModel} from "../../models/map-point.model";
import {PropertyEditDetailsModel} from "../../models/property-edit-details.model";

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
  imagesFromServer: string[] = [];
  initialMapPoint: MapPointModel;
  editablePropertyId: number;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private propertyService: PropertyService,
              private router: Router,
              private route: ActivatedRoute) {
    this.propertyForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(3)]],
      'numberOfBedrooms': ['', [Validators.required, Validators.min(1)]],
      'numberOfBathrooms': ['', [Validators.required, Validators.min(1), validateNumberOfBathrooms]],
      'price': ['', [Validators.required, Validators.min(0.1)]],
      'floorArea': ['', [Validators.required, Validators.min(5)]],
      'airConditioning': [false],
      'description': ['', [Validators.required, Validators.maxLength(600), Validators.minLength(50)]],
      'images': this.formBuilder.array([]),
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
    this.route.paramMap.subscribe(idFromParam => {
      const id = idFromParam.get('id');
      if (id) {
        this.getEditablePropertyInfo(+id);
      }
    });

    this.propertyService.getFormOptions().subscribe({
      next: response => {
        this.propertyTypeList = response.propertyTypes;
        this.heatingTypeList = response.heatingTypes;
      },
      error: err => console.warn(err),
    });
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

  loopThruFormControls(formData: FormData) {

    Object.keys(this.propertyForm.controls).forEach((key) => {
      const control = this.propertyForm.get(key);

      if (control instanceof FormControl) {
        if(control.value == null) {
          formData.append(key, '0');
        } else {
          formData.append(key, control.value);
        }

      } else if (control instanceof FormArray) {
        for (const fileControl of control.controls) {
          formData.append('images', fileControl.value);
        }
      }
    });
  }


  submit = () => {
    const formData = new FormData();
    this.loopThruFormControls(formData);

    this.loading = true;
    this.propertyService.createProperty(formData).subscribe(
      () => {
      },
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
    } else {
      this.propertyForm.get('postcode').setValue(this.mapPoint.address.postcode);
      this.propertyForm.get('city').setValue(this.mapPoint.address.city);
      this.propertyForm.get('road').setValue(this.mapPoint.address.road);
    }
    this.propertyForm.get('latitude').setValue(this.mapPoint.latitude);
    this.propertyForm.get('longitude').setValue(this.mapPoint.longitude);
  }

  //edit stuff ----------------------------------------------------------------------------

  getEditablePropertyInfo(id: number) {
    this.propertyService.getEditablePropertyInfo(id).subscribe((response: PropertyEditDetailsModel) => {
      this.propertyForm.patchValue({
        name: response.name,
        numberOfBedrooms: response.numberOfBedrooms,
        numberOfBathrooms: response.numberOfBathrooms,
        price: response.price,
        floorArea: response.floorArea,
        airConditioning: response.airConditioning,
        description: response.description,
        postcode: response.postcode,
        city: response.city,
        road: response.road,
        house_number: response.house_number,
        floor: response.floor,
        door: response.door,
        propertyType: response.propertyType,
        heatingType: response.heatingType,
        listingType: response.listingType,
        latitude: response.latitude,
        longitude: response.longitude
      })

      this.editablePropertyId = response.id;

      this.initialMapPoint = {
        address: {
          postcode: response.postcode,
          city: response.city,
          road: response.road,
          house_number: response.house_number,
          floor: response.floor,
          door: response.door
        },
        latitude: response.latitude,
        longitude: response.longitude
      };

      this.imagesFromServer = response.images;
    })
  }

  edit = () => {
    const formData = new FormData();
    this.loopThruFormControls(formData);
    this.loading = true;
    // console.log(formData.get('images'));
    this.propertyService.editProperty(formData, this.editablePropertyId).subscribe(
      () => {
      },
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

  logFormData(formData: FormData) {
    formData.forEach((value, key) => {
      console.log(key, value);
    });
  }
}
