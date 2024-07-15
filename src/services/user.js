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

export const registerUser = async (newUser) => {
  try {
    const response = await api.post("/register", newUser);
    if (response.data) {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

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
