import { api } from "./api";

export const login = async (userInfo) => {
  try {
    const response = await api.post("/login", userInfo);
    if (response.data) {
      localStorage.setItem("shop_token", response.data.token);
      return response.data.token;
    }
  } catch (error) {
    throw error;
  }
};
