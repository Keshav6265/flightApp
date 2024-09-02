import express from 'express'
import { placeBooking } from '../controllers/bookingController.js'

const bookingRouter=express.Router();

bookingRouter.post("/place",placeBooking);

export default bookingRouter