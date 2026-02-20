import { useState } from "react";
import '../styles/cart-card.css';

function CartCard({ product, setDeleted, onAlert }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [loadingItemId, setLoadingItemId] = useState(null);

  const getUserId = () => {
  return localStorage.getItem('userId')
};

  const updateCartQuantity = async (productId, newQuantity) => {
    try {
      setLoadingItemId(productId);
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: getUserId(),
          items: [{
            productId,
            name: product.product_description,
            price: Number(product.final_price.replace(/[^\d.]/g, "")),
            quantity: newQuantity
          }]
        })
      });
      let data;
  try {
    data = await response.json(); // safely try to parse
  } catch {
    if(response.status===401){
     data= {message:'Please login first'}
    }
    else
    data = {message:'Your session has expired. Please log in again.'};
  }
      onAlert(response.status, data.message || "Cart updated");
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setLoadingItemId(null);
    }
  };

  const deleteFromBackend = async (productId) => {
    try {
      setLoadingItemId(productId);
      const userId = localStorage.getItem('userId');
      const res = await fetch(`http://localhost:3000/cart/${userId}/${productId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      onAlert(res.status, data.message);
    } catch (err) {
      console.log('Error deleting the product:', err);
    } 
  };

  const handleInputChange = (e) => {
    const newVal = parseInt(e.target.value, 10);
    if (!isNaN(newVal) && newVal >= 1) {
      setQuantity(newVal);
    }
  };

  const handleBlur = () => {
    if (quantity === 0) {
      deleteFromBackend(product.product_id);
    } else if (quantity !== product.quantity) {
      updateCartQuantity(product.product_id, quantity);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur(); // triggers blur logic
    }
  };

  const imageUrl = product.images[0];

  return (
    <div className="cart-card px-0 py-0 border border-end-0 border-start-0 py-3 px-3 d-flex">
      <img src={imageUrl} alt={product.title} className="cart-img" />
      <div className="card-body text-start px-0 d-flex w-100">
        <div className="d-flex flex-column mx-4 w-100">
          <h5 className="card-title fs-6 my-2">{product.product_description}</h5>
          <p className="card-text fw-bold me-2">Rs.{Number(product.final_price.replace(/[^\d.]/g, "")).toLocaleString()}</p>
        </div>

        <div className="d-flex align-items-center w-100">
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="form-control form-control-sm qty ms-auto me-2 border border-dark border-2 fw-bold"
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              deleteFromBackend(product.product_id);
            }}
            className="ms-auto bg-white border-0 p-1 rounded"
          >
            <i className="bi bi-trash text-danger fs-3"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export { CartCard };
