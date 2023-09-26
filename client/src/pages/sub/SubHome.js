import React, { useEffect, useState } from 'react'
import { getSub } from '../../functions/sub'
import ProductCard from '../../components/Cards/ProductCard'
import { useParams } from 'react-router-dom'


function SubHome() {
  const [sub,setSub]=useState({})
  const [products,setProducts]=useState([])
  const [loading,setLoading]=useState(false);

  const {slug}=useParams()
  
  useEffect(()=>{
    setLoading(true);
    getSub(slug)
    .then((res)=>{
        setLoading(false)
        console.log(JSON.stringify(res.data,null,4));
        setSub(res.data.sub)
        setProducts(res.data.Products)
    })
  },[])

    return (

    <div className='container-fluid'>
        <div className='row'>
            <div className='col'>
            {loading ? (
            <h4 className="text-center p-3 mt-3 mb-3 display-6 container-fluid text-sm-center p-5 bg-light text-secondary">
            Loading...
            </h4>
            ):(
            <h4 className='text-center p-3 mt-3 mb-3 display-6 container-fluid text-sm-center p-5 bg-light text-secondary'>
            {products.length} Products in '{sub.name}' Sub Category
            </h4>)}
            
            </div>
            </div>
            <div className='row'>
                {products.map((p)=>(
                    <div className='col' key={p._id}>
                        <ProductCard product={p}/>
                    </div>
                ))}
            </div>
    </div>
        )
}

export default SubHome