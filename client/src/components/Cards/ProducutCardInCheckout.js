import React, { useState } from 'react'
import ModalImage from 'react-modal-image'
import laptop from '../../images/laptop.png'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'


const ProducutCardInCheckout = ({p}) => {
    
    const [colors,setColors]=useState(["Black","Brown","Silver","White","Blue"])
    const dispatch=useDispatch()
    
    const handleColorChange=(e)=>{
        console.log('color changed',e.target.value);
    
        let cart=[]
        if(typeof window !=="undefined"){
            if(localStorage.getItem('cart')){
                 cart=JSON.parse(localStorage.getItem("cart"))
            }
            
            cart.map((product,i)=>{
                if(product.id===p._id){
                cart[i].color=e.target.value;
        }})
        console.log('cart update color',cart);
        localStorage.setItem("cart",JSON.stringify(cart))
        dispatch({
            type:"ADD_TO_CART",
            payload:cart,
        })    
    }
    }

  return (
    <tbody>
        <tr>
        <td>
        <div 
        style={{width:"100px", height:"auto"}}
        >
        {p.images.length ? 
        (<ModalImage small={p.images[0].url} large={p.images[0].url} />)
        :(
        <ModalImage small={laptop} large={laptop} />)}
        </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>
            <select
            onChange={handleColorChange}
            name="color"
            className='form-control'
            >
                {p.color ? (<option value={p.color}>{p.color}</option>):(<option>Select</option>)}
                {colors.filter((c)=>c!==p.color).map((c)=>(
                <option key={c} value={c}>
                    {c}
                </option>
                ))}
            </select>
        </td>
        <td>{p.count}</td>
        <td>{p.shipping}</td>
        <td>{<DeleteOutlined/>}</td>
        </tr>
    </tbody>
 
    )
}

export default ProducutCardInCheckout