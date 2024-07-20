
const mongoose=require("mongoose")
const validator=require("validator")
const uniqueValidator=require('mongoose-unique-validator')

const hisaabSchema=mongoose.Schema({
   title:{
      type:String,

   },
   content:{
      type:String,
   },
   encrypted:{
      type:Boolean,
      default:false
   },
   passcode:{
      type:String,
      default:false
   },
   editpermissions:{
      type:Boolean,
      default:false

   },
   shareable:{
      type:Boolean,
      default:false

   },
   user:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}]
     
},
{timestamps:true}
);

module.exports=mongoose.model("hisaab",hisaabSchema)