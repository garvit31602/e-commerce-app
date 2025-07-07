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
      <p className="fs-5 mt-5 fw-semibold">FILTERS</p>

      <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <p className="mb-0 fw-semibold me-3">CATEGORIES</p>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">


        <div className="d-flex flex-column gap-1 p-3">
        
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
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        <p className="mb-0 fw-semibold">TYPE</p>
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div className="d-flex flex-column gap-1 p-3">
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
  </div>
</div>
      </div>
      <div>
        <div className="d-flex align-items-end justify-content-between px-3 mb-2">
      <p className="fs-3 fw-semibold mt-5 mb-0 ac">ALL COLLECTIONS <span className='line'></span></p>
      <div className="dropdown">
  <button className="btn btn-outline border  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      Sort by
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Relevance</a></li>
    <li><a className="dropdown-item" href="#">Price: Low to High</a></li>
    <li><a className="dropdown-item" href="#">Price: Hight to low</a></li>
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