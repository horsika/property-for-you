import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  isAdmin = new Subject<boolean>();
  constructor(private http: HttpClient) { }



}
