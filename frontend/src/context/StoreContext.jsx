import { createContext,useEffect,useState } from "react";
import axios from 'axios'


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const backurl="http://localhost:4000";

    const [token,setToken]=useState("");
    const [paymentSuccess,setPaymentSuccess]=useState(false);
    const [flightData,setFlightData]=useState({
      originLocationCode:"",
      destinationLocationCode:"",
      departureDate:"",
      returnDate:"",
      adults:1,
      carrierClass:"ECONOMY",
    })


    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })

    const [offerData,setOfferData]=useState(null)
    const [bookingData,setBookingData]=useState(null)

    useEffect(()=>{
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
      }
    },[])

    const contextValue = {
        data,
        setData,
        backurl,
        token,
        setToken,
        flightData,
        setFlightData,
        offerData,
        setOfferData,
        bookingData,
        setBookingData,
        paymentSuccess,
        setPaymentSuccess
    };
    return (
        <StoreContext.Provider value={contextValue}>
          {props.children}
        </StoreContext.Provider>
      );
}

export default StoreContextProvider;
