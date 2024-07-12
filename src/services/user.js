import { api } from "./api";

export const getUsers = async () => {
  const token = localStorage.getItem("shop_token");
  try {
    const response = await api.get("/users", {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};