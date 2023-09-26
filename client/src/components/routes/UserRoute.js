import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";


const UserRoute=({ children })=> {
    const { user } = useSelector((state) => ({ ...state }));

    // const { user: authUser } = useSelector(x => x.auth);
    
    if (user && user.token ) {
        // not logged in so redirect to login page with the return url
    return children;
    }
        // <h1 className="text-danger">Loading...</h1>

    <LoadingToRedirect/>       
    // authorized so return child components
    }
export default UserRoute;














































// import React, { Children } from 'react'
// import { Route,Link, Routes } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { LoadingOutlined } from '@ant-design/icons';

// const UserRoute=(children,...rest)=> {
//     const {user}=useSelector((state)=>({...state}));
//     return user && user.token ? (
//       <Routes>  <Route {...rest} render={()=>children}/>
//     </Routes>
//     ):(
//         <h4><LoadingOutlined>Loading</LoadingOutlined></h4>
//     )
// }

// export default UserRoute;