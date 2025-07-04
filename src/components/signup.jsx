import { Link } from 'react-router-dom';
import '../styles/login.css'
import Navbar from './navbar';

function Signup(){
    return(
        <>
        <Navbar/>
         <div id="box">
        <h2 id="login">Signup</h2>
            <form className="w-25 mt-3">
                <div className="mb-3">
    <input type="text" className="form-control border border-dark" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name" autoComplete='off'/>
  </div>
  <div className="mb-3">
    <input type="email" className="form-control border border-dark" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" autoComplete='off'/>
  </div>
  <div className="mb-3">
    <input type="password" className="form-control border border-dark" id="exampleInputPassword1" placeholder="Password" autoComplete='new-password'/>
  </div>
    <div className="d-flex justify-content-between align-items-center span-sec">
<span className="small">Forgot your password?</span>
<span>
<Link to='/login' className='text-dark text-decoration-none fw-normal small'>
Login Here</Link>
</span>
    </div>
  <button type="submit" className="mt-3 px-4 btn btn-dark">Sign Up</button>
</form>
</div>
        </>
    )
}
export default Signup;