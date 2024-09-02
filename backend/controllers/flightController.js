import Amadeus from "amadeus";

const amadeus=new Amadeus({
    clientId:'vB0qy1PmfAj1qdXnGyOZBwdpZ163ZKMa',
    clientSecret:'T9aVJjo8TDgg5QTE',
})

//flight offer search
const flightOffer=async(req,res)=>{
    const {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        adults,
        carrierClass,
      } = req.query;
      try {
        const response = await amadeus.shopping.flightOffersSearch.get({
          originLocationCode,
          destinationLocationCode,
          departureDate,
          returnDate,
          adults,
          travelClass: carrierClass,
          currencyCode:'INR',
        });
        const flights = response.data;
        res.json({success:true,flights});
    }catch (error) {
        console.error(error);
        res.json({success:false,message:"Error"})
      }
}

export {flightOffer}