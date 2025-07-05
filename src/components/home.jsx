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
        <div id="root" className="d-flex flex-column min-vh-100">
        <Navbar/>
         <main className="flex-grow-1 home">
           <div className='d-flex flex-wrap border-dark border-end border-start border-bottom  align-items-stretch'>
          <div className='text-block my-5 px-4 d-flex flex-column justify-content-center ms-auto libre-baskerville-regular'>

                <span className='fs-5'>&mdash; OUR BESTSELLERS</span>
                <span className='big-title text-center'>TailorMark Arrivals</span>
                <span className='fs-5'>SHOP NOW &mdash;</span>
            </div>
            <div className='img-div ms-auto'>
            <img src={image} className='carousel-img'/>
            </div>
        </div>
        <div className='mt-5 text-center'>
            <h2>LATEST COLLECTIONS &mdash;&mdash;</h2>
            <p className='text-secondary fw-medium'>Tailormark’s latest collection is where elegance meets trend. Fashion that speaks your style.</p>
        </div>
        <div className='container'>
        <div className='row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-4 g-4'>
         {products.slice(0,12).map((product) => (
  <div className='col' key={product.product_id}>
    <ProductCard product={product} />
  </div>
))}

        </div>
      </div>
       <div className='mt-4 text-center'>
      <h2>BEST SELLERS &mdash;&mdash;</h2>  
 <p className='text-secondary fw-medium'>Our best seller — loved by many, styled by all. Elevate your look with timeless charm.</p>
    </div>
    <div className='container'>
        <div className='row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-4 g-4'>
         {products.slice(12, 20).map((product) => (
  <div className='col' key={product.product_id}>
    <ProductCard product={product} />
  </div>
))}
</div>
</div>
      <div className='d-flex policy-sec justify-content-between mx-0 px-2 py-4'>
        <div className='text-center my-4'>
         <i className="bi bi-arrow-repeat fs-1"></i>
<p className='fw-bold my-0'>Easy Exchange Policy</p>

<p className='text-secondary'>We offer hassle free exchange policy</p>
</div>
 <div className='text-center my-4'>
         <i className="bi bi-check-circle fs-1"></i>
<p className='fw-bold my-0'>7 Days Return Policy</p>

<p className='text-secondary'>We provide 7 days free return policy</p>
</div>
 <div className='text-center my-4'>
      <i className="bi bi-headset fs-1"></i>
<p className='fw-bold my-0'>Best customer support</p>

<p className='text-secondary'>We provide 24/7 customer support</p>
</div>
      </div>
     <SubscribeSection/>


  </main>

    <Footer/>
        </div>
    )
}

export default Home;