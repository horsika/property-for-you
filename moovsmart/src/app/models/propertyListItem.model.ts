export interface PropertyListItemModel {
  propertyId: number;
  name: string;
  numberOfBedrooms: number;
  floorArea: number;
  propertyTypeDisplayName: string;
  images: string[];
  numberOfBathrooms: number;
  airConditioning: boolean;
  heatingType: string;
  price: number;
  activatedAt: Date;
  formattedActivatedAt: string;
  listingTypeDisplayName: string;

}
