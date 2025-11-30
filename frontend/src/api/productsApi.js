import api from "./axiosClient";

export const getProducts = () => api.get("/");
export const getProduct = (id) => api.get(`/${id}/`);
