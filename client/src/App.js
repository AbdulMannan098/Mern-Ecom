import {Routes,Route} from 'react-router-dom'
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home'
import 'react-toastify/dist/ReactToastify.css'; 
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {ToastContainer} from 'react-toastify'
import RegisterComplete from './pages/auth/RegisterComplete';
import { currentUser } from './functions/auth';
import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import ForgotPassword from './pages/auth/ForgotPassword';
import HistoryComp from './pages/user/History';
import UserRoute from './components/routes/UserRoute';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/categoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import AllProducts from './pages/admin/product/AllProducts';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import Product from './pages/Product';
import CategoryHome from './pages/category/CategoryHome';
import SubHome from './pages/sub/SubHome';
import Shop from './pages/Shop';
import Cart from './pages/Cart';

const App=()=> {

  const dispatch=useDispatch()

  // to check firebase auth state
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idTokenResult=await user.getIdTokenResult()
        console.log("user",user);
            currentUser(idTokenResult.token).then(
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
        
      }
    });
    //cleanup
    return()=>unsubscribe()
  },[])

  return (
    <div>
    <Header/>
    <ToastContainer/>    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/register/complete' element={<RegisterComplete/>}/>
      <Route path='/forgot/password' element={<ForgotPassword/>}/>
      <Route path='/user/history' element={
      <UserRoute><HistoryComp/></UserRoute>}/>
      <Route path='/user/password' element={
        <UserRoute><Password/></UserRoute>}/>
        <Route path='/user/wishlist' element={
          <UserRoute><Wishlist/></UserRoute>}/>
      <Route path='/admin/dashboard' element={
        <AdminRoute><AdminDashboard/></AdminRoute>
      }/>
      <Route path='/admin/category' element={
        <AdminRoute><CategoryCreate/></AdminRoute>
      }/>
      <Route path='/admin/category/:slug' element={
        <AdminRoute><CategoryUpdate/></AdminRoute>
      }/>
      <Route path='/admin/sub' element={
        <AdminRoute><SubCreate/></AdminRoute>
      }/>
      <Route path='/admin/sub/:slug' element={
        <AdminRoute><SubUpdate/></AdminRoute>
      }/>
      <Route path='/admin/sub/:slug' element={
        <AdminRoute><SubUpdate/></AdminRoute>
      }/>
      <Route path='/admin/product' element={
        <AdminRoute><ProductCreate/></AdminRoute>
      }/>
      <Route path='/admin/products' element={
        <AdminRoute><AllProducts/></AdminRoute>
      }/>
      <Route path='/admin/product/:slug' element={
        <AdminRoute><ProductUpdate/></AdminRoute>
      }/>
      <Route path='/product/:slug' element={<Product/>}/>
      <Route path='/category/:slug' element={<CategoryHome/>}/>
      <Route path='/sub/:slug' element={<SubHome/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/cart' element={<Cart/>}/>
      
      </Routes>
    </div>
    );
}

export default App;
