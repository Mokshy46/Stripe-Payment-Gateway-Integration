import axios from "axios";

const api = axios.create({
  baseURL: "https://stripe-payment-gateway-77vs.onrender.com"

});

export default api;
