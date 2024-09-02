import React, { useContext} from 'react'
import './Offer.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import {assets} from '../../assets/assets'


const Offer =  () => {

  const {token,backurl,offerData,bookingData,setBookingData}=useContext(StoreContext)
  if(!token){
    return (
      <div className='sign-in'>
      <img src={assets.profile_icon} alt='' />
      <p>Please sign in to continue...</p>
      </div>
    )
  }

  const placeBooking= async ()=>{

    const priceData={
      price:bookingData.price
    }
    let updateData=await axios.post(backurl+"/api/user/update",bookingData,{headers:{token}})
    let response=await axios.post(backurl+"/api/booking/place",priceData)
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url)
    }else{
      alert("ERROR")
    }
  }

  function Duration(duration) {
    // Regular expression to extract hours and minutes
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const matches = duration.match(regex);
    
    // Extract hours and minutes
    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;

    let result = '';
    if (hours > 0) {
        result += hours + ' hour' + (hours > 1 ? 's' : '') + ' ';
    }
    if (minutes > 0) {
        result += minutes + ' minute' + (minutes > 1 ? 's' : '');
    }

    return result.trim();
}


  return (
    <div>
        {offerData.map( (item,index)=>{
      return (
        <div className='ticket-container'>
        <div className='container-right'>
        { 
          item.itineraries[0].segments.map((segment,index)=>{
            return (<>
              <span>{segment.departure.at.slice(11)}</span>
              <p>{segment.departure.iataCode}</p>
              </>
            )
          })
        } 
        </div>
        <div className='container-center'>
          <p>{Duration(item.itineraries[0].duration)}</p>
          <span>₹{item.price.total}</span>
        </div>
        <div className='container-left'>
        { 
          item.itineraries[0].segments.map((segment,index)=>{
            return (<>
              <span>{segment.arrival.at.slice(11)}</span>
              <p>{segment.arrival.iataCode}</p>
              </>
            )
          })
        }
        </div>
        <div className='button-container'>
      <button onClick={async ()=>{
      setBookingData({
      from:item.itineraries[0].segments[0].departure.iataCode,
      to:item.itineraries[0].segments[item.itineraries[0].segments.length-1].arrival.iataCode,
      price:item.price.total,
      date:item.itineraries[0].segments[0].departure.at.slice(0,10),
      paymentStatus:false
      }
    );
    await placeBooking()
    }
    }>Book</button>
        </div> 
        </div>
      )
    })}
    </div>
  )
}

export default Offer
