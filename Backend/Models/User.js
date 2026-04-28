import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required: [true, 'Please provide an email'],
        unique:true
    },

    password:{
        type:String,
        required: [true, 'Please provide a password'],
        minlength:6
    }
});

const User= mongoose.model('User',userSchema);

export default User;    








