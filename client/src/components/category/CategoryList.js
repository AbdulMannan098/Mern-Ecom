import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {getCategories} from '../../functions/category'

function CategoryList() {
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    setLoading(true)
    getCategories().then((c)=>{
        setLoading(false);
        setCategories(c.data)
    })
  },[])

  const showCategories=()=>categories.map((c)=>(
    <div key={c._id} className="btn btn-outline-primary btn-lg btn-block m-3 btn-raised col">
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
    </div>
  ))

  

    return (
    <div className="container">
        <div className='row'>
        {loading ? 
        (<h4 className="text-center">Loading</h4>)
        : (showCategories())}
        </div>
        </div>
  )
}

export default CategoryList