import {AuthTokens} from "../models/authTokens";
import axios from "axios";

const getLocalAccessToken = (): string | null => {
    return localStorage.getItem("accessToken");
}

const setLocalAccessToken = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
}

const getLocalRefreshToken = (): string | null => {
    return localStorage.getItem("refreshToken");
}

const setLocalRefreshToken = (refreshToken: string) => {
    localStorage.setItem("refreshToken", refreshToken);
}

const deleteTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

const refreshTokens = async (): Promise<AuthTokens | null> => {
    const accessToken = TokenHelper.getLocalAccessToken();
    const refreshToken = TokenHelper.getLocalRefreshToken();
    if (!accessToken || !refreshToken) {
        return null;
    }
    const refreshTokenRequest =  {
        accessToken: JSON.parse(accessToken),
        refreshToken: JSON.parse(refreshToken)
    }
    console.log(refreshTokenRequest)
    return await axios.post<AuthTokens>("api/user/refresh_token", refreshTokenRequest)
        .then((response) => {
            let newAccessToken: string
            if (response.data.accessToken && response.data.refreshToken) {
                TokenHelper.setLocalAccessToken(JSON.stringify(response.data.accessToken));
                TokenHelper.setLocalRefreshToken(JSON.stringify(response.data.refreshToken));

                return response.data;
            }
            return null
        });
}

const TokenHelper = {
    getLocalAccessToken,
    setLocalAccessToken,
    getLocalRefreshToken,
    setLocalRefreshToken,
    refreshTokens
}

export default TokenHelper;