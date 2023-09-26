import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {SearchOutlined} from '@ant-design/icons'

function Search() {
  const dispatch=useDispatch();
  const {search} =useSelector((state)=>({...state}))
  const {text}=search;
  let navigate=useNavigate();

  const handleSubmit=(e)=>{
  e.preventDefault();
  navigate(`/shop?${text}`)   
  }

  const handleChange=(e)=>{
    dispatch({
      type:"SEARCH_QUERY",
      payload:{text:e.target.value}
    })
  }

  
  return (
  <form className="ant-form-inline my-2 my-lg-0" 
  onSubmit={handleSubmit} 
  style={{display:"inline",}}
  >
  <input
  onChange={handleChange}
  type="search"
  value={text}
  className="ms-sm-2 form-control"
  placeholder="Search"
  // style={{backgroundColor:"beige"}}
  />
  {/* <SearchOutlined
   className="btn btn-secondary float-end"
   onClick={handleSubmit} 
   style={{cursor:"pointer",display:"inline"}}/> */}
  </form>
  )
}

export default Search