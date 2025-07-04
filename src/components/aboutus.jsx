import Navbar from "./navbar";
import Subscribesection from "./subscribe_section";
import '../styles/aboutus.css'
import Footer from "./footer";

function AboutUs(){
    return(
        <div>
        <Navbar/>
        <div className="aboutus">
        <p className="text-center mt-5 pt-5 fs-3">ABOUT US &mdash;&mdash;</p>
        <div className="d-flex my-5 main-sec align-items-center justify-content-center">
        <div>
            <img src='https://images.unsplash.com/photo-1571513800374-df1bbe650e56' className="abt-img"/>
        </div>
        <div className="mx-5">
           <p> <span className="fw-bold">TailorMark</span> is where timeless craftsmanship meets modern sophistication. We specialize in refined fashion that fits like it was made just for you — because it is. From sharp formalwear to everyday essentials, TailorMark delivers tailored silhouettes that elevate your presence.</p>

<p>Built on the values of precision, quality, and elegance, our collections blend classic tailoring with contemporary flair. Whether you're dressing for a boardroom or a celebration, TailorMark ensures you're always dressed to impress — with confidence stitched into every seam.</p>

<p className="fw-bold">Our Mission</p>
<p>At <span className="fw-bold">TailorMark</span>, our mission is to redefine everyday fashion with tailored precision. We are committed to offering high-quality, custom-inspired pieces that empower individuals to feel sharp, confident, and effortlessly stylish — every single day.</p>


        </div>
        </div>
        <p className="mt-5 pt-5 fs-5">WHY CHOOSE US &mdash;&mdash;</p>
        <div className="d-flex align-items-center box-sec mb-5">
<div className="border border-secondary-subtle px-5 py-5 box">
    <p className="fw-bold">Tailored to Perfection:</p>
    <div>
        At TailorMark, every piece is a tribute to craftsmanship. From sleek blazers to structured bodycon fits, our garments are designed to complement your silhouette with precision and poise.
    </div>
    </div>
    <div className="border border-secondary-subtle px-5 py-5 box">
        <p className="fw-bold">Confidence in Every Stitch:</p>
     <div>
       TailorMark isn’t just about clothing—it’s about how you feel in it. Our collections are made to empower, elevate, and ensure you walk with confidence, wherever you go.
    </div>
</div>
 <div className="border border-secondary-subtle px-5 py-5 box">
        <p className="fw-bold">Effortless Elegance:</p>
     <div >
       We make refined fashion accessible. With clean cuts, premium fabrics, and timeless designs, dressing well becomes effortless—every single day.
    </div>
</div>
        </div>
        <Subscribesection/>
        </div>
         <Footer/>
        </div>
    )
}

export default AboutUs;