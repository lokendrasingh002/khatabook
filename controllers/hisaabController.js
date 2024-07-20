const hisaabModel=require("../models/hisaab.model")
const userModel=require("../models/user-model")


module.exports.getCreateController=(req,res)=>{
    res.render('create',{error:req.flash("error")});
  
  }
 
  module.exports. getHisaabViewController=async(req,res)=>{
    let hisaab= await hisaabModel.findOne({_id:req.params.id})
    if(hisaab.encrypted){
     return  res.render("passcode",{hisaab,error:req.flash("error")})
    }else{

     return res.render("hisaab",{hisaab})
    }
  }
  module.exports.hisaabverifyController=async(req,res)=>{
let hisaab=await hisaabModel.findOne({_id:req.params.id})
if(req.body.passcode=== hisaab.passcode){
  req.session.verifiedHisaab = hisaab;

  return res.redirect("/hisaab/view")
}else{
  req.flash("error","Incorrect Password")
  return res.redirect(`/hisaab/view/${req.params.id}`)
}
  }

module.exports.verifiedHisaabshowController=async (req,res)=>{
  const verifiedUser = req.session.verifiedHisaab;

let hisaab = await hisaabModel.findOne({_id:verifiedUser._id});

    if(!verifiedUser){
        req.flash("error","hisaab not found");
        return res.redirect("/profile");
    }

    res.render("hisaab",{hisaab});
    req.session.verifiedHisaab = null;
}
  
  module.exports.getEditHisaabController=async (req,res)=>{
    let id=req.params.id
    let hisaab= await hisaabModel.findOne({_id:id})
    res.render("edit",{hisaab})
  }
 module.exports.editController=async (req,res)=>{
  let id=req.params.id
  let hisaab= await hisaabModel.findOne({_id:id})
  if(!hisaab){
    res.redirect("/profile")
    return
  }
  

  hisaab.title=req.body.title;
  hisaab.content=req.body.content;
  hisaab.encrypted=req.body.encrypted ==="on" ?true : false;
  hisaab.passcode=req.body.passcode;
  hisaab.shareable=req.body.shareable ==="on" ?true : false;
  hisaab.editpermissions=req.body.editpermissions ==="on" ?true : false;

  await hisaab.save();
  res.redirect(`/hisaab/edit/${hisaab.id}`)

 }
  

  module.exports.createController=async (req,res)=>{

let { title,content,encrypted,passcode,editpermissions,
  shareable}=req.body
  
  if(!title || !content ){
    req.flash("error","title and description are required");
    return res.redirect("/hisaab/create");
}

  encrypted=encrypted === "on"? true : false;
  editpermissions=editpermissions === "on"? true : false;
  shareable=shareable === "on"? true : false;


  if(encrypted){
    if(!passcode){
      req.flash("error","Passcode is required")
      return res.redirect("/hisaab/create")
    }
  }
  let createdhisaab =await hisaabModel.create({
    title,
    content,
    encrypted,
    passcode,
    editpermissions,
    shareable,
    user:req.user._id
  })

 
  
  req.user.hisaab.push(createdhisaab._id)
  await req.user.save();
  // res.redirect("/profile")
  res.redirect("/profile")

  }

  module.exports.getdeleteController=async (req,res)=>{
    let hisaab= await hisaabModel.findById(req.params.id)
    if(!hisaab){
      return res.redirect("/profile")
    }

    await hisaabModel.deleteOne({_id:req.params.id})
     res.redirect("/profile")
  }