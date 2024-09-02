import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import flightRouter from './routes/flightRoute.js';
import bookingRouter from './routes/bookingRoute.js';

//app config
const app=express();
const PORT=4000;

//middlewares
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("API Working")
})

//api endpoints
app.use("/api/user",userRouter)
app.use("/api/flights",flightRouter)
app.use("/api/booking",bookingRouter)

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})