import axios from "axios";
import { LoginData } from "../formInterfaces/loginData";
import { RegistrationData } from "../formInterfaces/registrationData";
import { Session } from "../models/session";

const apiClient = axios.create({
  baseURL: "/api/user",
  headers: {
    "Content-type": "application/json",
  },
});

const login = async (loginData: LoginData): Promise<Session> => {
  return await axios.post("/login", loginData).then((response) => {
    if (response.data.jwtToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = async (registrationData: RegistrationData) => {};

const UserService = {
  login,
  logout,
  register,
};
export default UserService;
