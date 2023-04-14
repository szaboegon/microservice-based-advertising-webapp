import axios from "axios";
import { LoginData } from "../formInterfaces/loginData";
import { RegistrationData } from "../formInterfaces/registrationData";
import { Session } from "../models/session";
import { User } from "../models/user";
import authHeader from "./auth/authHeader";

const apiClient = axios.create({
  baseURL: "/api/user",
  headers: {
    "Content-type": "application/json",
  },
});

const login = async (loginData: LoginData): Promise<Session> => {
  return await apiClient.post("/login", loginData).then((response) => {
    if (response.data.token) {
      localStorage.setItem("token", JSON.stringify(response.data.token));
    }

    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUserToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const getCurrentUser = async (): Promise<User> => {
  const respone = await apiClient.get("/currentuser", {
    headers: authHeader(),
  });
  return respone.data;
};

const register = async (registrationData: RegistrationData) => {
  return await apiClient.post("/register", registrationData);
};

const UserService = {
  login,
  logout,
  getCurrentUserToken,
  getCurrentUser,
  register,
};
export default UserService;
