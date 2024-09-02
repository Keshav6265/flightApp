import express from 'express';
import { flightOffer } from "../controllers/flightController.js";

const flightRouter=express.Router();

flightRouter.get('/offers',flightOffer);

export default flightRouter;

