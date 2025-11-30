import api from "./axiosClient";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51SMNspHZMGfpni4JAeIzpk0Ima8cE9PdCmwVkvVysGoJDFjj96WkMxq938GCxkLsy3xVkm5us4IaAcnwUxoJTA9A00HHHpStu3");

export const fetchProducts = () => api.get("/");

export const fetchProduct = (id) => api.get(`/${id}/`);

export const createPaymentIntent = async (amount) => {
  const res = await api.post("payment/create-intent/", { amount });
  return res.data;
};

export const redirectToStripe = async (clientSecret) => {
  const stripe = await stripePromise;
  await stripe.confirmCardPayment(clientSecret);
};
