import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {PropertyFormComponent} from './components/property-form/property-form.component';
import {PropertyDetailsComponent} from './components/property-details/property-details.component';
import {PropertyListComponent} from './components/property-list/property-list.component';
import { RegisterComponent } from './components/register/register.component';
import {AuthInterceptor} from "./utils/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PropertyFormComponent,
    PropertyDetailsComponent,
    PropertyListComponent,
    RegisterComponent
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
