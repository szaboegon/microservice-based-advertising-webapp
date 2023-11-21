export interface AdvertisementInfo {
  id: number;
  categoryName: string;
  city: string;
  district?: string;
  streetName: string;
  streetNumber?: string;
  monthlyPrice: number;
  numberOfRooms: number;
  size: number;
  uploadDate: string;
  image: Uint8Array;
}
