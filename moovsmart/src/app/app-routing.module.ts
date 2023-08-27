import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PropertyListComponent} from "./components/property-list/property-list.component";
import {PropertyFormComponent} from "./components/property-form/property-form.component";
import {PropertyDetailsComponent} from "./components/property-details/property-details.component";
import {RegisterComponent} from "./components/register/register.component";
import {SearchCityComponent} from "./components/search-city/search-city.component";
import {HomepageComponent} from "./components/homepage/homepage.component";

const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: "property-list", component: PropertyListComponent},
  {path: "property-form", component: PropertyFormComponent},
  {path: "property-details/:id", component: PropertyDetailsComponent},
  {path: "register", component: RegisterComponent},
  {path: "homepage", component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
