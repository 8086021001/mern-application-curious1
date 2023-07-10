const express = require("express")
const router = express.Router()
const {googleAuth} = require('../controllers/googleroute')
const {Signup,verifyEmail,login,getUser,logout,setFields,googelSignup,updateProfile,userFieldUpdate,setBlogAsDraft}= require('../controllers/user')
const {verifyToken,refreshToken} = require("../controllers/verifyToken")
const {getInterests,addNewInterests} = require('../controllers/interest')
const {upload}= require('../utils/multerConfig')
 
router.post('/api/v1/auth/google',googleAuth) // signup using google

router.post('/signup',Signup)
router.post('/googleSignup',googelSignup)
router.get("/:id/verify/:token",verifyEmail)
router.post('/login',login)
router.post('/logout',verifyToken,logout)

router.post('/setBlogAsDraft',verifyToken,setBlogAsDraft)



router.get("/userdata",verifyToken,getUser)

//getting interest fields

router.get('/interests',getInterests)

//updating interest fields if not any
router.put('/setfield',verifyToken,setFields)

//updating user profile with image

router.put('/profileUpdate',upload.single('image'),verifyToken,updateProfile)

router.put('/ProfilefieldUpdate',upload.none(),verifyToken,userFieldUpdate)
//adding new interests

router.post('/addNewUserInterests',verifyToken,addNewInterests)









module.exports = router

