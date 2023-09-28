//https://www.bezkoder.com/handle-jwt-token-expiration-react/
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TokenClaims } from "../../models/tokenClaims";
import TokenHelper from "../../helpers/tokenHelper";

interface AuthVerifyProps {
  logout: Function;
}

export const AuthVerify: React.FunctionComponent<AuthVerifyProps> = ({
  logout,
}) => {
  let location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const getNewTokens = async () => {
      return await TokenHelper.refreshTokens()
    }

    if (token) {
      const decodedJwt: TokenClaims = jwtDecode(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        console.log("authVerify triggered");
        getNewTokens().
        then(newTokens =>{
          if(!newTokens){
            logout();
          }
        }).catch(error =>{
          logout();
        })
      }
    }
  }, [location]);

  return <></>;
};
