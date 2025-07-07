import '../styles/productCard.css'

function ProductCard({ product }) {
 const imageUrl = JSON.parse(product.images)[0];
  return (
    <div className="card px-0 py-0 border border-0">
       <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
        <div className="hover-zoom-wrapper rounded overflow-hidden">
      <img  src={imageUrl} alt={product.title} className="hover-zoom w-100"/>
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
