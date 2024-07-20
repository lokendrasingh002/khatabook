const userModel = require("../models/user-model")
const bcrypt=require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt=require("jsonwebtoken")
const { isloggedIn } = require("../middlewares/middlewares")
const { options } = require("../routes/hisaabRouter")





module.exports.getregisterController=(req,res)=>{
  res.render('register',{isloggedin:false,error:req.flash("error")});

}

  module.exports.getProfileController= async (req,res)=>{

    let byDate= Number(req.query.byDate)
    let {startDate,endDate}=req.query;

    byDate=byDate ? byDate : -1;
    startDate =startDate ? startDate : new Date("2000-01-01")
    endDate = endDate ? endDate : new Date();

let user=await userModel.findOne({email:req.user.email}).populate({
  path:"hisaab",
  match : {createdAt :{$gte: startDate , $lte: endDate}},
  options:{sort: {createdAt: byDate}}

})
    res.render("profile",{user,error:req.flash("error")})
  }
module.exports.indexController= (req,res)=>{
    res.render("index",{isloggedin:false,error:req.flash("error")})
}






module.exports.registerController= async (req,res)=>{

    let {name ,username,email, password}=req.body

    if(!name || !username || !email || !password){
      req.flash("error","All fields are required")
      return res.redirect("/register")
    }
    
    if(username.length < 3){
      req.flash("error","username must be at least 3 characters long")
        return res.redirect("/register")
    }
    if(name.length < 3){
      req.flash("error","username must be at least 3 characters long")
        return res.redirect("/register")
    }
    if(password.length < 4){
      req.flash("error","username must be at least 3 characters long")
        return res.redirect("/register")
    }


    let user=await userModel.findOne({email})

    if(user) {
          req.flash("error","something is wrong")
  return res.redirect("/register")}
try {
  
  let salt =await bcrypt.genSalt(10)
  let hash=await bcrypt.hash(password,salt)

  user= await userModel.create({
    name,
    username,
    email,
    password:hash
  })

  let token=jwt.sign({email:user.email,id:user._id},process.env.SECRET_KEY)
  res.cookie("token",token)
  res.redirect("/profile")
}catch(err){
  req.flash("error",err.message);
  
  res.redirect("/register")
}
      
}

module.exports.loginController = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    req.flash('error', 'You do not have an account');
    return res.redirect('/');
  }

  try {
    let result = await bcrypt.compare(password, user.password);
    if (result) {
      let token = jwt.sign({ email: user.email, id: user._id },process.env.SECRET_KEY);
      res.cookie('token', token);
      res.redirect('/profile');
    } else {
      req.flash('error', 'Incorrect password');
      res.redirect('/');
    }
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
};



module.exports.logoutController= (req,res)=>{
  res.cookie("token",'')
  res.redirect("/")
}

