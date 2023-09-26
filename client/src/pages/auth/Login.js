import React, { useEffect, useState } from 'react'
import {auth} from '../../firebase'
import {GoogleAuthProvider,signInWithEmailAndPassword,signInWithPopup} from 'firebase/auth'
import {toast} from 'react-toastify'
import { Button } from 'antd'
import { GoogleOutlined, LoadingOutlined, MailOutlined } from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth'

const Login=()=> {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)
  let navigate=useNavigate()
  const provider = new GoogleAuthProvider();
  const location=useLocation()
  const {user}=useSelector((state)=>({...state}))
  
  useEffect(()=>{
    let intended=location.state;
    if(intended){
      return;
      // navigate(intended.from)
    }
      else{
      if(user && user.token) navigate('/')   
    }
    },[user,location,navigate])

    let dispatch=useDispatch()

    const roleBasedRedirect=(res)=>{
  let intended=location.state
  if(intended){
    navigate(intended.from)
  }else{
    if(res.data.role==="admin"){
      navigate("/admin/dashboard")
    }else{
      navigate("/user/history")
    }
  }  
  }
  //   useEffect(()=>{
//   if(user) 
//   roleBasedRedirect() 
// },[user])

//   const roleBasedRedirect=(res)=>{
//     if(res.data.role === "admin"){
//       navigate('/admin/dashboard')
//     }else{
//       navigate('/user/history')
//     }
//   }


  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true)
    // console.table(email,password)
    try{
      const result= await signInWithEmailAndPassword(auth,email,password)
      // console.log(result);
      const {user}=result;
      const idTokenResult=await user.getIdTokenResult()

      createOrUpdateUser(idTokenResult.token)
      .then((res)=>{
        dispatch({
              type:"LOGGED_IN_USER",
              payload:{
                name:res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role:res.data.role,
                _id: res.data._id
              },
            });
            roleBasedRedirect(res)
      })
      .catch((err)=>console.log("create or update error",err))
    // navigate('/')
    }
    catch(error){
      console.log(error);
      toast.error(error.message)
      setLoading(false)
    }
  }
  const googleLogin=async()=>{
    await signInWithPopup(auth,provider)
    .then(async(result)=>{
      const {user}=result;
      const idTokenResult=await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
      .then((res)=>{
        dispatch({
              type:"LOGGED_IN_USER",
              payload:{
                name:res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role:res.data.role,
                _id: res.data._id
              },
            });
            roleBasedRedirect(res)
      })
      // navigate('/')
    })
    .catch((err)=>{
      console.log(err);
      toast.error(err.message)
      setLoading(false)
    });
  }

  const loginForm=()=>(
    <form onSubmit={handleSubmit}>
      <input type="email" 
      className="form-control"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      placeholder="Enter your Email"
      autoFocus
      />
      <br/>
      <input type="password" 
      className="form-control"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      placeholder="Enter your Password"
      />
      <br/>
    <Button
    onClick={handleSubmit}
    type="primary"
    className="mb-3"
    block
    shape="round"
    icon={<GoogleOutlined/>}
    size="large"
    disabled={(!email||password.length<6)}
    >
      Login with Email/Password
    </Button>
    </form>
  )
  return (
    <div className="container p-5">
      <div className='row'>
      <div className='col-md-6 offset-md-3'>
        {loading ? <div className="text-danger"><LoadingOutlined/></div> :<h4>Login</h4>  
        }
        {loginForm()}
        <Button
        onClick={googleLogin}
        type="ghost"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined/>}
        size="large"
        >
      Login with Google
    </Button>
        <Link to="/forgot/password" className="float-end text-danger">
        Forgot Password
        </Link>
      </div>
      </div>
    </div>
    )
}
export default Login
