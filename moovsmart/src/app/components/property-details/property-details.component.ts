import {Component, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {PropertyDetailsModel} from "../../models/propertyDetails.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-property-details',
    templateUrl: './property-details.component.html',
    styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

    propertyId: number;
    property: PropertyDetailsModel = {
        id: -1,
        name: '-',
        numberOfBedrooms: -1,
        numberOfBathrooms: -1,
        priceHistory: [],
        floorArea: -1,
        airConditioning: false,
        images: [],
        address: '-',
        description: '-',
        heatingType: '-',
        propertyType: '-',
    };

    constructor(private propertyService: PropertyService,
                private route: ActivatedRoute,) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe({
            next: value => {
                const idFromParamMap = Number(value.get('id'));
                if (idFromParamMap) {
                    this.propertyId = idFromParamMap;
                }
            },
            error: err => console.warn(err),

            // complete: () =>
        })

        this.propertyService.getPropertyById(this.propertyId).subscribe({
            next: value => this.property = value,
            error: err => console.warn(err),
            complete: () => {
                console.log(this.property);
                while (this.property.address.includes('null')) {
                    this.property.address = this.property.address.replace('null', '');
                }
            }
        });
    }
}
