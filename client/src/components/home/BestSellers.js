import React, { useEffect,useState } from 'react'
import { getProducts, getProductsCount } from '../../functions/product';
import Jumbotron from '../Cards/Jumbotron';
import ProductCard from '../Cards/ProductCard';
import LoadingCard from '../Cards/LoadingCard';
import  {Pagination}  from 'antd';

function BestSellers() {
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false)
    const [productsCount,setProductsCount]=useState(0)
    const [page,setPage]=useState(1)

    useEffect(()=>{
      loadAllProducts()
    },[page])

    useEffect(()=>{
      getProductsCount().then((res)=>setProductsCount(res.data))
  },[])
  
    const loadAllProducts=()=>{
      setLoading(true)
      // sort,order,limit
      getProducts("sold","desc",page)
      .then((res)=>{
        setLoading(false); 
        setProducts(res.data);
      })
      .catch((err)=>{
          setLoading(false)
          console.log("home page error",err);
      })    
    }
  
    return (
        <div>
        <h4 className="text-center p-3 mt-3 mb-3 display-6 container-fluid text-sm-center p-5 bg-light text-secondary">
          BestSellers
        </h4>
        <div className="container">
        {loading ? (<LoadingCard count={3}/>) : (
        <div className='row'>
            {products.map((product)=>(
            <div key={product._id} className="col-md-4">
            <ProductCard product={product} loading={loading}/>
          </div>))}
          </div>)
        }
            </div>
            <div className='row'>
            <nav className='col-md-4 offset-md-4 text-center pt-2 p-3'>
            <Pagination
            current={page}
            onChange={(value)=>setPage(value)}
            total={(productsCount/3)*10}
            />
              </nav>  
            </div>
          </div>
      )
    }
    

export default BestSellers