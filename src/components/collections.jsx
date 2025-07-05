import Navbar from "./navbar";
import { useState,useEffect } from "react";
import Papa from 'papaparse';
import ProductCard from './productlist'
import '../styles/collections.css'
import Footer from "./footer";

function Collections(){
    const [products, setProducts] = useState([]);
    
      useEffect(() => {
        Papa.parse('/products.csv', {
          download: true,
          header: true,
          complete: (result) => {
            console.log("Raw CSV result:", result.data);
      const allowedCategories = [
        'shirts', 'tshirts', 'jumpsuit', 'tops','jackets','skirts','sarees','kurtas','jeans'
      ];

      const filteredData = result.data.filter((row) => {
        if (!row.url) return false;
        return allowedCategories.some((category) =>
          row.url.toLowerCase().includes(category)
        );
      });

      setProducts(filteredData);
    },
           error: (err) => {
            console.error("Error parsing CSV:", err);
          }
        });
      }, []);
    return(
      <>
      <Navbar/>
      <div className="home d-flex flex-column flex-md-row">
      <div>
      <p className="fs-5 mt-5">FILTERS</p>
<div className="border cat mb-3">
        <div className="d-flex flex-column gap-1 p-3">
          
<p className="mb-0 fw-semibold">CATEGORIES</p>
        <label>
        <input type="checkbox" id="men" name="category" value="men" className="me-1"/>
        <small>Men</small>
        
        </label>
        <label>
        <input type="checkbox" id="women" name="category" value="women" className="me-1"/>
       <small>Women</small>
        </label>
        <label>
        <input type="checkbox" id="kids" name="category" value="kids" className="me-1"/>
        <small>Kids</small>
        </label>
        </div>
      </div>
       
       <div className="border cat">
        <div className="d-flex flex-column gap-1 p-3">
<p className="mb-0 fw-semibold">Type</p>
        <label>
        <input type="checkbox" id="men" name="category" value="men" className="me-1"/>
       <small>Topwear</small>
        </label>
        <label>
        <input type="checkbox" id="women" name="category" value="women" className="me-1"/>
        <small>Bottomwear</small>
        </label>
        <label>
        <input type="checkbox" id="kids" name="category" value="kids" className="me-1"/>
        <small>Winterwear</small>
        </label>
        </div>
      </div>
      </div>
      <div>
        <div className="d-flex align-items-end justify-content-between mb-3">
      <p className="fs-3 px-3 fw-semibold mt-5 mb-0">ALL COLLECTIONS &mdash;</p>
      <div class="dropdown">
  <button class="btn btn-outline border  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      Sort by
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Relevance</a></li>
    <li><a class="dropdown-item" href="#">Price: Low to High</a></li>
    <li><a class="dropdown-item" href="#">Price: Hight to low</a></li>
  </ul>
</div>
</div>
       <div className='container'>
        <div className='row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-4 g-4'>
         {products.slice(21, 49).map((product) => (
      <div className='col' key={product.product_id}>
      <ProductCard product={product} />
      </div>
      ))}
      </div>
      </div>
      </div>
      </div>
      <Footer/>
      </>
    )
}

export default Collections;