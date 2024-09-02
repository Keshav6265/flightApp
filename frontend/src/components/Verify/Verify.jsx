import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Verify = () => {

    const {paymentSuccess,setPaymentSuccess} =useContext(StoreContext)
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get('success')
    const navigate=useNavigate();

    const verifyPayment=()=>{
        if(success==='true'){
            setPaymentSuccess(true);
            navigate('/history')
        }else{
            setPaymentSuccess(false)
            navigate('/')
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[])

  return (
    <div className='verify'>
    <div className='spinner'></div>
    </div>
  )
}

export default Verify
