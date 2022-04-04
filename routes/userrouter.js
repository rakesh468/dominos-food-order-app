const userCtrl=require("../controllers/usercontroller")
const router=require("express").Router()
const auth=require("../middleware/auth")


router.post("/register",userCtrl.register)

router.post("/login",userCtrl.login)

router.get("/logout",userCtrl.logout)

router.get("/refresh_token",userCtrl.refreshToken)

router.get("/infor",auth,userCtrl.getuser)

router.patch("/addcart",auth,userCtrl.addCart)

module.exports=router