import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });
api.interceptors.request.use(request => requestInterceptor(request))

const requestInterceptor = (request: AxiosRequestConfig<any>) => {
   request.withCredentials = true;
   return request;
}
export default api;