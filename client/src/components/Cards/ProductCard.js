import React, { useState } from 'react'
import {Card, Tooltip} from 'antd'
import laptop from '../../images/laptop.png'
import { Link } from 'react-router-dom'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { showAverage } from '../../functions/rating'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

const {Meta}=Card


function ProductCard({product}) {
  const [tooltip,setTooltip]=useState("Click to add")
 //destructure
 const {images,title,description,slug,price}=product

//  redux
const {user,cart}=useSelector((state)=>({...state}))
const dispatch=useDispatch();

 
 const handleAddToCart=()=>{
  // console.log("getitemcart",localStorage.getItem('cart'));  
  // create cart array
    let cart=[]
    if(typeof window !=='undefined'){
      if(localStorage.getItem('cart')){
        cart=JSON.parse(localStorage.getItem('cart'))
      }
      // push new product to cart
      cart.push({
        ...product,
        count:1,
      })
      // save cart to local storage
      const unique=_.uniqWith(cart,_.isEqual)
      // save to localstorage\
      console.log("unique",unique);
      localStorage.setItem('cart',JSON.stringify(unique))
      //show tooltip
      setTooltip("added")
      // add to redux
      dispatch({
        type:'ADD_TO_CART',
        payload:unique
      })
    }
 }

    return (
    <>
    {product && product.ratings.length>0 ? 
    (showAverage(product))
    :(<div className="text-center pt-1 pb-3"> No Rating Yet</div>)
    }
        <Card 
        cover={<img src={images && images.length ? images[0].url:laptop}
        style={{height:"150px",objectFit:"cover"}}
        className="p-1" alt=''
        /> }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning"/> <br/> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} >
          <ShoppingCartOutlined
          className="text-danger"/> <br/> Add to Cart 
       </a>
          </Tooltip>
        ]}
        >
            <Meta title={`${title} - $${price}`} description={`${description && description.substring(0,40)}...`}/>
        </Card>
      </>
    
      )
}

export default ProductCard