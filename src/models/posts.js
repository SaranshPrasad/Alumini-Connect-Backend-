const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    photoUrl:{
        type:String
    },
    desc:{
        type:String,
        maxLength:255,
        required:true,
        index:true
    },
    keywords:{
        type:[String],
        validate(value){
            if(value.length > 10){
                throw new Error("Keywords can't be more than 10");
            }
        }
    },
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        req:"User",
    }
},{timestamps:true});



const Posts = mongoose.model("Posts", postSchema);
module.exports = Posts;