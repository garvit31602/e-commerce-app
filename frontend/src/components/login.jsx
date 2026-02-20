import { Link } from 'react-router-dom';
import '../styles/login.css'
import Navbar from './navbar';
import { useForm } from "react-hook-form"
import { useState } from 'react';

function Login(){
  const [message,setMessage]=useState("")
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors,isSubmitting },
  } = useForm()
   const onSubmit = async(data) => {
    try{
    let r=await fetch("http://localhost:3000/login",{method:"POST", headers: {
      "Content-Type": "application/json"  
    },
    credentials: 'include',
    body:JSON.stringify(data)
    })
    let res= await r.json()
      console.log(data,res)
    if(!r.ok){
      setMessage(res.message || "Login failed");
      return;
    }
  
      localStorage.setItem('userId', res.payload.id);
localStorage.setItem("accessToken",res.accessToken)
setMessage(res.message)
 setTimeout(() => {
          setMessage("");
        }, 3000);
  }
  catch(err){
    console.error(err);
  }
  }

    return(
       <>
        <Navbar/>
         <div className='login'>
        {message=="Login successful" &&
        <div className="alert alert-success" role="alert">
  {message}
</div>}{message &&
message!="Login successful" &&
        <div className="alert alert-danger" role="alert">
  {message}
</div>}
         <div id="box">
        <h2 id="login">Login</h2>
        {isSubmitting && <div>Loading...</div>}
            <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
 <div className="form-floating mb-3">
  <input type="email" className="form-control border border-dark" id="floatingInput" {...register("email")} placeholder="name@example.com" />
  <label htmlFor="floatingInput">Email address</label>
</div>
<div className="form-floating">
  <input type="password" className="form-control border border-dark" id="floatingPassword" {...register("password")} placeholder="Password"/>
  <label htmlFor="floatingPassword">Password</label>
</div>
    <div className="d-flex justify-content-between align-items-center span-sec">
<span className="small">Forgot your password?</span>
<span>
<Link to='/signup' className='text-dark text-decoration-none fw-normal small'>
Create account</Link>
</span>
    </div>
  <button type="submit" disabled={isSubmitting} className="mt-3 px-4 btn btn-dark">Sign In </button>
</form>
</div>
        </div>
        </>
    )
}
export default Login;