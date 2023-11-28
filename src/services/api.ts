import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token.ts';

const baseURL = 'https://13.design.pages.academy/wtw';
const TIMEOUT = 5000;
export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: TIMEOUT,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['x-token'] = token;
    }
    return config;
  },
);
