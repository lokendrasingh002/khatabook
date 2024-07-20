const express =require("express")
const router=express.Router();
const { isloggedIn, redirectToProfile } = require("../middlewares/middlewares");
const { getCreateController, createController, getHisaabViewController, 
            hisaabverifyController, getdeleteController, 
           getEditHisaabController, editController, 
         verifiedHisaabshowController, 
         
         } = require("../controllers/hisaabController");



router.get("/create",isloggedIn,getCreateController)
router.get("/view/:id",isloggedIn,getHisaabViewController)
router.get("/delete/:id",isloggedIn,getdeleteController)
router.get("/edit/:id",isloggedIn,getEditHisaabController)
router.get("/view",isloggedIn,verifiedHisaabshowController)


router.post("/edit/:id",isloggedIn,editController)
router.post("/:id/verify",isloggedIn,hisaabverifyController)
router.post("/create",isloggedIn,createController)
module.exports=router