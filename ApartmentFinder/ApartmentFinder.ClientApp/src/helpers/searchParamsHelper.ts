import { AdvertisementSearchParamsDto } from "../models/queryParams/advertisementSearchParamsDto";
import { PaginationParamsDto } from "../models/queryParams/paginationParamsDto";
import { OrderingParamsDto } from "../models/queryParams/orderingParamsDto";

const addSearchParams = (
  searchParams: URLSearchParams,
  paramsToAdd: AdvertisementSearchParamsDto,
) => {
  Object.entries(paramsToAdd).forEach(([key, value]) => {
    searchParams.set(key, value);
  });

  return searchParams;
};

const addPaginationParams = (
  searchParams: URLSearchParams,
  paramsToAdd?: PaginationParamsDto,
) => {
  if (paramsToAdd) {
    Object.entries(paramsToAdd).forEach(([key, value]) => {
      if (value != "") {
        searchParams.set(key, value);
      }
    });
  } else {
    searchParams.set("currentPage", "1");
    searchParams.set("pageItemCount", "12");
  }

  return searchParams;
};

const addOrderingParams = (
  searchParams: URLSearchParams,
  paramsToAdd: OrderingParamsDto,
) => {
  Object.entries(paramsToAdd).forEach(([key, value]) => {
    if (value != "") {
      searchParams.set(key, value);
    }
  });

  return searchParams;
};

const getCurrentPageFromParams = (params: URLSearchParams): number => {
  const stringValue = params.get("currentPage");
  return stringValue ? parseInt(stringValue) : 1;
};

const getOrderingFromParams = (params: URLSearchParams): OrderingParamsDto => {
  const sortOrder = params.get("sortOrder") ?? undefined;
  const sortColumn = params.get("sortColumn") ?? undefined;

  return { sortOrder: sortOrder, sortColumn: sortColumn };
};

const SearchParamsHelper = {
  addSearchParams,
  addPaginationParams,
  addOrderingParams,
  getCurrentPageFromParams,
  getOrderingFromParams,
};

export default SearchParamsHelper;
