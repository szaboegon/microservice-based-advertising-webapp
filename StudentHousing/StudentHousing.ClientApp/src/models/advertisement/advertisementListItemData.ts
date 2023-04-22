export interface AdvertisementListItemData {
  id: number;
  categoryName: string;
  postalCode: number;
  city: string;
  streetName: string;
  streetNumber: string;
  uploadDate: Date;
  image: Uint8Array;
}
