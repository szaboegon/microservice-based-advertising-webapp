import { AdvertisementInfo } from "./advertisement/advertisementInfo";

export interface PagedQueryResponse<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  pageItemCount: number;
  totalItemCount: number;
}
