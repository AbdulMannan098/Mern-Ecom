import React, { useEffect, useState } from "react";
// import {auth} from "../../firebase";
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux';
import { LoadingOutlined } from "@ant-design/icons";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword=()=>{
    const [email,setEmail]=useState("")
    const [loading,setLoading]=useState(false)

    let navigate=useNavigate()
    const {user}=useSelector((state)=>({...state}));

    useEffect(()=>{
        if (user && user.token) navigate('/');
    },);

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)

        const config={
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };

        await sendPasswordResetEmail(email,config)
        .then(()=>{
            setEmail("")
            setLoading(false)
            toast.success("check your email for password reset link")
        })
        .catch((error)=>{
            setLoading(false)
            toast.error(error.message)
            console.log("Error Message in forget password",error);
        })
    }

    return(
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? <h1><LoadingOutlined/></h1> : <h4>ForgotPassword</h4>}
        <form onSubmit={handleSubmit}>
        <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Type your email"
        autoFocus
       />
       <br/>
       <button className="btn ant-btn-primary" disabled={!email}>
        Submit
       </button>
        </form>
        </div>
    )

}

export default ForgotPassword;