import { useState } from "react";
import TokenHelper from "../helpers/tokenHelper";

const useAccessToken = () => {
  const getAccessToken = () => {
    return TokenHelper.getLocalAccessToken();
  };

  const [accessToken, setAccessToken] = useState(getAccessToken());
  const saveAccessToken = (accessToken: string) => {
    TokenHelper.setLocalAccessToken(accessToken);
    setAccessToken(TokenHelper.getLocalAccessToken());
  };
  return {
    saveAccessToken,
    accessToken,
  };
};

export default useAccessToken;
