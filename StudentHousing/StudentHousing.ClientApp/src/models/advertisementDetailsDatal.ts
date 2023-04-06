export interface AdvertisementDetailsData{
    id: number,
    categoryName: string,
    region: string,
    postalCode: number,
    city: string,
    district?: string,
    streetName: string,
    streetNumber: string,
    unitNumber: string,
    numberOfRooms:number,
    size: number,
    furnished: boolean,
    parking: boolean,
    description: string,
    monthlyPrice: number,
    image: Uint8Array
}