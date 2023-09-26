import React, { useState } from 'react'
import {Card, Tabs,Tooltip} from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import laptop from '../../images/laptop.png'
import ProductListItem from './ProductListItem'
import StarRating from 'react-star-ratings'
import RatingModal from '../Modal/RatingModal'
import { showAverage } from '../../functions/rating'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

const {TabPane}=Tabs
const {Meta}=Card;

function SingleProduct({product,onStarClick,star}) {
  const {_id,title,description,images,slug}=product;

  const [tooltip,setTooltip]=useState("Click to add")

  const {user,cart}=useSelector((state)=>({...state}))
  const dispatch=useDispatch()

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
     <div className="col-md-7">
        {images && images.length ?(<Carousel 
        showArrows={true} 
        autoPlay 
        infiniteLoop>
        {images && images.map((i)=>
        <img src={i.url} key={i.public_id}/>)}
        </Carousel>):
        (
            <Card
            cover={<img src={laptop} className="mb-3 card-image"/>}
            />
        )}
        <Tabs>
            <TabPane tab="Description" key="1">
                {description && description}
            </TabPane>
            <TabPane tab="More Info" key="2">
                Feel Free and contact Us on number
            </TabPane>
        </Tabs>
        </div>   

        <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 
        ? showAverage(product) : <div className="text-center pt-1 pb-3">No Rating yet</div>
        }
            
            <Card 
            actions={
            [
            <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} >
            <ShoppingCartOutlined
            className="text-danger"/> <br/> Add to Cart 
            </a>
            </Tooltip>,
            <Link to="/"><HeartOutlined className="text-info"/><br/> Add to Wishlist</Link>,
                <RatingModal>
                <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
                />
                </RatingModal>
            
            ]
        }><ProductListItem product={product}/>
            </Card>
        </div>
    </>
  )
}

export default SingleProduct