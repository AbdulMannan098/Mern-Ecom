import React, { useEffect, useState } from 'react'
import {auth} from '../../firebase'
import {signInWithEmailLink,updatePassword} from 'firebase/auth'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
// import { createOrUpdateUser } from './Login'
import { createOrUpdateUser } from '../../functions/auth'

const RegisterComplete=()=> {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  let dispatch=useDispatch()
  
  const {user}= useSelector((state)=>({...state}))

  useEffect(()=>{
    setEmail(window.localStorage.getItem("emailForRegistration"))
  },[])

  const handleSubmit=async(e)=>{
    e.preventDefault()
    // const auth = getAuth();
   if (!email||!password) {
    toast.error('email and password is required')
      return
     }
     if(password.length<6){
      toast.error('Password must be at least 6 character long')
      return
    }
     try{
      const result=await signInWithEmailLink(
        auth,
        email,  
        window.location.href
          );
          // console.log("Result",result);
     if(result.user.emailVerified){
      window.localStorage.removeItem("emailForRegistration")
      // get user id token
     
      // let user =auth.currentUser
      await updatePassword(result.user,password);
      const idTokenResult=await result.user.getIdTokenResult()
      console.log("user",result.user,"idtokenresult", idTokenResult);
      setTimeout(() => {
        navigate('/')   
      }, 2000);
      
      
      //redux store
      createOrUpdateUser(idTokenResult.token).then(
        (res)=>{
          dispatch({
            type:"LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role:res.data.role,
              _id: res.data._id
            },
          });
        })
        // console.log("create or update res",res))
        .catch((err)=>console.log(err))
       //redirect
        navigate('/')
      // window.location.replace("/")
      // history.push("/")
  }
      }catch(error){
      console.log(error);
      toast.error(error.message)
  }
     };
   
  

  const completeRegisterationForm=()=>(
    <form onSubmit={handleSubmit}>
      <input type="email" 
      className="form-control"
      value={email}
      disabled
      />
      <input type="password" 
      className="form-control"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      placeholder="Password"
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
        <h4>Register Complete</h4>
        {completeRegisterationForm()}
      </div>
      </div>
    </div>
    )
}
export default RegisterComplete