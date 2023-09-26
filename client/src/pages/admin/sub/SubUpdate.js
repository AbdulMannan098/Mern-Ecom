import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import { getCategories } from '../../../functions/category'
import { getSub,updateSub } from '../../../functions/sub'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CategoryForm from '../../../components/forms/CategoryForm'

const SubUpdate=()=> {
  const {user}=useSelector((state)=>({...state}))

  const [name,setName]=useState("");
  const [loading,setLoading]=useState(false)
  const [categories,setCategories]=useState([]);
  const [parent,setParent]=useState("")

  let params=useParams()
  let navigate=useNavigate();

  let {slug}=params;
  
  useEffect(()=>{
    loadCategories();
    loadSub();
  },[])
//   const loadCategory=()=>
//   getCategory(slug).then((c)=>setName(c.data.name)); 
const loadCategories = () => getCategories().then((c)=>{
    setCategories(c.data)
  });
  
const loadSub=()=>
  getSub(slug).then((s)=>{
    setName(s.data.name)
    setParent(s.data.parent)
  })

  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSub(slug,{name,parent},user.token)
    .then((res)=>{
      setLoading(false);
      setName("")
      toast.success(`Sub-Category has been Updated to "${res.data.name}"`)
      navigate('/admin/sub')  
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
        <h4>Update Sub Category</h4>}
         <div className="form-check-inline col-3">
            <label>Parent Category</label>
         <select
         name='category'
         className="form-control"
         onChange={(e)=>setParent(e.target.value)}
         >
            <option>Please Select</option>
            {categories.length>0 && 
            categories.map((c)=>(
                <option key={c._id} value={c._id} selected={c._id=== parent}>
                    {c.name}
                </option>
            ))
            }
         </select>
         </div>
         <CategoryForm 
         handleSubmit={handleSubmit} 
         name={name} 
         setName={setName} />
          {/* {updateCategoryForm()} */}
        </div>
    </div>
    </div>
)
}
export default SubUpdate