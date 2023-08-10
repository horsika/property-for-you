export interface PropertyDetailsModel {
  id: number;
  name: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  priceHistory: number[];
  floorArea: number;
  airConditioning: boolean;
  images: string[];
}
