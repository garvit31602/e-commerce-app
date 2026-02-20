import { useState } from "react";
import '../styles/cart-card.css';

function CartCard({ product, onUpdate, onDelete, onAlert }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [loadingItemId, setLoadingItemId] = useState(null);

  const getUserId = () => {
    return localStorage.getItem('userId')
  };

  const updateCartQuantity = (productId, newQuantity) => {
    try {
      setLoadingItemId(productId);
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const itemIndex = cart.findIndex(item => item.productId === productId);

      if (itemIndex > -1) {
        cart[itemIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        onUpdate(productId, newQuantity);
        onAlert(200, "Cart updated");
      }
    } catch (err) {
      console.error('Update error:', err);
      onAlert(500, "Failed to update cart");
    } finally {
      setLoadingItemId(null);
    }
  };

  const deleteFromLocalStorage = (productId) => {
    try {
      setLoadingItemId(productId);
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = cart.filter(item => item.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      onDelete(productId);
      onAlert(200, "Item removed from cart");
    } catch (err) {
      console.error('Error deleting the product:', err);
      onAlert(500, "Failed to remove item");
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleInputChange = (e) => {
    const newVal = parseInt(e.target.value, 10);
    if (!isNaN(newVal) && newVal >= 1) {
      setQuantity(newVal);
      updateCartQuantity(product.product_id, newVal);
    } else if (newVal === 0) {
      setQuantity(0);
    }
  };

  const handleBlur = () => {
    if (quantity === 0) {
      deleteFromLocalStorage(product.product_id);
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
              deleteFromLocalStorage(product.product_id);
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
