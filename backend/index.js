const express = require("express");

const app = express();
const port = process.env.PORT || 5000;


app.listen(port, ()=>{
    console.log(`The Server is running on PORT ${port}`)
})