require('dotenv').config();

const express = require('express')
const mainRouter = require("./routes/main")
const app=express();


app.use("/api/v1", mainRouter);

//whenever this route is called, use the mainRouter logic
