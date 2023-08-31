import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PropertyFormComponent} from './components/property-form/property-form.component';
import {PropertyDetailsComponent} from './components/property-details/property-details.component';
import {PropertyListComponent} from './components/property-list/property-list.component';
import { FooterComponent } from './components/footer/footer.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {MapComponent} from './components/map/map.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthInterceptor} from "./utils/auth.interceptor";
import { SearchCityComponent } from './components/search-city/search-city.component';
import { HomepageComponent } from './components/homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PropertyFormComponent,
    PropertyDetailsComponent,
    PropertyListComponent,
    FooterComponent,
    CarouselComponent,
    MapComponent,
    RegisterComponent,
    SearchCityComponent,
    HomepageComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
