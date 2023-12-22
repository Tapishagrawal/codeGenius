const express = require('express');
const connection = require('./connection');
const { userRoute } = require('./Routes/user.route');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json())

app.use("/users", userRoute)

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