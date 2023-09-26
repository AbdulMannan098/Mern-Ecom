import { StarOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import { redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
function RatingModal({children}) {
  const {user}=useSelector((state)=>({...state}))
  const [modalVisible,setModalVisible]=useState(false)  
  let navigate=useNavigate()
  let {slug}=useParams();
  const location=useLocation();

  const handleModal=()=>{
    if(user && user.token){
        setModalVisible(true)
    }else{
        // navigate('/login')
        navigate(
            '/login'
            ,{
                state:{from :`/product/${slug}`}
            // state:location.pathname
            }// state:{from :`/product/${slug}`}
        )
    }
  }

  return (
    <>
    <div onClick={handleModal}>
        <StarOutlined className="text-danger"/><br/>{" "}
        {user ? "Leave Rating":"Login to leave rating"}
    </div>
    <Modal
    title="Leave your rating"
    centered
    visible={modalVisible}
    onOk={()=>{
        setModalVisible(false);
        toast.success("Thanks for your review. It will appear soon")
    }}
    onCancel={()=>setModalVisible(false)}
    >
    {children}
    </Modal>
    </>
    )
}

export default RatingModal