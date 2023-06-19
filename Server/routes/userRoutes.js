const express = require("express")
const router = express.Router()
const {googleAuth} = require('../controllers/googleroute')
const {Signup,verifyEmail,login,getUser,logout,setFields,googelSignup}= require('../controllers/user')
const {verifyToken,refreshToken} = require("../controllers/verifyToken")
const {getInterests} = require('../controllers/interest')
 
router.post('/api/v1/auth/google',googleAuth) // signup using google

router.post('/signup',Signup)
router.post('/googleSignup',googelSignup)
router.get("/:id/verify/:token",verifyEmail)
router.post('/login',login)
router.post('/logout',verifyToken,logout)



router.get("/userdata",verifyToken,getUser)

//getting interest fields

router.get('/interests',getInterests)

//updating interest fields if not any
router.put('/setfield',verifyToken,setFields)







module.exports = router

