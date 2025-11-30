import api from "./axiosClient";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SMNspHZMGfpni4JAeIzpk0Ima8cE9PdCmwVkvVysGoJDFjj96WkMxq938GCxkLsy3xVkm5us4IaAcnwUxoJTA9A00HHHpStu3"
);

// ✅ GET all products -> /api/products/
export const fetchProducts = () => api.get("/products/");

// ✅ GET single product -> /api/products/:id/
export const fetchProduct = (id) => api.get(`/products/${id}/`);

// ✅ Create PaymentIntent -> /api/payment/create-intent/
export const createPaymentIntent = async (amount) => {
  const res = await api.post("/payment/create-intent/", { amount });
  return res.data; // { client_secret, payment_intent_id, ... }
};

// (optional – not used with Elements-based flow, but fine to keep)
export const redirectToStripe = async (clientSecret) => {
  const stripe = await stripePromise;
  await stripe.confirmCardPayment(clientSecret);
};
