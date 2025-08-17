require('dotenv').config();

const express = require('express')
const cors = require("cors");

const mainRouter = require("./routes/main")
const app=express();
port=process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

app.listen(port,()=>{
    console.log(`The server is running on the port: ${port}`)
})
//whenever this route is called, use the mainRouter logic