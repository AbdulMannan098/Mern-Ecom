import React, { useEffect, useState } from 'react'
import {auth} from '../../firebase'
import {sendSignInLinkToEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Register=()=> {
  const [email,setEmail]=useState("");

  let navigate=useNavigate()
  const {user}=useSelector((state)=>({...state}))

  useEffect(()=>{
    if(user && user.token) navigate('/')
  })

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const config={
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }

    await sendSignInLinkToEmail(auth,email,config);
    toast.success(
      `email is sent to ${email}. Click the link to complete your registration.`
    );

    //save user email in local storage
    window.localStorage.setItem('emailForRegistration',email)
   // clear state
   setEmail("");
  }

  const registerForm=()=>(
    <form onSubmit={handleSubmit}>
      <input type="email" 
      className="form-control"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      placeholder="Enter your Email"
      autoFocus
      />
      <br/>
      <button type='submit' className="btn btn-info">Submit</button>
    </form>
  )
  return (
    <div className="container p-5">
      <div className='row'>
      <div className='col-md-6 offset-md-3'>
        <h4>Register</h4>
        {registerForm()}
      </div>
      </div>
    </div>
    )
}
export default Register