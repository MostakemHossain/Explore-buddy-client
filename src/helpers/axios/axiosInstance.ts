import { authKey } from "@/constants/authKey";
import setAccessToken from "@/services/actions/setAccessToken";
import { getNewAccessToken } from "@/services/auth.services";
import { IGenericErrorResponse } from "@/types";
import { getFormLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import axios from "axios";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = getFormLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // If you need to transform the response, do it here
    // But return the original AxiosResponse object
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await getNewAccessToken();
          const newAccessToken = response?.data?.accessToken;
          setToLocalStorage(authKey, newAccessToken);
          setAccessToken(newAccessToken);

          processQueue(null, newAccessToken);
          isRefreshing = false;

          originalRequest.headers.Authorization = `${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          isRefreshing = false;

          return Promise.reject(refreshError);
        }
      }

      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          originalRequest.headers.Authorization = `${newToken}`;
          return instance(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    const responseObj: IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessages: error?.response?.data?.message,
    };
    return Promise.reject(responseObj);
  }
);

export { instance };
