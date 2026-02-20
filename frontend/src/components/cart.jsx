import { CartCard } from "./cartCard";
import Navbar from "./navbar";
import { useEffect, useState } from "react";
import '../styles/cart.css'
import CartAlert from "./cartAlert";
import Footer from "./footer";
import Papa from "papaparse";

function Cart() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0)
  const userId = localStorage.getItem("userId")
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState("");
  const [check, setCheck] = useState("PROCEED TO CHECKOUT")
  const getProducts = async () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      console.log("Local cart:", cart);

      const response = await fetch('/products.csv');
      const csvData = await response.text();

      Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const allProducts = results.data.map((row) => {
            let images = [];
            try {
              images = typeof row.images === 'string' ? JSON.parse(row.images) : (row.images || []);
            } catch {
              images = [];
            }
            return { ...row, images: Array.isArray(images) ? images : [] };
          });

          const productIDs = cart.map(item => item.productId);
          const filteredProducts = allProducts
            .filter(product => productIDs.includes(product.product_id))
            .map(product => {
              const cartItem = cart.find(item => item.productId === product.product_id);
              return { ...product, quantity: cartItem.quantity };
            });

          setProducts(filteredProducts);
        }
      });
    }
    catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getProducts();
  }, [])

  const handleCheckout = () => {
    if (check == 'PROCEED TO CHECKOUT') {
      setCheck("PLACE ORDER")
    }
  }

  const handleAlert = (statusCode, message) => {
    setStatus(statusCode);
    setMsg(message);

    //Optional: auto-clear after 3s
    setTimeout(() => {
      setStatus(null);
      setMsg("");
    }, 3000);
  };
  useEffect(() => {
    const total = products.reduce((sum, p) => sum + Number(p.final_price.replace(/[^\d.]/g, "").toLocaleString()) * p.quantity, 0);
    setPrice(total);
  }, [products]);
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className='container cart flex-fill'>
        <CartAlert msg={msg} status={status} />
        <p className="fs-3 fw-semibold mt-5 mb-0 ac">YOUR CART <span className='line'></span></p>
        <div className='d-flex flex-column my-3'>
          {products.map((product) => (
            <div key={product.product_id}>
              <CartCard product={product}
                setQuanty={setQuantity} onAlert={handleAlert} />
            </div>
          ))}
        </div>
        <div className="d-flex">
          {check !== 'PROCEED TO CHECKOUT' && (
            <form className="row g-3 w-100 me-5">
              <p className="fs-3 fw-semibold mt-5 mb-3 ac w-100">
                DELIVERY INFORMATION <span className='line'></span>
              </p>
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="First name" />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Last name" />
              </div>
              <div className="col-12">
                <input type="email" className="form-control" placeholder="Email address" />
              </div>
              <div className="col-12">
                <input type="text" className="form-control" placeholder="Street" />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="City" />
              </div>
              <div className="col-md-4">
                <input type="text" className="form-control" placeholder="State" />
              </div>
              <div className="col-md-2">
                <input type="text" className="form-control" placeholder="Zip" />
              </div>
              <div className="col-12">
                <input type="text" className="form-control" placeholder="Phone" />
              </div>
            </form>
          )}

          <div className="d-flex cart-summary ms-auto flex-column">
            <div className="summary d-flex w-100 flex-column">
              <p className="fs-3 fw-semibold mt-5 mb-0 ac">
                CART TOTALS <span className='line'></span>
              </p>
              <div>
                <div className="d-flex justify-content-between mt-2 mb-1">
                  <p className="mb-1">Subtotal</p>
                  <p className="fw-bold mb-1">Rs. {price.toLocaleString()}</p>
                </div>
                <hr className="my-1" />
                <div className="d-flex justify-content-between my-1">
                  <p className="mb-1">Shipping Fee</p>
                  <p className="mb-1">Rs. 200</p>
                </div>
                <hr className="my-1" />
                <div className="d-flex justify-content-between">
                  <p className="fw-bold">Total</p>
                  <p className="fw-bold">Rs. {(price + 200).toLocaleString()}</p>
                </div>
              </div>
            </div>
            {check !== 'PROCEED TO CHECKOUT' &&
              <p className="fs-5 fw-semibold  mb-3">
                PAYMENT METHOD <span className='line'></span>
              </p>}
            {check !== 'PROCEED TO CHECKOUT' &&
              <div className="d-flex gap-3  payment-methods">
                <input type="radio" className="btn-check" name="options-base" id="option5" autoComplete="off" />
                <label className="btn payment-label border border-secondary-subtle rounded-0" htmlFor="option5">
                  <span className="radio-dot"></span> Stripe
                </label>

                <input type="radio" className="btn-check" name="options-base" id="option6" autoComplete="off" />
                <label className="btn payment-label border border-secondary-subtle rounded-0" htmlFor="option6">
                  <span className="radio-dot"></span> Razorpay
                </label>

                <input type="radio" className="btn-check" name="options-base" id="option8" autoComplete="off" />
                <label className="btn payment-label border border-secondary-subtle rounded-0" htmlFor="option8">
                  <span className="radio-dot"></span> CASH ON DELIVERY
                </label>
              </div>}
            <button className="w-50 ms-auto mt-4" onClick={handleCheckout}>{check}</button>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Cart