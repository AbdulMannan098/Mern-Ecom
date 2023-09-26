import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProducutCardInCheckout from '../components/Cards/ProducutCardInCheckout'

const Cart = () => {
  const {user,cart}=useSelector((state)=>({...state}))
  const dispatch=useDispatch()
  const saveOrderToDb=()=>{
// 
  }
  const getTotal=()=>{
    return cart.reduce((currentValue,nextValue)=>{
        return currentValue + nextValue.count *    nextValue.price
    },0)
  }
  const showCart=()=>(
    <table className='table table-bordered'>
        <thead className='thead-light'>
            <tr> 
                <th scope='col'>Image</th>
                <th scope='col'>Title</th>
                <th scope='col'>Price</th>
                <th scope='col'>Brand</th>
                <th scope='col'>Color</th>
                <th scope='col'>Count</th>
                <th scope='col'>Shipping</th>
                <th scope='col'>Remove</th>
                </tr>
        </thead>
        {cart.map((p)=>
        <ProducutCardInCheckout key={p._id} p={p}/>
        )}
    </table>
  )

    return (
    <div className='container-fluid pt-2'>
            <div className='row'>
                    <div className='col-md-8'>
                    <h4>Cart / {cart.length} Products </h4> 
                    {!cart.length ? (<p>No Products in cart. <Link to="/shop">Continue Shopping</Link>
                    </p>
                    ):(
                        showCart()
                    )}
                    </div>
                    <div className='col-md-4'>
                    <h4>Order Summary</h4>
                    <hr/>
                    <p>Products</p>
                    {cart.map((c,i)=>(
                        <div key={i}>
                        <p>{c.title} x {c.count} = ${c.price * c.count}</p>
                        </div>
                    ))}
                    <hr/>
                    Total: <b>${getTotal()}</b>
                    <hr/>
                    {user ? (
                        <button onClick={saveOrderToDb}
                        className='btn btn-sm btn-primary mt-2'
                        disabled={!cart.length}
                        >Proceed to checkout</button>
                        ):(
                            <div>        
                        <button className='btn btn-sm btn-primary mt-2'>
                        <Link to={{
                            pathname:'/login',
                            state:{from:"cart"}
                        }}
                        >
                            Login to checkout
                            </Link>
                             </button>
                          </div>
                        )}
                    </div>
                    </div>
            </div> 
  )
}

export default Cart