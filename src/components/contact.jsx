import Navbar from "./navbar";
import Subscribesection from "./subscribe_section";
import image from '../assets/pexels-marcus-aurelius-4064227.jpg'
import '../styles/contact.css'
import Footer from "./footer";

function Contactus(){
    return(
        <>
        <Navbar/>
        <div className="contact">
         <p className="text-center mt-5 pt-5 fs-3">CONTACT US &mdash;&mdash;</p>
      <div className="container my-5">
  <div className="row align-items-stretch flex-column flex-md-row">
            <div className="col-12 col-md-6 d-flex">
                <img src={image} className="img-fluid w-100 h-100 object-fit-cover rounded"/>
            </div>
            <div className="mt-4 mt-md-0 col-12 col-md-6 p-4 pt-0 pb-0">
                <p className="fs-5 fw-semibold">Get in Touch</p>
                <form className="mt-3">
                <div className="p-4 flex-grow-1 flex-shrink-1 mb-0 pb-0">
    <input type="text" className="form-control border border-dark mb-3" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Your Name" autoComplete='off'/>
  <div className="mb-3">
    <input type="email" className="form-control border border-dark" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Your Email" autoComplete='off'/>
  </div>
  <div className="mb-3">
    <textarea className="form-control border border-dark" id="exampleInputPassword1" placeholder="Your Message" rows="5"/>
  </div>
  <button type="submit" className="mt-3 pt-2 px-4 btn btn-dark w-100 btn-custom">Submit</button>
  </div>
</form>
</div>
            </div>
         </div>
        <Subscribesection/>
        </div>
         <Footer/>
         </>
    )
}

export default Contactus;