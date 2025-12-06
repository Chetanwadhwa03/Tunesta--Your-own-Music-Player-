import mongoose, { mongo } from "mongoose";
import songSchema from "./Song.js";
import User from "./User.js";

const albumSchema=mongoose.Schema({
    folder:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    cover:{
        type:String,
        required:true,
        trim:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true


    },
    songs:[songSchema]
})

const Album= mongoose.model('Album', albumSchema);
export default Album;

