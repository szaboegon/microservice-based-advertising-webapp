export interface AdvertisementCardData{
    id: number,
    categoryName: string,
    postalCode: number,
    city: string,
    district?: string,
    streetName: string,
    streetNumber: string,
    monthlyPrice: number,
    numberOfRooms: number,
    size: number
    image: Uint8Array
}