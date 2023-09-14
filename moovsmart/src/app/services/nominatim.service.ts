import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NominatimResponseModel} from "../models/nominatimResponse.model";
import {map} from "rxjs/operators";
import {AddressModel} from "../models/address.model";


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
      );
  }

  coordLookup(lat?: any, lon?: any): Observable<AddressModel> {
    let url = `https://${BASE_NOMINATIM_URL}/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    return this.http
      .get(url).pipe(
        map((data: any) => new AddressModel(
          data.address.postcode,
          data.address.city,
          data.address.road,
          data.address.house_number
        ))
      );
  }

}
