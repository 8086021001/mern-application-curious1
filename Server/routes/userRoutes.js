const express = require("express")
const router = express.Router()
const {googleAuth} = require('../controllers/googleroute')
const {Signup,verifyEmail,login,getUser,logout,setFields}= require('../controllers/user')
const {verifyToken,refreshToken} = require("../controllers/verifyToken")

router.post('/api/v1/auth/google',googleAuth) // signup using google

router.post('/signup',Signup)
router.get("/:id/verify/:token",verifyEmail)
router.post('/login',login)
router.post('/logout',verifyToken,logout)


router.get("/userdata",verifyToken,getUser)






module.exports = router

