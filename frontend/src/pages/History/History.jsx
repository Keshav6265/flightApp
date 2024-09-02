import React, { useEffect, useState } from 'react'
import './History.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const History = () => {
  const {token,paymentSuccess,backurl}=useContext(StoreContext)
  
  if(!token){
    return (
      <div>
      <div className='sign-in'>
      <p>Please sign in to view travel history...</p>
      </div>
      </div>
    )
  }

  return (
    <div>
    {

    }
    </div>
  )
}

export default History
