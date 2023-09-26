import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect=()=> {
  const [count,setCount]=useState(5);
  let navigate=useNavigate();

  useEffect(()=>{
    const interval=setInterval(()=>{
        setCount((currentCount)=>--currentCount);
    });
    count === 0 && navigate('/');
    //cleanup
    return() => clearInterval(interval)
  },[count])

    return (
    <div className="container p-5 text-center">
       <h4> Redirecting you in {count} seconds
       </h4>
        </div>
  )
}

export default LoadingToRedirect