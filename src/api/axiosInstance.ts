import axios, { AxiosError } from "axios";
import { ApiError } from "./service/auth/type";
import Cookies from "js-cookie";

//create instance
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("react-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let apiError: ApiError = {
      status: false,
      message: "系統異常",
    };

    if (error.response) {
      apiError = {
        status: false,
        message:
          (error.response.data as { message?: string })?.message ||
          "api呼叫失敗",
      };
    } else {
      apiError.message = error.message;
    }

    return Promise.reject(apiError);
  }
);

export default axiosClient;
