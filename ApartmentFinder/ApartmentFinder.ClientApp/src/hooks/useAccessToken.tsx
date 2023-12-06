import { createContext, useContext, useState } from "react";
import TokenHelper from "../helpers/tokenHelper";

interface IAccessTokenProvider {
  children: any;
}

type AccessTokenContextType = {
  accessToken: string | null;
  setAccessToken: Function;
};

const AccessTokenContext = createContext<AccessTokenContextType>({
  accessToken: null,
  setAccessToken: () => {},
});

export const AccessTokenProvider: React.FunctionComponent<
  IAccessTokenProvider
> = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    TokenHelper.getLocalAccessToken(),
  );
  const updateAccessToken = (accessToken: string) => {
    TokenHelper.setLocalAccessToken(accessToken);
    setAccessToken(accessToken);
  };

  return (
    <AccessTokenContext.Provider
      value={{ accessToken: accessToken, setAccessToken: updateAccessToken }}
    >
      {children}
    </AccessTokenContext.Provider>
  );
};

export function useAccessToken() {
  return useContext(AccessTokenContext);
}
