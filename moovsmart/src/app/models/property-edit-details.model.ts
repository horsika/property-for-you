export interface PropertyEditDetailsModel {
  id: number;
  name: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  price: number;
  floorArea: number;
  airConditioning: boolean;
  description: string;
  longitude: number;
  latitude: number;
  images: string[] | null;
  postcode: number;
  city: string;
  road: string;
  house_number: string;
  floor: number | null;
  door: string | null;
  propertyType: string;
  heatingType: string;
  listingType: string;
}
