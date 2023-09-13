import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NominatimResponseModel} from "../models/nominatimResponse.model";
import {map} from "rxjs/operators";


const BASE_NOMINATIM_URL: string = 'nominatim.openstreetmap.org';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  constructor(private http: HttpClient) {

  }

  addressLookup(req?: any): Observable<NominatimResponseModel[]> {
    let url = `https://${BASE_NOMINATIM_URL}/search?format=json&q=${req}`;
    return this.http
      .get(url).pipe(
        map<any, NominatimResponseModel[]>((data: any[]) => data.map((item: any) => new NominatimResponseModel(
            item.lat,
            item.lon,
            item.display_name
          ))
        )
      )
  }

}
