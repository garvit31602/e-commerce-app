import '../styles/productCard.css'
import { useState, useEffect } from "react";

function ProductCard({ product, onAlert }) {
  const [loading, setLoading] = useState(false);
  const getUserId = () => {
    return localStorage.getItem('userId')
  };
  useEffect(() => {
    product.images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  const saveCartToBackend = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      console.log('Sending cart request with token:', token); // Debug
      const response = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: getUserId(),
          items: [{
            productId: product.product_id,
            name: product.product_description,
            price: Number(product.final_price.replace(/[^\d.]/g, "")),
            quantity: 1
          }
          ]
        }),
      }
      );
      let data;
      try {
        data = await response.json(); // safely try to parse
      } catch {
        if (response.status === 401) {
          data = { message: 'Please login first' }
        }
        else
          data = { message: 'Your session has expired. Please log in again.' };
      }
      onAlert(response.status, data.message || "Added to cart");
    } catch (err) {
      console.error('Failed to save cart:', err);
    }
    finally {
      setLoading(false)
    }
  };
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!hovering) return;

    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % product.images.length);
    }, 1000); // 1 second per image

    return () => clearInterval(interval);
  }, [hovering]);
  return (
    <div className="card px-0 py-0 border border-0">
      <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
        <div className="hover-zoom-wrapper rounded overflow-hidden">
          {/* This is a comment 
         <button disabled={loading}
  onClick={(e) => {
    e.preventDefault();

    saveCartToBackend();
  }}
  className="btn btn-primary"
>
   {loading ? 'Saving...' : 'Add to Cart'}
</button>
*/}
          <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => {
              setHovering(false);
              setIndex(0); // reset to first image when hover ends
            }}
            className="w-48 h-48 overflow-hidden rounded border"
          >

            <img src={product.images[index]} alt={product.title} className="hover-zoom w-100" />
          </div>
        </div>
        <div className="card-body text-start px-0">
          <h5 className="card-title fs-6">{product.product_description}</h5>
          <div className="d-flex">
            <p className="card-text fw-bold me-2">Rs.{Number(product.final_price.replace(/[^\d.]/g, "")).toLocaleString()}</p>
            <p className="card-text text-secondary text-decoration-line-through">Rs.{Number(product.initial_price.replace(/[^\d.]/g, "")).toLocaleString()}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
