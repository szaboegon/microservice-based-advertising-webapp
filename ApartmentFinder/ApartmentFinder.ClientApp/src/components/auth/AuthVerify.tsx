//https://www.bezkoder.com/handle-jwt-token-expiration-react/
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TokenClaims } from "../../models/tokenClaims";
import TokenHelper from "../../helpers/tokenHelper";
import InterceptorApiClient from "../../helpers/interceptorApiClient";
import UserService from "../../services/userService";
import { AxiosError } from "axios";
import useAccessToken from "../../hooks/useAccessToken";

interface AuthVerifyProps {
  logout: Function;
}
export const AuthVerify: React.FunctionComponent<AuthVerifyProps> = ({
  logout,
}) => {
  let location = useLocation();
  const { accessToken, setAccessToken } = useAccessToken();

  useEffect(() => {
    const currentToken = TokenHelper.getLocalAccessToken();
    if (!currentToken) {
      return;
    }
    const decodedJwt: TokenClaims = jwtDecode(currentToken);
    setAccessToken(currentToken);
    if (decodedJwt.exp * 1000 < Date.now()) {
      UserService.checkAuth()
        .then((isAuthenticated) => {
          if (!isAuthenticated) {
            logout();
          }
        })
        .catch((error) => {
          if (
            error instanceof AxiosError &&
            error.response?.data == "Token expired"
          ) {
            logout();
          }
        });
    }
  }, [location]);

  return <></>;
};
