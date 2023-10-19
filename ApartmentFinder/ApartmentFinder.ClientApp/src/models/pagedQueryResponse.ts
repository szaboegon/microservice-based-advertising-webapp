import {AdvertisementCardDto} from "./advertisement/advertisementCardDto";

export interface PagedQueryResponse<T>{
    items: T[]
    currentPage: number,
    totalPages: number,
    pageItemCount: number,
    totalItemCount: number
}