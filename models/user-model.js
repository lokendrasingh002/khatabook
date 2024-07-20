const mongoose=require("mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/khatabook")
const validator=require("validator")
const uniqueValidator=require('mongoose-unique-validator')
const userSchema=mongoose.Schema({  
    username:{
        type:String,
        trim:true,
        required: [true, 'Username is required'],
        unique:true,
        // trim:true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    name:{
        type:String,
        required: [true, 'Username is required'],
        trim:true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters']
       
    },
    email:{
        type:String,
        trim:true,
        required:true
        // required:[true.valueOf,"email is required"],
        // match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
       
    },
    hisaab:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"hisaab"}],
    }
})

module.exports=mongoose.model("user",userSchema)