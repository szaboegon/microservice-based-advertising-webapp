import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TokenClaims } from "../../models/tokenClaims";
import UserService from "../../services/userService";
import { AxiosError } from "axios";
import { useAccessToken } from "../../hooks/useAccessToken";

interface AuthVerifyProps {
  logout: Function;
}
export const AuthVerify: React.FunctionComponent<AuthVerifyProps> = ({
  logout,
}) => {
  let location = useLocation();
  const { accessToken, setAccessToken } = useAccessToken();

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    let decodedJwt: TokenClaims;
    try {
      decodedJwt = jwtDecode(accessToken);
    } catch (e) {
      logout();
      return;
    }

    if (decodedJwt.exp * 1000 < Date.now()) {
      UserService.checkAuth()
        .then((isAuthenticated) => {
          if (!isAuthenticated) {
            logout();
          } else {
            setAccessToken(accessToken);
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
