export interface PropertyDetailsModel {
  id: number;
  name: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  priceHistory: number[];
  floorArea: number;
  airConditioning: boolean;
  images: string[];
  address: string;
  description: string;
  heatingType: string;
  propertyType: string;
}
