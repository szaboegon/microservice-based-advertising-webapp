//https://www.bezkoder.com/handle-jwt-token-expiration-react/
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TokenClaims } from "../../models/tokenClaims";
import TokenHelper from "../../helpers/tokenHelper";
import InterceptorApiClient from "../../helpers/interceptorApiClient";
import UserService from "../../services/userService";
import { AxiosError } from "axios";

interface AuthVerifyProps {
  logout: Function;
}

export const AuthVerify: React.FunctionComponent<AuthVerifyProps> = ({
  logout,
}) => {
  let location = useLocation();

  useEffect(() => {
    const token = TokenHelper.getLocalAccessToken();

    if (token) {
      const decodedJwt: TokenClaims = jwtDecode(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        console.log("authVerify triggered");
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
    }
  }, [location]);

  return <></>;
};
