import { Link } from 'react-router-dom';
import '../styles/login.css'
import Navbar from './navbar';
import { useForm } from "react-hook-form"
import { useState } from 'react';
import CartAlert from './cartAlert';

function Signup(){
    const [message,setMessage]=useState("")
   const {
    register,
    handleSubmit,
    setError,
    formState: { errors,isSubmitting },
  } = useForm()

  const onSubmit = async(data) => {
    try{
    let r=await fetch("http://localhost:3000/signup",{method:"POST", headers: {
      "Content-Type": "application/json"  
    },body:JSON.stringify(data)
    })
    let res= await r.text()
     console.log(data,res)
     setMessage(res)
      setTimeout(() => {
          setMessage("");
        }, 3000);
  }catch(err){
    console.error(err)
  }
  }
    return(
        <>
        <Navbar/>
        <div className='login'>
             {message=="User created" &&
        <div className="alert alert-success" role="alert">
  {message}
</div>}{message &&
message!="User created" &&
        <div className="alert alert-danger" role="alert">
  {message}
</div>}
         <div id="box" className='mt-4'>
        <h2 id="login">Signup</h2>
        {isSubmitting && <div>Loading...</div>}
            <form className="form-floating mt-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-floating mb-3">
                 <input
    type="text"
    className={`form-control border border-dark ${errors.name ? 'is-invalid' : ''}`}
    id={errors.name ? "floatingInputInvalid" : "floatingInput"}
    placeholder="Name"
    {...register("name", { required: true })}
  />
  <label htmlFor={errors.name ? "floatingInputInvalid" : "floatingInput"}>
    Name
  </label>
  {errors.name && (
    <div className="invalid-feedback">
      This field is required
    </div>
  )}
  </div>

  <div className="form-floating mb-3">
  <input
    type="email"
    className={`form-control border border-dark ${errors.email ? 'is-invalid' : ''}`}
    placeholder="Email"
    autoComplete="off"
    {...register("email", {
      required: { value: true, message: "This field is required" }
    })}
  />
  <label htmlFor={errors.email ? "floatingInputInvalid" : "floatingInput"}>
    Email
  </label>
   {errors.email && (
    <span className="invalid-feedback">{errors.email.message}</span>
  )}
</div>

<div className="form-floating mb-3">
  <input
    type="password"
    className={`form-control border border-dark ${errors.password ? 'is-invalid' : ''}`}
    placeholder="Password"
    autoComplete="new-password"
    {...register("password", {
      required: { value: true, message: "This field is required" },
      validate: {
        hasUppercase: (value) =>
          /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
        hasSpecialChar: (value) =>
          /[^a-zA-Z0-9]/.test(value) || "Password must contain at least one special character"
      }
    })}
  />
  <label htmlFor={errors.password ? "floatingInputInvalid" : "floatingInput"}>
    Password
  </label>
  {errors.password && (
    <span className="invalid-feedback">{errors.password.message}</span>
  )}
</div>

    <div className="d-flex justify-content-between align-items-center span-sec">
<span className="small">Forgot your password?</span>
<span>
<Link to='/login' className='text-dark text-decoration-none fw-normal small'>
Login Here</Link>
</span>
    </div>
  <button type="submit" disabled={isSubmitting} className="mt-3 px-4 btn btn-dark">Sign Up</button>
</form>
</div>

</div>
        </>
    )
}
export default Signup;