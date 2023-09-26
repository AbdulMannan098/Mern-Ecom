import React, { useEffect, useState } from 'react'
import Jumbotron from '../components/Cards/Jumbotron';
import LoadingCard from '../components/Cards/LoadingCard';
import ProductCard from '../components/Cards/ProductCard';
import CategoryList from '../components/category/CategoryList';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import {getProducts, getProductsByCount} from '../functions/product'
import SubList from '../components/sub/SubList';

const Home=()=> {

  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    loadAllProducts()
  },[])

  const loadAllProducts=()=>{
    setLoading(true)
    // sort,order,limit
    getProducts("createdAt","desc",3)
    .then((res)=>{
      setLoading(false)  
      setProducts(res.data);
    })
    .catch((err)=>{
        setLoading(false)
        console.log("home page error",err);
    })    
  }

  return (
    <>
    <div className="container-fluid text-sm-center p-5 bg-light text-secondary h1 font-weight-bold fw-bold fst-italic text-decoration-underline">
      <Jumbotron text={["Latest Products","New Arrivals","Best Sellers"]} />
    </div>
    <NewArrivals/>
    <BestSellers/>
    <h4 className="text-center p-3 mt-3 mb-3 display-6 container-fluid text-sm-center p-5 bg-light text-secondary">
        Categories
        </h4>
        <CategoryList/>
        <h4 className="text-center p-3 mt-3 mb-3 display-6 container-fluid text-sm-center p-5 bg-light text-secondary">
        Subs
        </h4>
        <SubList/>        
    </>
  )
}

export default Home