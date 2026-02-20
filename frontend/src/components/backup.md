   <div className='d-flex flex-wrap border-dark border-end border-start border-bottom my-4'>
            <div className='text-block mb-5 pe-4 d-flex flex-column justify-content-center ms-auto libre-baskerville-regular'>
                <span className='responsive-text'>&mdash; OUR BESTSELLERS</span>
                <span className='big-title'>TailorMark Arrivals</span>
                <span className='responsive-text'>SHOP NOW &mdash;</span>
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
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'>
         {products.slice(0, 8).map((product) => (
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
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'>
         {products.slice(8,12).map((product) => (
  <div className='col' key={product.product_id}>
    <ProductCard product={product} />
  </div>
))}
        </div>
      </div>
      <div className='d-flex policy-sec justify-content-between mx-0 px-2'>
        <div className='text-center'>
         <i className="bi bi-arrow-repeat fs-1"></i>
<p className='fw-bold my-0'>Easy Exchange Policy</p>

<p className='text-secondary'>We offer hassle free exchange policy</p>
</div>
 <div className='text-center'>
         <i className="bi bi-check-circle fs-1"></i>
<p className='fw-bold my-0'>7 Days Return Policy</p>

<p className='text-secondary'>We provide 7 days free return policy</p>
</div>
 <div className='text-center'>
      <i className="bi bi-headset fs-1"></i>
<p className='fw-bold my-0'>Best customer support</p>

<p className='text-secondary'>We provide 24/7 customer support</p>
</div>
      </div>
     