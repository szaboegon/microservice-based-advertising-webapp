import axios from "axios";
import { AdvertisementCardData } from "../models/advertisementCardData.";
import { AdvertisementDetailsData } from "../models/advertisementDetailsDatal";
import authHeader from "./auth/authHeader";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
  },
});

const formDataClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "multipart/form-data",
  },
});

const findBySearchParams = async (
  searchParams: URLSearchParams
): Promise<AdvertisementCardData[]> => {
  const response = await apiClient.get<AdvertisementCardData[]>(
    "/advertisement?" + searchParams
  );
  return response.data;
};

const findById = async (id: number): Promise<AdvertisementDetailsData> => {
  const response = await apiClient.get<AdvertisementDetailsData>(
    `/advertisement/${id}`
  );
  return response.data;
};

const create = async (newAdvertisement: FormData) => {
  const response = await formDataClient.post<FormData>(
    "/advertisement/private",
    newAdvertisement,
    { headers: authHeader() }
  );
  return response.data;
};

const AdvertisementService = {
  findBySearchParams,
  findById,
  create,
};

export default AdvertisementService;
