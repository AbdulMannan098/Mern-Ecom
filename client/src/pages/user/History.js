import React from 'react'
import UserNav from '../../components/nav/UserNav';

const HistoryComp=()=> {
  return (
    <div className="container-fluid">
        <div className='row'>
            <div className="col-md-2">
            <UserNav/>
            </div>
            <div className='col'>
                User history Page
            </div>
        </div>
        </div>
  )
}

export default HistoryComp