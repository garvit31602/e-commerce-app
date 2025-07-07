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
         <p className="text-center mt-5 pt-5 fs-3">CONTACT US <span className='line'></span></p>
      <div className="container my-5">
  <div className="row align-items-stretch">
    {/* Left Side: Image */}
    <div className="col-12 col-md-6 d-flex px-0">
      <img
        src={image}
        className="img-fluid w-100 h-100 object-fit-cover rounded"
        style={{ objectFit: 'cover' }}
        alt="Contact"
      />
    </div>

    {/* Right Side: Form */}
    <div className="col-12 col-md-6 d-flex flex-column justify-content-center px-3 flex-wrap mt-5 mt-lg-0">
      <p className="fs-5 fw-semibold mb-0 git">Get in Touch</p>
      <form className="mt-3 w-100">
        <div className="mb-3">
          <input
            type="text"
            className="form-control border border-dark"
            placeholder="Your Name"
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control border border-dark"
            placeholder="Your Email"
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control border border-dark textarea"
            placeholder="Your Message"
            rows="5"
          />
        </div>
      </form>
      <button type="submit" className="btn btn-dark w-100 btn-custom mt-2">
          Submit
        </button>
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