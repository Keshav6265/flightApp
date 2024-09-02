import db from '../config/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from "validator"
import 'dotenv/config'
import authMiddleware from '../middleware/auth.js'

//login user
const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const query=await db.query('SELECT * FROM public."user" WHERE email=$1',[email]);
        const user=query.rows;

        if(user.length===0){
            return res.json({success:false,message:"User Does not exist"})
        }

        const isMatch=await bcrypt.compare(password,user[0].password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token=createToken(user[0]._id);
        return res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//create token
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user

const registerUser=async (req,res)=>{
    const {name,password,email}=req.body;
    try {
         //checking is user already exists
         let exists=await db.query('SELECT * FROM public."user" WHERE email=$1',[email]);
         exists=exists.rows
         if(exists.length !=0){
             return res.json({success:false,message:"User already exists"});
         }

        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter a srong password"});
        }

        //hashing user password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser={
            name,
            email,
            password:hashedPassword
        }

        await db.query('INSERT INTO public."user" (name,email,password) VALUES ($1,$2,$3)',[newUser.name,newUser.email,newUser.password])
        const user=await db.query('SELECT * FROM public."user" WHERE email=$1',[email]);

        const token=createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//save booking data
const updateBookingData=async (req,res)=>{
    const userId=req.body.userId
    let bookingData=req.body
    bookingData=[bookingData]
    try {
        let exists=await db.query('UPDATE public."user" SET history = COALESCE(history, \'[]\'::jsonb) || $1::jsonb WHERE _id = $2 RETURNING *',[JSON.stringify(bookingData),userId]);
        exists=exists.rows
        res.json({success:true,data:exists[0]})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//get user history
const getUser=async (req,res)=>{
    const userId=req.body.userId
    try {
        let exists=await db.query('SELECT * FROM public."user" WHERE _id=$1',[userId]);
        exists=exists.rows
        res.json({success:true,history:exists[0].history})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser,getUser,updateBookingData}