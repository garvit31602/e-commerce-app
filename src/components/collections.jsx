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
        'shirts', 'tshirts', 'saree-blouse', 'jumpsuit', 'tops','jackets','skirts','sarees','kurtas','jeans'
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
        <div className="home">
        <p className="fs-3 px-3 fw-semiboldx mt-5">ALL COLLECTIONS &mdash;</p>
         <div className='container mt-0'>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'>
         {products.slice(12,40).map((product) => {
             console.log(product);
             return(
  <div className='col' key={product.product_id}>
    <ProductCard product={product} />
  </div>
)})}
        </div>
      </div>
      </div>
      <Footer/>
      </>
    )
}

export default Collections;