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
import {FooterComponent} from './components/footer/footer.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {MapComponent} from './components/map/map.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthInterceptor} from "./utils/auth.interceptor";
import {SearchCityComponent} from './components/search-city/search-city.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {MyPageComponent} from './components/my-page/my-page.component';
import {InfoComponent} from './components/info/info.component';
import {AdminPageComponent} from './components/admin-page/admin-page.component';
import {GeocodingComponent} from './components/geocoding/geocoding.component';
import {AddressMapComponent} from './components/address-map/address-map.component';
import {ResultsListComponent} from './components/results-list/results-list.component';
import {MapPointFormComponent} from './components/map-point-form/map-point-form.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";

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
    HomepageComponent,
    MyPageComponent,
    InfoComponent,
    AdminPageComponent,
    GeocodingComponent,
    AddressMapComponent,
    ResultsListComponent,
    MapPointFormComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LeafletModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
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
