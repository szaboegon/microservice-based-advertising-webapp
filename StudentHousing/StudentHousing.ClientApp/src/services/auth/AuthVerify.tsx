//https://www.bezkoder.com/handle-jwt-token-expiration-react/
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TokenClaims } from "../../models/tokenClaims";

interface AuthVerifyProps {
  logout: Function;
}

export const AuthVerify: React.FunctionComponent<AuthVerifyProps> = ({
  logout,
}) => {
  let location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedJwt: TokenClaims = jwtDecode(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        console.log("logged out by authVerify");
        logout();
      }
    }
  }, [location]);

  return <></>;
};
