import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {getCategory, updateCategory} from '../../../functions/category'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryUpdate=()=> {
  const {user}=useSelector((state)=>({...state}))

  const [name,setName]=useState("");
  const [loading,setLoading]=useState(false)

  let params=useParams()
  let navigate=useNavigate();

  let {slug}=params;

  useEffect(()=>{
    loadCategory();
  },[])
  const loadCategory=()=>
  getCategory(slug).then((c)=>setName(c.data.name)); 

  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateCategory(slug,{name},user.token)
    .then((res)=>{
      setLoading(false);
      setName("")
      toast.success(` Category has been Updated to "${res.data.name}"`)
      navigate('/admin/category')  
    })
    .catch((err)=>{
      setLoading(false);
      // toast.error("Category create Failed")
      if(err.response.status===400) toast.error(err.response.data)
      console.log(err);
    });
  }

  return (
    <div className="container-fluid">
    <div className='row'>
        <div className="col-md-2">
        <AdminNav/>
        </div>
        <div className='col'>
        {loading ? <h4 className="text-danger">
        Loading..</h4> : 
        <h4>Update category</h4>}
         <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
 
          {/* {updateCategoryForm()} */}
        </div>
    </div>
    </div>
)
}

export default CategoryUpdate