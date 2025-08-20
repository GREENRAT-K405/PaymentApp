//import mongoose
const mongoose = require("mongoose");

const { minLength, maxLength } = require("zod");

// connect mongoose
mongoose.connect(process.env.MongoUrl);

const userSchema= new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        trim: true
    },
    name:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email:{
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    password:{
        type: String,
        required: true,
        minLength: 8,
        maxLength:50
    },
    amount:{
        type: Number 
    }
})

const User = mongoose.model('User', userSchema);

module.exports={
    User
}