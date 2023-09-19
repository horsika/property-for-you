import {AddressModel} from "./address.model";

export class NominatimResponseModel {
  constructor(
    public latitude: number,
    public longitude: number,
    public displayName: string
  ) { }
}
