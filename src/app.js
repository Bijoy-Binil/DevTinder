// import express from 'express'
const express = require('express') 

const app=express()

app.get('/',(req,res)=>{
    res.send("Hello world")
})
app.use('/bijoy',(req,res)=>{
    res.send("Hello Bijoyty")
})

app.listen(7777, () => console.log("App Started on 7777"))