import {AddressModel} from "./address.model";

export interface PropertyFormDataModel {
  name: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  price: number;
  floorArea: number;
  description: string;
  images: string[];
  airConditioning: boolean;
  address: AddressModel;
  propertyType: string;
  heatingType: string;
  listingStatus: string;
  listingType: string;
}
