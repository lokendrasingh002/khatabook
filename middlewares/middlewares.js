
const jwt=require("jsonwebtoken")
const userModel = require("../models/user-model")
const path = require("path")


module.exports.isloggedIn= async function isloggedIn(req,res,next){
   if(req.cookies.token){
    try{
        let decoded=jwt.verify(req.cookies.token,process.env.SECRET_KEY)
        let user =await userModel.findOne({email:decoded.email})
        req.user=user;
        // console.log(req.user);
        next();
    }catch(err){
        return res.redirect("/")
    }
   }else {
    return res.redirect("/")
   }

};

module.exports.redirectToProfile= async function (req,res,next){

    
        if(req.cookies.token)
        {
            let decoded= jwt.verify(req.cookies.token,process.env.SECRET_KEY)
            if(decoded){
                return res.redirect("/profile");
            }
        }
        else return next();
    
};



