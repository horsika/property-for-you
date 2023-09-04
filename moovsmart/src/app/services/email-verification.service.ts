import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

  const BASE_URL = environment.BASE_URL + '/api/auth';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {

  constructor(private http: HttpClient) { }

  verifyEmail(token: string) {
    return this.http.get(BASE_URL + '/' + token);
  }
}
