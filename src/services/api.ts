import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { Token } from '../utils/utils';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import { toast } from 'react-toastify';

const StatusCodeMapping: Record<string, boolean> = {
  '400': true,
  '403': true,
  '404': true,
  '401': true,
  '500': true,
};

type ValidationErrorField = {
  value: string;
  messages: string[];
}

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = Token.get();

      if (token && config.headers) {
        // config.headers['Authorization'] = `Bearer ${token}`;
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
  );

  api.interceptors.response.use((response: AxiosResponse) => response,
    (error: AxiosError<{error: string; status: string; message?: string; details: ValidationErrorField[]}>) => {
    toast.dismiss();
    if (error.code === 'ERR_NETWORK') {
      Token.drop();
    }
    if (error.response && shouldDisplayError(error.response)) {

      if (error.response?.status === 400) {

        if (error.response.data.details) {
          error.response.data.details.forEach((detail) => {
            detail.messages.forEach((message) => toast.info(message));
          });
        } else {
          toast.error(error.response.data.message);
        }
      }
      if (error.response?.status !== 401) {
        toast.error(error.response.data.error);
      }

      if (error.response?.status === 500) {
        toast.error(error.response?.data.message ?? error.message);
      }
      return Promise.reject(error);
    }
  });

  return api;
};
