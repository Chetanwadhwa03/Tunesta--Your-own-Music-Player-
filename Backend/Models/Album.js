import mongoose, { mongo } from "mongoose";
import songSchema from "./Song.js";

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
    songs:[songSchema]
})

const Album= mongoose.model('Album', albumSchema);
export default Album;

