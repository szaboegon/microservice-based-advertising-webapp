import {AdvertisementSearchParamsDto} from "../models/queryParams/advertisementSearchParamsDto";
import {PaginationParamsDto} from "../models/queryParams/paginationParamsDto";

const addSearchParams = (searchParams: URLSearchParams, paramsToAdd: AdvertisementSearchParamsDto) => {
    Object.entries(paramsToAdd)
        .forEach(([key, value]) => {
            searchParams.set(key, value);
        });

    return searchParams;
}

const addPaginationParams = (searchParams: URLSearchParams, paramsToAdd?: PaginationParamsDto) => {
    if (paramsToAdd) {
        Object.entries(paramsToAdd)
            .forEach(([key, value]) => {
                if (value != "") {
                    searchParams.set(key, value);
                }
            });
    } else {
        searchParams.set("currentPage", "1");
        searchParams.set("pageItemCount", "12");
    }

    return searchParams;
}

const SearchParamsHelper = {
    addSearchParams,
    addPaginationParams
}

export default SearchParamsHelper;