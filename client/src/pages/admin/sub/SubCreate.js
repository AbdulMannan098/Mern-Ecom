import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {createSub,getSub,getSubs,removeSub} from '../../../functions/sub'
import { useSelector } from 'react-redux'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'
import { getCategories } from '../../../functions/category'

const CategoryCreate=()=> {
  const {user}=useSelector((state)=>({...state}))

  const [name,setName]=useState("");
  const [loading,setLoading]=useState(false)
  const [subs,setSubs]=useState([])
  const [categories,setCategories]=useState([])  
  const [category,setCategory]=useState("")
  // step 1
  const [keyword,setKeyword]=useState("");
  
  useEffect(()=>{
    loadCategories();
    loadSubs()
  },[])

  const loadCategories = () => getCategories().then((c)=>{
    setCategories(c.data)
  });
  const loadSubs = () => getSubs().then((s)=>{
    setSubs(s.data)
  });
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSub({name, parent:category},user.token)
    .then((res)=>{
      setLoading(false);
      setName("");
      toast.success(`"${res.data.name}" Sub-Category has been created`)
      loadSubs()
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
      removeSub(slug,user.token)
      .then(res=>{
      setLoading(false)
      toast.error(`"${res.data.name}" Sub-Category has been deleted`)
      loadSubs();
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
          {loading ? <h4 className="text-danger">Loading..</h4> 
          : <h4>Create Sub Category</h4>}
          
          <div className="ant-form-inline col-3">
            <label>Parent Category</label>
            <select 
            name='category' 
            className="form-control"
            onChange={(e)=>setCategory(e.target.value)}
            >
            <option>Please Select</option>
                {categories.length >0 && 
                categories.map((c)=><option key={c._id} value={c._id}>
                    {c.name}
                    </option>)
                }
            </select>
          </div>
          
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
          {subs.filter(searched(keyword)).map((s)=>(
            <div className="alert alert-secondary" key={s._id}>
              {s.name} 
              <span
              onClick={()=>handleRemove(s.slug)} 
              className="btn btn-sm float-end">
                <DeleteOutlined className="text-danger"/>
                </span>
              <Link to={`/admin/sub/${s.slug}`}>
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