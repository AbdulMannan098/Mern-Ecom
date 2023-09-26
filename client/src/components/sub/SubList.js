import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {getSubs} from '../../functions/sub'

function SubList() {
  const [subs,setsubs]=useState([]);
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    setLoading(true)
    getSubs().then((res)=>{
        setLoading(false);
        setsubs(res.data)
    })
  },[])

  const showSubs=()=>subs.map((s)=>(
    <div key={s._id} className="btn btn-outline-primary btn-lg btn-block m-3 btn-raised col">
        <Link to={`/sub/${s.slug}`}>{s.name}</Link>
    </div>
  ))

  

    return (
    <div className="container">
        <div className='row'>
        {loading ? 
        (<h4 className="text-center">Loading</h4>)
        : (showSubs())}
        </div>
        </div>
  )
}

export default SubList