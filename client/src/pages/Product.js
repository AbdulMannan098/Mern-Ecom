import React, { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom'
import SingleProduct from '../components/Cards/SingleProduct';
import { getProduct, getRelated, productStar } from '../functions/product';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import ProductCard from '../components/Cards/ProductCard'

function Product() {
  const [product,setProduct]=useState({})
  const [star,setStar]=useState(0)
  const [related,setRelated]=useState([])
  let {slug}=useParams();
  const {user}=useSelector((state)=>({...state}))
  
  useEffect(()=>{
    loadSingleProduct();
  },[slug]);

  useEffect(()=>{
    if(product.ratings && user){
      let existingRatingObject = product.ratings.find(
      (ele)=>ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  },[product.ratings,user])

  const loadSingleProduct=()=>{
  getProduct(slug).then((res)=>{
    setProduct(res.data);
    // load related
    getRelated(res.data._id).then((res)=>setRelated(res.data))
  })
}
  const onStarClick=(newRating,name)=>{
    setStar(newRating)
    console.table("newRating",newRating,"name",name)
    productStar(name,newRating,user.token)
    .then((res)=>{
      console.log("rating clicked",res.data);
      loadSingleProduct()
    })
  }
    return (
    <div className="container-fluid">
        <div className="row pt-4">
        <SingleProduct product={product} onStarClick={onStarClick} star={star}/>
        </div>
        <div className='row'>
            <div className='col text-center pt-5 pb-5'>
               <hr/>
              <h4>
             Related products
           </h4>
              <hr/>
              {/* {JSON.stringify(related)} */}
            </div>
        </div>
        <div className='row pb-5'> 
        {related.length ? related.map((r)=>(
          <div key={r._id} className="col-md-4">
            <ProductCard product={r} />
          </div>
        )):(<div className="text-center"> No Related Products Found</div>)}
        </div>
        {/* {JSON.stringify(product)} */}
        </div>
  )
}

export default Product