import express from 'express';
import { loginUser, registerUser,getUser, updateBookingData } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter=express.Router()

userRouter.post("/login",loginUser)
userRouter.post("/register",registerUser)
userRouter.post("/user",authMiddleware,getUser)
userRouter.post("/update",authMiddleware,updateBookingData)

export default userRouter;