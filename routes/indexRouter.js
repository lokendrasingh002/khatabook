const express =require("express")
const router=express.Router();
const { isloggedIn, redirectToProfile } = require("../middlewares/middlewares")

const {indexController, registerController, loginController,
     logoutController, getregisterController,  getProfileController}=require("../controllers/indexController")



router.get('/',redirectToProfile,indexController)
router.get("/register",getregisterController)
router.get('/logout',logoutController)
router.get('/profile',isloggedIn,getProfileController)




router.post('/register',registerController)
router.post('/login',loginController)

module.exports=router