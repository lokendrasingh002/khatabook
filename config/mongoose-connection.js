const mongoose=require("mongoose")

mongoose.connect(process.env.MONGODB_URI).then(function(){
    console.log("mongoose connected");
})
    
module.exports=mongoose.connection
