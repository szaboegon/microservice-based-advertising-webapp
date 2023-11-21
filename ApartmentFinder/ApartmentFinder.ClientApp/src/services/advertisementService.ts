import { AdvertisementInfo } from "../models/advertisement/advertisementInfo";
import { Advertisement } from "../models/advertisement/advertisement";
import { PagedQueryResponse } from "../models/pagedQueryResponse";
import InterceptorApiClient from "../helpers/interceptorApiClient";

const apiClient = InterceptorApiClient.createInstance("/api/advertisement", {
  "Content-type": "application/json",
});

const formDataClient = InterceptorApiClient.createInstance(
  "/api/advertisement",
  {
    "Content-type": "multipart/form-data",
  },
);

const findBySearchParams = async (
  searchParams: URLSearchParams,
): Promise<PagedQueryResponse<AdvertisementInfo>> => {
  const response = await apiClient.get<PagedQueryResponse<AdvertisementInfo>>(
    "/public/advertisement_cards?" + searchParams,
  );
  return response.data;
};

const findById = async (id: number): Promise<Advertisement> => {
  const response = await apiClient.get<Advertisement>(
    `/public/advertisement_details/${id}`,
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
  const response = await apiClient.delete(`/private/advertisements/${id}`, {});
  return response.data;
};

const findByUser = async (): Promise<AdvertisementInfo[]> => {
  const response = await apiClient.get<AdvertisementInfo[]>(
    "/private/advertisements_by_user",
    {},
  );
  return response.data;
};

const getLatests = async (count: number) => {
  const response = await apiClient.get<AdvertisementInfo[]>(
    `/public/latest_advertisements/${count}`,
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
