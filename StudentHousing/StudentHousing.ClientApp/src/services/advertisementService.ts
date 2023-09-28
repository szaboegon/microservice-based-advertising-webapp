import { AdvertisementCardDto } from "../models/advertisement/advertisementCardDto";
import { AdvertisementDetailsDto } from "../models/advertisement/advertisementDetailsDto";
import {PagedQueryResponse} from "../models/pagedQueryResponse";
import InterceptorApiClient from "../helpers/interceptorApiClient";

const apiClient = InterceptorApiClient.createInstance(
   "/api/advertisement",
   {
    "Content-type": "application/json",
    },
);

const formDataClient = InterceptorApiClient.createInstance(
   "/api/advertisement",
   {
    "Content-type": "multipart/form-data",
  },
);

const findBySearchParams = async (
  searchParams: URLSearchParams
): Promise<PagedQueryResponse<AdvertisementCardDto>> => {
  const response = await apiClient.get<PagedQueryResponse<AdvertisementCardDto>>(
    "/public/advertisement_cards?" + searchParams
  );
  return response.data;
};

const findById = async (id: number): Promise<AdvertisementDetailsDto> => {
  const response = await apiClient.get<AdvertisementDetailsDto>(
    `/public/advertisement_details/${id}`
  );
  return response.data;
};

const create = async (newAdvertisement: FormData) => {
  const response = await formDataClient.post<FormData>(
    "/private/advertisements",
    newAdvertisement,
  );
  return response.data;
};

const remove = async (id: number) => {
  const response = await apiClient.delete(`/private/advertisements/${id}`, {
  });
  return response.data;
};

const findByUser = async (): Promise<AdvertisementCardDto[]> => {
  const response = await apiClient.get<AdvertisementCardDto[]>(
    "/private/advertisements_by_user",
    {
    }
  );
  return response.data;
};

const getLatests = async (count: number) => {
  const response = await apiClient.get<AdvertisementCardDto[]>(
    `/public/latest_advertisements/${count}`
  );
  return response.data;
};

const AdvertisementService = {
  findBySearchParams,
  findById,
  findByUser,
  create,
  remove,
  getLatests,
};

export default AdvertisementService;
