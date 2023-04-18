import axios from "axios";
import jwtDecode from "jwt-decode";
import { LoginData } from "../formInterfaces/loginData";
import { RegistrationData } from "../formInterfaces/registrationData";
import { Session } from "../models/session";
import { TokenClaims } from "../models/tokenClaims";
import { User } from "../models/user";

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

const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  const decoded: TokenClaims = jwtDecode(token);
  const user: User = {
    firstName: decoded.firstName,
    lastName: decoded.lastName,
    userName: decoded.userName,
    email: decoded.email,
  };

  return user;
};

const register = async (registrationData: RegistrationData) => {
  return await apiClient.post("/register", registrationData);
};

const UserService = {
  login,
  logout,
  getCurrentUser,
  register,
};
export default UserService;
