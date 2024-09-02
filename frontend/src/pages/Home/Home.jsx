import React, { useContext, useState } from 'react'
import Header from '../../components/Header/Header'
import './Home.css'
import AppDownload from '../../components/AppDownload/AppDownload'
import { StoreContext } from '../../context/StoreContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { assets } from '../../assets/assets'

const Home = () => {
  
  const [way,setWay]=useState('')
  const [loading,setLoading]=useState(false)
  const {backurl,flightData,setFlightData,setOfferData}=useContext(StoreContext)

  const navigate=useNavigate()

  const fetchFlights=async (event)=>{
    event.preventDefault()
    let url=""
    if(flightData.returnDate!==""){
     url=backurl+`/api/flights/offers?originLocationCode=${flightData.originLocationCode}&destinationLocationCode=${flightData.destinationLocationCode}&departureDate=${flightData.departureDate}&returnDate=${flightData.returnDate}&adults=${flightData.adults}&carrierclassName=${flightData.carrierClass}&max=10`;
    }else{
      url=backurl+`/api/flights/offers?originLocationCode=${flightData.originLocationCode}&destinationLocationCode=${flightData.destinationLocationCode}&departureDate=${flightData.departureDate}&adults=${flightData.adults}&carrierclassName=${flightData.carrierClass}&max=10`;
    }
    
    try {
      setLoading(true);
      const data=await axios.get(url)
      await setOfferData(data.data.flights)
      navigate('/offer')
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setFlightData(flightData=>({...flightData,[name]:value}))
  }

  return (
    <div >
      <Header />
        {loading?<div className='load'><img src={assets.spinner} alt='' /><p>Loading...</p></div>:
        <>
        <div className='container'>
      <div className='way'>
        <h5 onClick={()=>setWay('one')} className={way==='one'?'active':''}>One Way</h5>
        <h5 onClick={()=>setWay('round')} className={way==='round'?'active':''}>Round Trip</h5>
      </div>
      <form onSubmit={fetchFlights}>
        <div className='inputs'>
          <input name='originLocationCode' onChange={onChangeHandler} value={flightData.originLocationCode} type='text' placeholder='From' required/>
          <input name='destinationLocationCode' onChange={onChangeHandler} value={flightData.destinationLocatoinCode} type='text' placeholder='To' required/>
          <label> Departure </label>
          <input name='departureDate' onChange={onChangeHandler} value={flightData.departureDate} type='date' placeholder='Departure' required/>
          { way==='round'?<>
          <label> Return </label>
          <input name='returnDate' onChange={onChangeHandler} value={flightData.returnDate} type='date' required/>
          </>
          :<></>
          }
        </div>
        <div className='other-inputs'>
        <input name='adults' onChange={onChangeHandler} value={flightData.adults} type='number' placeholder='Number of passengers' min={1} required/>
        <label> Travel Class </label>
         <select onChange={onChangeHandler} name='carrierClass'>
          <option value={flightData.ECONOMY}>Economy</option>
          <option value={flightData.PREMIMUN_ECONOMY}>Premium Economy</option>
          <option value={flightData.BUSINESS}>Business</option>
          <option value={flightData.FIRST}>First</option>
         </select>
         </div>
         <button type='submit' className='search-btn'>Search</button>
      </form>
      </div>
      <AppDownload />
        </>}
    </div>
  )
}

export default Home
