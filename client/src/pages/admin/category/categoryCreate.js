import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {createCategory,getCategories,removeCategory} from '../../../functions/category'
import { useSelector } from 'react-redux'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const CategoryCreate=()=> {
  const {user}=useSelector((state)=>({...state}))

  const [name,setName]=useState("");
  const [loading,setLoading]=useState(false)
  const [categories,setCategories]=useState([])

  // step 1
  const [keyword,setKeyword]=useState("");
  
  useEffect(()=>{
    loadCategories();
  },[])

  const loadCategories = () => getCategories().then((c)=>{
    setCategories(c.data)
  });
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({name},user.token)
    .then((res)=>{
      setLoading(false);
      setName("");
      toast.success(`"${res.data.name}" Category has been creted`)
      loadCategories()
    })
    .catch((err)=>{ 
      setLoading(false);
      // toast.error("Category create Failed")
      if(err.response.status===400) toast.error(err.response.data)
      console.log(err);
    });
  }

  const handleRemove=async(slug)=>{
    if(window.confirm("Delete?")){
      setLoading(true)
      removeCategory(slug,user.token)
      .then(res=>{
      setLoading(false)
      toast.error(`"${res.data.name}" Category has been deleted`)
      loadCategories();
      })
      .catch((err)=>{
        if(err.response.status===400) {
          setLoading(false)
          toast.error(err.response.data)
      }
      })
    }
  }
 

  // step 4
  const searched=(keyword)=>(c)=>c.name.toLowerCase().includes(keyword)

  return (
    <div className="container-fluid">
    <div className='row'>
        <div className="col-md-2">
        <AdminNav/>
        </div>
        <div className='col'>
          {loading ? <h4 className="text-danger">Loading..</h4> : <h4>Create category</h4>}
          <CategoryForm 
          handleSubmit={handleSubmit} 
          name={name} 
          setName={setName} />
          {/*step 2 & 3 */}
          <br/>
          <h6>Search</h6>
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />  

          <br/>
          {/* step 5 */}
          {categories.filter(searched(keyword)).map((c)=>(
            <div className="alert alert-secondary" key={c._id}>
              {c.name} 
              <span
              onClick={()=>handleRemove(c.slug)} 
              className="btn btn-sm float-end">
                <DeleteOutlined className="text-danger"/>
                </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-end">
                  <EditOutlined className="text-warning"/>
                  </span></Link>
              </div>
          ))}
        </div>
    </div>
    </div>
)
}

export default CategoryCreate