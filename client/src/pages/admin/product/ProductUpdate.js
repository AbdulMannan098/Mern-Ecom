import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct, getProduct, updateProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import {getCategories, getCategorySubs} from '../../../functions/category'
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from '@ant-design/icons'
import { useNavigate, useParams } from "react-router-dom";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";


const initialState={
    title:"",
    description:"",
    price:"",
    // categories:[],
    category:"",
    subs:[],
    shipping:"",
    quantity:"",
    images:[],
    colors:["Black","Brown","Silver","White","Blue"],
    brands:["Apple","Samsung","Microsoft","Lenovo","ASUS"],
    color:"",
    brand:"",
};

const ProductUpdate=()=>{ 
 
    const [values,setValues]=useState(initialState);
    const [categories,setCategories]=useState([])
    const [subOptions,setSubOptions]=useState([])
    const [arrayOfSubs,setArrayOfSubs]=useState([])
    const [selectedCategory,setSelectedCategory]=useState("")
    const [loading,setLoading]=useState(false);

    const {user}=useSelector((state)=>({...state}))

    let {slug}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        loadProduct();
        loadCategories();
    },[])
    const loadProduct=()=>{
        getProduct(slug)
        .then((p)=>{
            // console.log("single product",p);
        // load single product
            setValues({...values,...p.data})
        // load single product category subs
        console.log(p.data);
        getCategorySubs(p.data.category._id)
        .then((res)=>{
            setSubOptions(res.data)
        })
        // prepare array of sub ids to show as default sub values in antd select
        let arr=[]
        p.data.subs.map((s)=>{
            arr.push(s._id);
        });
        setArrayOfSubs((prev)=>arr) // required for antd Select to work
    })
        }
     
    const loadCategories=()=>{
        getCategories().then((c)=>{
        setCategories(c.data)
    })
    } 

        const handleSubmit=(e)=>{
            e.preventDefault();
            setLoading(true)

            values.subs=arrayOfSubs;
            values.category=selectedCategory ? selectedCategory : values.category;

            updateProduct(slug,values,user.token)
            .then((res)=>{
                setLoading(false);
                console.log(res);
                toast.success(`${res.data.title} has been updated`)
                navigate('/admin/products')
            })
            .catch((err)=>{
                setLoading(false);
                console.log("update product error",err);
                // if (err.response.status === 400) toast.error(err.response.data)
                toast.error(err.response.data.err)
            })
        }
        const handleChange=(e)=>{
            setValues({...values,[e.target.name]:e.target.value})
        }
    
        const handleCategoryChange=(e)=>{
            e.preventDefault();
            console.log("Clicked Category --->",e.target.value);
            setValues({...values,subs:[]});
            setSelectedCategory(e.target.value);
            getCategorySubs(e.target.value)
            .then(res=>{
                console.log("sub options on category click",res);
                setSubOptions(res.data);
            });
            //if user click back to the original category
            // show its sub categories
            if(values.category._id === e.target.value){
                loadProduct();
            }
            // clear old sub category ids
            setArrayOfSubs([])
            }
    
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                <AdminNav/>
                </div>
                <div className="col-md-10">
                {loading ? < LoadingOutlined className="text-danger h1"/>
                 :<h4>Product Update</h4>
                }
            {/* {JSON.stringify(values)} */}
                <div className="p-3">
                <FileUpload 
                values={values}
                setValues={setValues}
                setLoading={setLoading}
           />
              </div>
                <hr/>
                <ProductUpdateForm 
                values={values}
                setValues={setValues}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleCategoryChange={handleCategoryChange}
                categories={categories}
                subOptions={subOptions}
                arrayOfSubs={arrayOfSubs}
                setArrayOfSubs={setArrayOfSubs}
                selectedCategory={selectedCategory}
/>
               </div>
            </div>
        </div>
    )
}

export default ProductUpdate;