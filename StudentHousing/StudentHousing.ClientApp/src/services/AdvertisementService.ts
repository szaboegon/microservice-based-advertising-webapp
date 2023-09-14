import axios from "axios";
import { AdvertisementCardDto } from "../models/advertisement/advertisementCardDto";
import { AdvertisementDetailsDto } from "../models/advertisement/advertisementDetailsDto";
import authHeader from "./auth/authHeader";
import {PagedQueryResponse} from "../models/pagedQueryResponse";

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

const findByUser = async (): Promise<AdvertisementCardDto[]> => {
  const response = await apiClient.get<AdvertisementCardDto[]>(
    "/private/advertisements_by_user",
    {
      headers: authHeader(),
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
