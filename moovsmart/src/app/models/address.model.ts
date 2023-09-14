export class AddressModel {
  constructor(
  public postcode: number,
  public city: string,
  public road: string,
  public house_number: number
  ) { }

  floor: number;
  door: string;
}
