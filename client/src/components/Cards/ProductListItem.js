import React from 'react'
import { Link } from 'react-router-dom'

function ProductListItem({product}) {
    const {price,brand,category,color,description,sold,quantity,shipping,subs}=product
  return (
 <ul className="list-group">
    <li className="list-group-item 
    d-flex justify-content-between align-items-centerlist-group-item d-flex justify-content-between align-items-center">
            Price{" "}        
        <span className="bg" >
            $ {price}
        </span>
    </li>
 
    {category && (
        <li className="list-group-item 
        d-flex justify-content-between align-items-centerlist-group-item d-flex justify-content-between align-items-center">
        Category
        <Link 
        to={`/category/${category.slug}`}
        className="bg" >
            {category.name}
        </Link>
    </li>
    )}
    {subs && (
    <li className="list-group-item 
    d-flex justify-content-between align-items-centerlist-group-item d-flex justify-content-between align-items-center">
       Sub Categories(s)    
        {subs.map((s)=>(
            <Link 
            key={s._id}
            to={`/sub/${s.slug}`}
            className="bg" >
        {s.name}
        </Link>
        ))}
        </li>
    )}
    <li className="list-group-item 
    d-flex justify-content-between align-items-centerlist-group-item d-flex justify-content-between align-items-center">
        Shipping{" "}
        <span className="bg" >
            {shipping}
        </span>
    </li>
    <li className="list-group-item 
    d-flex justify-content-between align-items-centerlist-group-item d-flex justify-content-between align-items-center">
        color
        <span className="bg" >
            {color}
        </span>
    </li>
    <li className="list-group-item 
    d-flex justify-content-between align-items-centerlist-group-item d-flex justify-content-between align-items-center">
        Brand{" "}
        <span className="bg" >
            {brand}
        </span>
    </li>
    <li className="list-group-item 
    d-flex justify-content-between align-items-centerlist-group-item d-flex justify-content-between align-items-center">
        Available
        <span className="bg" >
            {quantity}
        </span>
    </li>
    <li className="list-group-item 
    d-flex justify-content-between align-items-centerlist-group-item d-flex justify-content-between align-items-center">
        Sold{" "}
        <span className="bg" >
            {sold}
        </span>
    </li>
    
 </ul>
    )
}

export default ProductListItem