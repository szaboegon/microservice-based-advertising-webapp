import axios, {AxiosHeaders, AxiosHeaderValue, HeadersDefaults} from "axios";
import TokenHelper from "./tokenHelper";

let refreshTokens = TokenHelper.refreshExpiredTokenClosure();

const createInstance = (
    baseUrl: string,
    headers:
        | AxiosHeaders
        | Partial<HeadersDefaults>
        | Partial<
        AxiosHeaders & {
        Accept: AxiosHeaderValue;
        "Content-Length": AxiosHeaderValue;
        "User-Agent": AxiosHeaderValue;
        "Content-Encoding": AxiosHeaderValue;
        Authorization: AxiosHeaderValue;
    }
    >
        | undefined,
) => {
    const instance = axios.create({
        baseURL: baseUrl,
        headers: headers,
    });

    instance.interceptors.request.use(
        (config) => {
            const accessToken = TokenHelper.getLocalAccessToken();
            if (accessToken) {
                config.headers.setAuthorization("Bearer " + accessToken);
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest: any = error.config;
            if (error.response.status == 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const tokens = await refreshTokens();
                if (tokens) {
                    refreshTokens = TokenHelper.refreshExpiredTokenClosure();
                    return instance(originalRequest);
                }
            }
            refreshTokens = TokenHelper.refreshExpiredTokenClosure();
            return Promise.reject(error);
        },
    );
    return instance;
};

const InterceptorApiClient = {
    createInstance,
};

export default InterceptorApiClient;
