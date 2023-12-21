const express = require('express');
const connection = require('./connection');
require("dotenv").config();

const app = express();

//port comes from the env file and that file will be made by your own.
app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("connection established")
        console.log(`http://localhost:${process.env.port}`)
    } catch (error) {
        console.log(error);
        console.log("Error in connecting to server")
    }
})