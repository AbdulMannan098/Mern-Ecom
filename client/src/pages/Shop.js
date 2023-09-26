import React, { useEffect, useState } from 'react'
import {fetchProductsByFilter, getProductsByCount} from '../functions/product'
import {useDispatch,useSelector} from 'react-redux'
import ProductCard from '../components/Cards/ProductCard'
import { Checkbox, Menu,Radio,Slider } from 'antd'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons'
import {getCategories} from '../functions/category'
import {getSubs}from '../functions/sub'
import Star from '../components/forms/Star'

const {SubMenu} =Menu

function Shop() {
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false)
    const [price,setPrice]=useState([0,0])
    const [ok,setOk]=useState(false)
    const [categories,setCategories]=useState([])
    const [categoryIds,setCategoryIds]=useState([])
    const [star,setStar]=useState("")
    const [subs,setSubs]=useState([])
    const [sub,setSub]=useState("")
    // const [brands,setBrands]=useState(["Apple","Samsung","Microsoft","Lenovo","Asus"])
    const [brand,setBrand]=useState("")
    // const [colors,setColors]=useState(["Black","Brown","Silver","White","Blue"])
    const [color,setColor]=useState("")
    const [shipping,setShipping]=useState("")
    
    
    let dispatch=useDispatch()

    const brands=["Apple","Samsung","Microsoft","Lenovo","Asus"]
    const colors=["Black","Brown","Silver","White","Blue"] 
    let {search}=useSelector((state)=>({...state}))
    const {text}=search

    useEffect(()=>{
        loadAllProducts();
        // fetch categories
        getCategories().then((res)=>setCategories(res.data))
        //fetch subcategories
        getSubs().then((res)=>setSubs(res.data))
    },[])

    const fetchProducts=(arg)=>{
        fetchProductsByFilter(arg).then((res)=>{
            setProducts(res.data);
        })
    }
    const handleResetAllFilters=()=>{
        setTimeout(() => {
            dispatch({
                type:"SEARCH_QUERY",
                payload:{text:""},
            })
            setColor("")
            setShipping("")
            setBrand("")
            setCategoryIds([])
            setPrice([0,0]);
            setStar("")
            setSub("")
        }, 2000);
        loadAllProducts();
    }
    // 1. load products by default on page load
    const loadAllProducts=()=>{
        setLoading(true)
        getProductsByCount(12).then((p)=>{
            setProducts(p.data)
            setLoading(false)
        })
    }

    // 2. load products on user search input
    useEffect(()=>{
        // console.log("load products on user search input",text);
        const delayed=setTimeout(()=>{
            fetchProducts({query:text});
        },300)
        return ()=>clearTimeout(delayed)
    },[text])
    //3. load products on price range
    useEffect(()=>{
        fetchProducts({price});
    },[ok])

    const handleSlider=(value)=>{
        dispatch({
            type:"SEARCH_QUERY",
            payload:{text:""},
        })
        setShipping("")
        setColor("")
        setBrand("")
        setCategoryIds([])
        setPrice(value);
        setStar("")
        setSub("")
        setTimeout(() => {
           setOk(!ok) 
        }, 300); 
    }

    //4. load products based on category
    // show categories in a list of checkbox
    const showCategories=()=>(
        categories.map((c)=>
        <div key={c._id}>
            <Checkbox 
            onChange={handleCheck} 
            style={{paddingBottom:"2px",paddingLeft:"4px",paddingRight:"4px" }}
            value={c._id}
            name="category"
            // checked={categoryIds.includes(c._id)}
            >
                {c.name}
            </Checkbox>
        </div>
        )
    )
    const handleCheck=(e)=>{
        dispatch({
            type:"SEARCH_QUERY",
            payload:{text:""},
        })
        setShipping("")
        setColor("")
        setBrand("")
        setPrice([0,0]);
        setStar("")
        setSub("")
    //    console.log(e.target.value);
        let inThestate=[...categoryIds];
        let justChecked=e.target.value;
        let foundInTheState=inThestate.indexOf(justChecked) // index or -1

        // indexOf method ?? if not found returns -1 else return index
        if(foundInTheState===-1){
            inThestate.push(justChecked);
        }else{
            // if found pull out one item from index
            inThestate.splice(foundInTheState,1);
        }
        setCategoryIds(inThestate);
        // console.log((inThestate));
        fetchProducts({category:inThestate})
    }
    // show products by star ratings
    const handleStarClick=(num)=>{
            console.log(num);
            dispatch({
                type:"SEARCH_QUERY",
                payload:{text:""},
            })
            setShipping("")
            setColor("")
            setBrand("")
            setStar(num)
            setPrice([0,0]);
            setCategoryIds([])
            fetchProducts({stars:num})
            setSub("")
        }
    const showStars=()=>{
        return(
            <div className=' pb-4 d-inline' style={{paddingLeft:"4px",paddingRight:"4px"}}>
                <Star starClick={handleStarClick} numberOfStars={5}/>
                <br/>
                <Star starClick={handleStarClick} numberOfStars={4}/>
                <br/>
                <Star starClick={handleStarClick} numberOfStars={3}/>
                <br/>
                <Star starClick={handleStarClick} numberOfStars={2}/>
                <br/>
                <Star starClick={handleStarClick} numberOfStars={1}/>
            </div>
        )
    }
    // show products by subs
    const showSubs=()=>subs.map((s)=>(<div
        className='m-1 p-1 badge bg-secondary' 
        key={s._id}
        onClick={()=>{handleSub(s)}}
        style={{cursor:"pointer"}}
        >{s.name}
        </div>));
    const handleSub=(sub)=>{
        console.log("SUB",sub);
        setSub(sub);
        dispatch({
            type:"SEARCH_QUERY",
            payload:{text:""},
        })
        setShipping("")
        setColor("")
        setBrand("")
        setStar("")
        setPrice([0,0]);
        setCategoryIds([])
        fetchProducts({sub})
    }
    // show products by brands
    const showBrands=()=>
            brands.map((b)=>(
                <div>
                <Radio
                value={b}
                name={b}
                checked={b === brand}
                onChange={handleBrand}
                className='pb-1 pl-4 pr-4'
                >
                    {b}
                </Radio>
                <br/>
                </div>
            ));
    const handleBrand=(e)=>{
        setSub("");
        dispatch({
            type:"SEARCH_QUERY",
            payload:{text:""},
        })
        setShipping("")
        setColor("")
        setStar("")
        setPrice([0,0]);
        setCategoryIds([])
        setBrand(e.target.value)  
        fetchProducts({brand:e.target.value})
    }
    // show products by star color 
    const showColors=()=>
         colors.map((c)=>(
            <div>
            <Radio
            value={c}
            name={c}
            checked={c === color}
            onChange={handleColor}
            className='pb-1 pl-4 pr-4'
            >
                {c}
            </Radio>
            </div>
                ))
            const handleColor=(e)=>{
                setSub("");
                dispatch({
                    type:"SEARCH_QUERY",
                    payload:{text:""},
                })
                setShipping("")
                setStar("")
                setPrice([0,0]);
                setCategoryIds([])
                setBrand("")
                setColor(e.target.value)  
                fetchProducts({color:e.target.value})
            }        
            // show products by shipping
            const showShipping=()=>(
                <>
                <Checkbox
                style={{paddingBottom:"2px",paddingLeft:"4px",paddingRight:"4px"}}
                value="Yes"
                onChange={handleShippingChange}
                checked={shipping ==="Yes"}
>
                Yes
</Checkbox>
                <br/>
                <Checkbox
                style={{paddingBottom:"2px",paddingLeft:"4px",paddingRight:"4px"}}
                value="No"
                onChange={handleShippingChange}
                checked={shipping ==="No"}
>
                No
</Checkbox>
                </>
            )

            const handleShippingChange=(e)=>{
                setSub("");
                dispatch({
                    type:"SEARCH_QUERY",
                    payload:{text:""},
                })
                setStar("")
                setPrice([0,0]);
                setCategoryIds([])
                setBrand("")
                setShipping(e.target.value)
                fetchProducts({shipping:e.target.value})
            }
    return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-3 pt-2'>
            <h4>Search/Filters</h4>
            <hr/>
            <Menu mode='inline' defaultOpenKeys={['1','2','3','4','5','6','7']}>
            <button className='h4' onClick={handleResetAllFilters}>Reset All filters</button>
                 {/* price */}
                 <SubMenu key="1" title={<span className='h6'><DollarOutlined/>Price</span>}>
                    <div>
                        <Slider 
                        style={{marginLeft:"2px",marginRight:"2px"}} 
                        tipFormatter={(v)=>`$${v}`} 
                        range 
                        value={price}
                        onChange={handleSlider}
                        max="4999"
                        />
                    
                    </div>
                 </SubMenu>
                 {/* category */}
                 <SubMenu key="2" title={<span className='h6'><DownSquareOutlined/>
                 Categories
                 </span>}>
                    <div>
                       {showCategories()}
                    </div>
                 </SubMenu>
                 {/* stars */}
                 <SubMenu key="3" 
                 title={<span className='h6'>
                    <StarOutlined/>
                 Rating
                 </span>}>
                    <div>
                       {showStars()}
                    </div>
                 </SubMenu>
                {/* sub categories */}
                <SubMenu key="4" title={<span className='h6'>
                <DownSquareOutlined/>
                Sub Categories
                </span>}>
                <div style={{marginTop:"-10px"}} className='pl-4 pr-4'>
                {showSubs()}
                </div>
                </SubMenu>
                <SubMenu key="5" title={<span className='h6'>
                <DownSquareOutlined/>
                Brands
                </span>}>
                <div style={{marginTop:"-10px"}} className='pl-4 pr-4'>
                {showBrands()}
                </div>
                </SubMenu>
                <SubMenu key="6" title={<span className='h5'>
                    <DownSquareOutlined/>
                    Colors
                </span>}>
                <div style={{marginTop:"-10px"}} className='pl-4 pr-4'>
                    {showColors()}
                </div>
                </SubMenu>
                <SubMenu key="7" title={<span className='h5'>
                    <DownSquareOutlined/>
                    Shipping
                </span>
                }>
                    <div style={{marginTop:"-10px"}} className='pl-4 pr-4'>
                        {showShipping()}
                    </div>
                </SubMenu>
            </Menu>
            </div>
            <div className='col-md-9 pt-3'>
                {loading ? (
                    <h4 className="text-danger">Loading...</h4>
                ) : (
                    <h4 className="text-danger">Products</h4>
                )
                }
                {products.length <1 && <p>No Products Found</p>}
                <div className='row pb-5 mt-3'>
                {(products.map((p)=>(
                    <div key={p._id} className="col-md-4">
                        <ProductCard product={p}/>
                    </div>
                )))}
            </div>
            </div>
        </div>
    </div>
  )
}

export default Shop