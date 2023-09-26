import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {currentAdmin} from '../../functions/auth'
import LoadingToRedirect from "./LoadingToRedirect";

function AdminRoute({ children }) {
    const { user } = useSelector((state) => ({ ...state }));
    const [ok,setOk]=useState(false)

    useEffect(()=>{
        if(user && user.token){
            currentAdmin(user.token)
            .then((res)=>{
                console.log("current admin res",res);
                setOk(true)
            })
            .catch((err)=>{
                console.log("admin route error",err);
                setOk(false)
            })
        }
    },[user])
    if (ok) {
    // authorized so return child components
        return children;    
    }
        // not logged in so redirect to login page with the return url    
    <LoadingToRedirect />
}

export default AdminRoute
