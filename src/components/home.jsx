import Navbar from './navbar'
import Papa from 'papaparse';
import image from '../assets/pexels-chloekalaartist-1043474.jpg'
import '../styles/home.css'
import ProductCard from './productlist'
import { useState,useEffect } from 'react';
import SubscribeSection from './subscribe_section';
import Footer from './footer';

function Home(){
     const [products, setProducts] = useState([]);

  useEffect(() => {
    Papa.parse('/products.csv', {
      download: true,
      header: true,
        complete: (result) => {
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
        <div id="root" className="d-flex flex-column min-vh-100">
        <Navbar/>
         <main className="flex-grow-1">
        
     <SubscribeSection/>


  </main>

    <Footer/>
        </div>
    )
}

export default Home;