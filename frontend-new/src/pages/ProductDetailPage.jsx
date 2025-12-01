import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/productsApi";
import LoadingScreen from "../components/LoadingScreen"; 
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProduct(id)
      .then((res) => setProduct(res.data))
      .catch(() => alert("Error loading product"));
  }, [id]);

  const handleBuyNow = () => {
    setLoading(true);

    setTimeout(() => {
      window.location.href = `/checkout/${id}`;
    }, 400);
  };

  if (!product) return <h2 className="loading-text">Loading…</h2>;

  return (
    <>
      {loading && <LoadingScreen />}

      <div className="detail-container">
        <div className="product-card">
          <img src={product.image} alt="product" className="product-img" />

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-desc">{product.desc}</p>
            <h2 className="product-price">$ {product.price}</h2>

            <button className="buy-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
