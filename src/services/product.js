import { api } from "./api";

export const getProducts = async () => {
  const token = localStorage.getItem("shop_token");
  try {
    const response = await api.get("/products", {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMyProducts = async () => {
  const token = localStorage.getItem("shop_token");
  try {
    const response = await api.get("/my-products", {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createProducts = async (product) => {
  const token = localStorage.getItem("shop_token");

  try {
    const response = await api.post("/products", product, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const editProducts = async (product, id) => {
  const token = localStorage.getItem("shop_token");

  try {
    const response = await api.put(`/products/${id}`, product, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("shop_token");

  try {
    const response = await api.delete(`/products/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
