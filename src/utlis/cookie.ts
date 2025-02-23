import Cookies from "js-cookie";

const AUTH_KEY = "AuthToken";

export const setAuthToken = (token: string, expires: number) => {
  Cookies.set(AUTH_KEY, token, { expires });
};

export const getAuthToken = () => {
  return Cookies.get(AUTH_KEY);
};

export const removeAuthToken = () => {
  Cookies.remove(AUTH_KEY);
};
