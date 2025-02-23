import axiosClient from "@/api/axiosInstance";
import { removeAuthToken, setAuthToken } from "@/utlis/cookie";
import {
  ApiError,
  ApiResponse,
  SignInRequest,
  SignInResponse,
  getAuthHeaders,
  userCheckResponse,
} from "./type";

export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  try {
    const response: ApiResponse<SignInResponse> = await axiosClient.post(
      "/admin/signin",
      data
    );

    if (!response.data?.token) {
      throw new Error("API呼叫異常");
    }

    setAuthToken(response.data?.token, response.data?.expired);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

export const logout = async () => {
  const response = await axiosClient.post(`/logout`, {
    headers: getAuthHeaders(),
  });
  removeAuthToken();
  return response.data;
};

export const checkUser = async (): Promise<userCheckResponse> => {
  try {
    const response = await axiosClient.post(
      `/api/user/check`,
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    if (!response.data?.success) {
      removeAuthToken();
      return { success: false, uid: "" };
    }

    return response.data;
  } catch (error) {
    removeAuthToken(); // 若 API 失敗，清除 token
    return { success: false, uid: "" };
  }
};
