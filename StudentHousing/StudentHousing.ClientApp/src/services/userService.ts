import axios from "axios";
import jwtDecode from "jwt-decode";
import { LoginRequest } from "../models/forms/loginRequest";
import { RegistrationRequest } from "../models/forms/registrationRequest";
import { Session } from "../models/session";
import { TokenClaims } from "../models/tokenClaims";
import { User } from "../models/user";
import authHeader from "./auth/authHeader";

const apiClient = axios.create({
  baseURL: "/api/user",
  headers: {
    "Content-type": "application/json",
  },
});

const login = async (loginData: LoginRequest): Promise<Session> => {
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

const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  const decoded: TokenClaims = jwtDecode(token);
  const user: User = {
    id: parseInt(decoded.sub),
    firstName: decoded.firstName,
    lastName: decoded.lastName,
    userName: decoded.userName,
    email: decoded.email,
  };

  return user;
};

const register = async (registrationData: RegistrationRequest) => {
  return await apiClient.post("/register", registrationData);
};

const getUserDetails = async (ids: URLSearchParams) => {
  const response = await apiClient.get<Array<User>>("/multiple_user_details?" + ids, {
    headers: authHeader(),
  });
  return response.data;
};

const UserService = {
  login,
  logout,
  getCurrentUser,
  register,
  getUserDetails,
};
export default UserService;
