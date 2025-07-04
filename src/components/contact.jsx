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
         <div className="d-flex my-5 main">
            <div>
                <img src={image} className="mx-5 contact-img"/>
            </div>
            <div className="w-100">
                <p className="fs-5 fw-semibold">Get in Touch</p>
                <form className="mt-3">
                <div className="mb-3">
    <input type="text" className="form-control border border-dark" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Your Name" autoComplete='off'/>
  </div>
  <div className="mb-3">
    <input type="email" className="form-control border border-dark" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Your Email" autoComplete='off'/>
  </div>
  <div className="mb-3">
    <textarea className="form-control border border-dark" id="exampleInputPassword1" placeholder="Your Message" rows="5"/>
  </div>
  <button type="submit" className="mt-3 px-4 btn btn-dark w-100 btn-custom">Submit</button>
</form>
            </div>
         </div>
        <Subscribesection/>
        </div>
         <Footer/>
         </>
    )
}

export default Contactus;