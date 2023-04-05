import axios from "axios";
import { AdvertisementCardData } from "../models/advertisementCardData.model";
import { AdvertisementDetailsData } from "../models/advertisementDetailsData.model";

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
    "/advertisement",
    newAdvertisement
  );
  return response.data;
};

const AdvertisementService = {
  findBySearchParams,
  findById,
  create,
};

export default AdvertisementService;
