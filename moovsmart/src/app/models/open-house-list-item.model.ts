export interface OpenHouseListItemModel {

  openHouseId: number;
  propertyId: number;
  fromTime: Date;
  toTime: Date;
  maxParticipants: number;
  currentParticipants: number;
}
