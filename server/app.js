require("dotenv").config();

const express=require("express");

const app=express();
require("./db/connection")
const cors=require('cors');

const PORT=4009

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json("server start");
})

app.listen(PORT,()=>{
    console.log(`Server start at ${PORT}`);
})