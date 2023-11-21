import { AdvertisementSearchParams } from "../models/queryParams/advertisementSearchParams";
import { PaginationParams } from "../models/queryParams/paginationParams";
import { OrderingParams } from "../models/queryParams/orderingParams";

const addSearchParams = (
  searchParams: URLSearchParams,
  paramsToAdd: AdvertisementSearchParams,
) => {
  Object.entries(paramsToAdd).forEach(([key, value]) => {
    searchParams.set(key, value);
  });

  return searchParams;
};

const addPaginationParams = (
  searchParams: URLSearchParams,
  paramsToAdd?: PaginationParams,
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
  paramsToAdd: OrderingParams,
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

const getOrderingFromParams = (params: URLSearchParams): OrderingParams => {
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
