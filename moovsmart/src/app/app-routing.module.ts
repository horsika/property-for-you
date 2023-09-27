import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PropertyListComponent} from "./components/property-list/property-list.component";
import {PropertyFormComponent} from "./components/property-form/property-form.component";
import {PropertyDetailsComponent} from "./components/property-details/property-details.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuard} from "./utils/auth.guard";
import {MyPageComponent} from "./components/my-page/my-page.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {InfoComponent} from "./components/info/info.component";
import {AdminPageComponent} from "./components/admin-page/admin-page.component";
import {AdminGuard} from "./utils/admin.guard";
import {PremiumComponent} from "./components/premium/premium.component";
import {PremiumGuard} from "./utils/premium.guard";
import {PaymentComponent} from "./components/payment/payment.component";

const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: "property-list", component: PropertyListComponent},
  {path: "property-form", component: PropertyFormComponent, canActivate: [AuthGuard]},
  {path: "property-form/:id", component: PropertyFormComponent, canActivate: [AuthGuard]},
  {path: "property-details/:id", component: PropertyDetailsComponent},
  {path: "register", component: RegisterComponent},
  {path: "my-page", component: MyPageComponent, canActivate: [AuthGuard]},
  {path: "homepage", component: HomepageComponent},
  {path: "verify-email/:token", component: InfoComponent},
  {path: "admin-page", component: AdminPageComponent, canActivate: [AdminGuard]},
  {path: "premium", component: PremiumComponent, canActivate: [PremiumGuard]},
  {path: "payment", component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
