import { getAuthToken } from "@/utlis/cookie";

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  status: boolean;
  message: string;
  uid: string;
  token: string;
  expired: number;
}

export interface userCheckResponse {
  success: boolean;
  uid: string;
}

export const getAuthHeaders = (): Readonly<
  Record<string, string | boolean>
> => {
  const token = getAuthToken();
  return token ? { Authorization: token } : {};
};

export interface PaginationSchema {
  total_pages: number;
  current_page: number;
  has_pre: boolean;
  has_next: boolean;
  category?: string;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T;
}

export interface ApiError {
  status: boolean;
  message: string;
}
