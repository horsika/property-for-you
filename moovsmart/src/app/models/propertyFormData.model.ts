export interface PropertyFormDataModel {
  name: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  price: number;
  floorArea: number;
  description: string;
  images: File[];
  airConditioning: boolean;
  address: string;
  propertyType: string;
  heatingType: string;
  listingStatus: string;
  listingType: string;
}
