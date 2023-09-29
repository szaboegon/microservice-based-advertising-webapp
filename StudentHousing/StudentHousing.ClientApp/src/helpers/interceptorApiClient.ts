import axios, {AxiosHeaders, AxiosHeaderValue, HeadersDefaults} from "axios";
import TokenHelper from "./tokenHelper";

const createInstance = (baseUrl: string, headers: AxiosHeaders | Partial<HeadersDefaults> | Partial<AxiosHeaders & {Accept: AxiosHeaderValue, "Content-Length":  AxiosHeaderValue, "User-Agent": AxiosHeaderValue, "Content-Encoding": AxiosHeaderValue, Authorization: AxiosHeaderValue}> | undefined) =>{
    const instance = axios.create({
        baseURL: baseUrl,
        headers: headers
    });

    instance.interceptors.request.use(
        (config) => {
            const accessToken = TokenHelper.getLocalAccessToken();
            if(accessToken){
                config.headers.setAuthorization('Bearer '+ JSON.parse(accessToken));
            }
            return config;
        },(error) => Promise.reject(error)
    )

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest: any = error.config;
            if(error.response.status == 401 && !originalRequest._retry){
                originalRequest._retry = true;
                try{
                    const newTokens = await TokenHelper.refreshTokens()
                    return newTokens ? instance(originalRequest) : Promise.reject(error);
                }
                catch (e){
                    return Promise.reject(e);
                }
            }
            return Promise.reject(error);
        }
    )

    return instance;
}

const InterceptorApiClient = {
    createInstance,
}

export default  InterceptorApiClient;