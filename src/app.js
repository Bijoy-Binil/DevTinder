// import express from 'express'
const express = require('express') 
const connectDB =require('./config/database')
const app=express()
const User=require('./models/user')

app.post("/signup",async(req,res)=>{
    
    const user=new User({
        firstName:"sachin",
        lastName:"Tendulkar",
        emailId:"sachintendulkar@example.com",
        password:"sachin@123",
        age:30
    })
try {
    await user.save()
   res.send("User created successfully")
} catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user")
}
    
})




   connectDB().then(() => {
        console.log("Database connection established");
        app.listen(7777, () => console.log("App Started on 7777"))
    }).catch((error) => {
        console.error("Database connection error:", error);
    });

