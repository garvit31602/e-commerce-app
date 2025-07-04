import '../styles/productCard.css'

function ProductCard({ product }) {
 const imageUrl = JSON.parse(product.images)[0];
  return (
    <div className="card px-0 py-0 border border-0">
       <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
      <img  src={imageUrl} alt={product.title} className="w-100 hover-zoom img-fluid"/>
      <div className="card-body text-start px-0">
        <h5 className="card-title fs-6">{product.product_description}</h5>
        <p className="card-text fw-bold">Rs.{Number(product.final_price.replace(/[^\d.]/g, "")).toLocaleString()}</p>
      </div>
      </a>
    </div>
  );
}

export default ProductCard;
