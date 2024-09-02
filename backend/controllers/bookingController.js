import 'dotenv/config'
import Stripe from 'stripe'


const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const placeBooking=async (req,res)=>{
     const frontend_url="http://localhost:5173"
    try {
        const session=await stripe.checkout.sessions.create({
            line_items:[{
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:'Flight Ticket'
                    },
                    unit_amount:req.body.price*100
                },
                quantity:1
            }
            ],
            mode: 'payment',
            success_url:`${frontend_url}/verify?success=true`,
            cancel_url:`${frontend_url}/verify?success=false`,
        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {placeBooking}
