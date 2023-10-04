import { AuthTokens } from "../models/authTokens";
import axios from "axios";

const getLocalAccessToken = (): string | null => {
  const tokenString = localStorage.getItem("accessToken");
  if (tokenString) {
    return JSON.parse(tokenString);
  } else {
    return null;
  }
};

const setLocalAccessToken = (accessToken: string) => {
  const tokenString = JSON.stringify(accessToken);
  localStorage.setItem("accessToken", tokenString);
};

const getLocalRefreshToken = (): string | null => {
  const tokenString = localStorage.getItem("refreshToken");
  if (tokenString) {
    return JSON.parse(tokenString);
  } else {
    return null;
  }
};

const setLocalRefreshToken = (refreshToken: string) => {
  const tokenString = JSON.stringify(refreshToken);
  localStorage.setItem("refreshToken", tokenString);
};

const deleteTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const refreshTokens = async (): Promise<AuthTokens | null> => {
  const accessToken = TokenHelper.getLocalAccessToken();
  const refreshToken = TokenHelper.getLocalRefreshToken();
  if (!accessToken || !refreshToken) {
    return null;
  }
  const refreshTokenRequest = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  console.log(refreshTokenRequest);
  return await axios
    .post<AuthTokens>("api/user/refresh_token", refreshTokenRequest)
    .then((response) => {
      if (response.data.accessToken && response.data.refreshToken) {
        TokenHelper.setLocalAccessToken(response.data.accessToken);
        TokenHelper.setLocalRefreshToken(response.data.refreshToken);

        return response.data;
      }
      return null;
    });
};

const refreshExpiredTokenClosure = () => {
  let isCalled = false;
  let runningPromise: Promise<AuthTokens | null> | undefined = undefined;
  return () => {
    if (isCalled) {
      return runningPromise;
    } else {
      isCalled = true;
      runningPromise = refreshTokens();
      return runningPromise;
    }
  };
};

const TokenHelper = {
  getLocalAccessToken,
  setLocalAccessToken,
  getLocalRefreshToken,
  setLocalRefreshToken,
  refreshExpiredTokenClosure,
};

export default TokenHelper;
