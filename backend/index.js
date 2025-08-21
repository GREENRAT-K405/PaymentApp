require('dotenv').config();

const express = require('express')
const cors = require("cors");

const app=express();

// any request to mainRouter will be refrenced to this path0
const mainRouter = require("./routes/main")

port=process.env.PORT;

app.use(cors());

//body parser
app.use(express.json());

//any request to /api/v1  use mainRouter
app.use("/api/v1", mainRouter);


app.listen(port,()=>{
    console.log(`The server is running on the port: ${port}`)
})