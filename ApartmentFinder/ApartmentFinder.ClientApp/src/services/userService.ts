import axios from "axios";
import jwtDecode from "jwt-decode";
import {LoginRequest} from "../models/requests/loginRequest";
import {RegistrationRequest} from "../models/requests/registrationRequest";
import {AuthTokens} from "../models/authTokens";
import {TokenClaims} from "../models/tokenClaims";
import {User} from "../models/user";
import TokenHelper from "../helpers/tokenHelper";
import InterceptorApiClient from "../helpers/interceptorApiClient";

const apiClient = axios.create({
    baseURL: "/api/user",
    headers: {
        "Content-type": "application/json",
    },
});

const interceptorClient = InterceptorApiClient.createInstance("/api/user", {
    "Content-type": "application/json",
});

const checkAuth = async (): Promise<boolean> => {
    const response = await interceptorClient.get("/auth");
    return response.status == 200;
};

const login = async (loginData: LoginRequest): Promise<AuthTokens> => {
    let response = await apiClient.post("/login", loginData);
    if (response.data.accessToken && response.data.refreshToken) {
        TokenHelper.setLocalAccessToken(response.data.accessToken);
        TokenHelper.setLocalRefreshToken(response.data.refreshToken);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("accessToken");
};

const getCurrentUser = () => {
    const accessToken = TokenHelper.getLocalAccessToken();
    if (!accessToken) {
        return;
    }
    const decoded: TokenClaims = jwtDecode(accessToken);
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
    const response = await apiClient.get<Array<User>>(
        "/multiple_user_details?" + ids,
        {},
    );
    return response.data;
};

const UserService = {
    checkAuth,
    login,
    logout,
    getCurrentUser,
    register,
    getUserDetails,
};
export default UserService;
