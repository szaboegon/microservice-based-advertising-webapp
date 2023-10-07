export interface AdvertisementDetailsDto {
  id: number;
  categoryName: string;
  region: string;
  postalCode: number;
  city: string;
  district?: string;
  streetName: string;
  streetNumber: string;
  unitNumber: string;
  numberOfRooms: number;
  size: number;
  furnished: boolean;
  parking: boolean;
  description: string;
  monthlyPrice: number;
  images: Uint8Array[];
  advertiserId: number;
}
