import '../styles/susbcribe.css';

function SubscribeSection() {
    return (
      <div className='d-flex flex-column libre-baskerville-regular align-items-center'>
        <p className='fw-semibold text-center'><small>Join the Tailormark Style Community</small></p>
        <p className='fw-bold fs-4 text-center'>Subscribe now & get 20% off</p>
        <p className=" text-center last-line">Tailormark Fashion – Where Style Meets Confidence.</p>
        <div className="input-group mb-3" style={{ maxWidth: '400px', width: '100%' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your email"
            aria-label="Enter your email"
            aria-describedby="button-addon2"
            autoComplete='off'
          />
          <button className="btn btn-dark" type="button" id="button-addon2">SUBSCRIBE</button>
        </div>
      </div>
    );
}

export default SubscribeSection;