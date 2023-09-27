import {Component, OnInit} from '@angular/core';
import {PropertyListItemModel} from "../../models/propertyListItem.model";
import {PremiumService} from "../../services/premium.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {

  activePage: string;
  newProperties: PropertyListItemModel[];
  filters: FormGroup;
  showPropertiesList = false;

  constructor(private premiumService: PremiumService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.filters = formBuilder.group({
      listingType: ['ALL'],
      propertyType: ['ALL']
    })
  }

  ngOnInit(): void {
  }

  showNewProperties() {
    if (this.activePage === 'NewProperties') {
      this.activePage = null;
    } else {
      this.activePage = 'NewProperties';
    }
    this.resetFormControls();

  }

  viewNewProperties() {
    const data = this.filters.value;
    this.premiumService.viewActiveNewPropertyList(data).subscribe(resp => {
      this.newProperties = resp;
    });
  }


  previewProperty(id: number) {
    this.router.navigate(['property-details', id]);
  }

  resetFormControls() {
    this.filters.patchValue({
      listingType: 'ALL',
      propertyType: 'ALL'
    });
  }

  calculateDateDifference(property: PropertyListItemModel) {
    const currentDate = new Date();
    const activatedAtDate = new Date(property.activatedAt);
    const timeDifference = Math.abs(currentDate.getTime() - activatedAtDate.getTime());
    return Math.ceil(timeDifference / (1000 * 3600 * 24)); //difference in days
  }

  goToMyChats() {
    this.router.navigate(['/my-chats'])
  }
}
