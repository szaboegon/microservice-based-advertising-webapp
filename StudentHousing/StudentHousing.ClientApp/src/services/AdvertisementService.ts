import axios from "axios";
import { AdvertisementCardData } from "../models/advertisement/advertisementCardData.";
import { AdvertisementDetailsData } from "../models/advertisement/advertisementDetailsDatal";
import { AdvertisementListItemData } from "../models/advertisement/advertisementListItemData";
import authHeader from "./auth/authHeader";

const apiClient = axios.create({
  baseURL: "/api/advertisement",
  headers: {
    "Content-type": "application/json",
  },
});

const formDataClient = axios.create({
  baseURL: "/api/advertisement",
  headers: {
    "Content-type": "multipart/form-data",
  },
});

const findBySearchParams = async (
  searchParams: URLSearchParams
): Promise<AdvertisementCardData[]> => {
  const response = await apiClient.get<AdvertisementCardData[]>(
    "/public/advertisement-cards?" + searchParams
  );
  return response.data;
};

const findById = async (id: number): Promise<AdvertisementDetailsData> => {
  const response = await apiClient.get<AdvertisementDetailsData>(
    `/public/advertisement-details/${id}`
  );
  return response.data;
};

const create = async (newAdvertisement: FormData) => {
  const response = await formDataClient.post<FormData>(
    "/private/advertisements",
    newAdvertisement,
    { headers: authHeader() }
  );
  return response.data;
};

const remove = async (id: number) => {
  const response = await apiClient.delete(`/private/advertisements/${id}`, {
    headers: authHeader(),
  });
  return response.data;
};

const findByUser = async (): Promise<AdvertisementListItemData[]> => {
  const response = await apiClient.get<AdvertisementListItemData[]>(
    "/private/advertisements-by-user",
    {
      headers: authHeader(),
    }
  );
  return response.data;
};

const getLatests = async (count: number) => {
  const response = await apiClient.get<AdvertisementListItemData[]>(
    `/public/latest-advertisements/${count}`
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
