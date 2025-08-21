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


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
}); 

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports={
    User,
    Account
}