import axios from "axios";
import { LoginData } from "../formInterfaces/loginData";
import { RegistrationData } from "../formInterfaces/registrationData";
import { User } from "../models/user";
import { AuthResponse } from "../models/authResponse";

const apiClient = axios.create({
  baseURL: "/api/user",
  headers: {
    "Content-type": "application/json",
  },
});

const login = async (loginData: LoginData): Promise<AuthResponse> => {
  return await apiClient.post("/login", loginData).then((response) => {
    if (response.data.token) {
      const user: User ={
        userName: response.data.userName,
        token: response.data.token
      }
      localStorage.setItem("user", JSON.stringify(user));
    }

    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () =>{
  const userStr = localStorage.getItem("user");
  if(userStr) return JSON.parse(userStr);

  return null;
}

const register = async (registrationData: RegistrationData) => {
  return await apiClient.post("/register", registrationData);
};

const UserService = {
  login,
  logout,
  getCurrentUser,
  register
};
export default UserService;
