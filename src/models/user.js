const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new  mongoose.Schema({
    firstName:{
        type:String,
        minLength:4,
        maxLength:25,
        required:true,
        trim:true

    },
    lastName:{
        type:String,
        trim:true
    },
    emailId:{
        type:String,
        lowercase:true,
        trim:true,
        unique:true,
        minLength:4,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid : "+value);
                
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
        required:true
    },
    gender:{
        type:String,
        required:true,
        lowercase:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not Valid !");
            }
        }
    },
    skills:{
        type:[String],
        validate(value){
            if(value.length > 10){
                throw new Error("Skills can't be more than 10");
            }
        }
    },
    about:{
        type:String,
        maxLength:100,
        default:"I'm dev Looper !"
    },
    photoUrl:{
        type:String,
        default: " ",
        trim:true
    },
    userName:{
        type:String,
        required: true,
        unique:true,
        maxLength:10,
        minLength:4
    }
}, {timestamps:true});

// function to get the jwt token 
userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id:user._id}, "ALUMINICONNECT@009", {expiresIn:"1d"});
    return token;
}

// helping function for validating the password 
userSchema.methods.validatePassword = async function(password) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
