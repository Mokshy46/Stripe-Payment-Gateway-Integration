import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { createPaymentIntent, fetchProduct } from "../api/paymentApi"; 

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function CheckoutPage() {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct(id).then((res) => {
      setProduct(res.data);

      createPaymentIntent(res.data.price).then((data) => {
        setClientSecret(data.clientSecret);
      });

    });
  }, [id]);

  if (!clientSecret) return <h2>Loading checkout...</h2>;

  return (
    <div className="checkout-wrapper">
      <h1 className="checkout-heading">Checkout</h1>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm clientSecret={clientSecret} product={product} />
      </Elements>
    </div>
  );
}
