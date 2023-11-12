import axios, { AxiosInstance } from 'axios';

const baseURL = 'https://13.design.pages.academy/wtw';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
});
