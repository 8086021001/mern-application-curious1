
const express = require('express')
const router = express.Router()
const {searchAllUsers,fetchChatData,fetchMessages,fetchAllChatdat,audioMessage,sendImage} = require('../controllers/chat')
const {scheduleVideoCall, fetchAlRequests,acceptAndRejReq}  =require('../controllers/videoCall')
const {verifyToken} = require('../controllers/verifyToken')
const {uploadAudio,uploadImg} =require('../utils/multerConfig')

///getting all users availabke for chat


router.get('/searchAllUsers',verifyToken,searchAllUsers)


//get user chat
router.get(`/fetchChatData/:chatId`,verifyToken,fetchChatData)

//get userChat messages

router.get(`/fetchMessages/:chatId`,verifyToken,fetchMessages)

router.get('/fetchAllChatdat',verifyToken,fetchAllChatdat)

//posting audio file

router.post('/sendAudio',uploadAudio.single('content'),verifyToken,audioMessage)



//videocall settings


router.post('/scheduleVideoCall',verifyToken,scheduleVideoCall)


router.get('/fetchAlRequests',verifyToken,fetchAlRequests)

//image sending route

router.post('/sendImage',uploadImg.single('content'),verifyToken,sendImage)


//route for updating request

router.post('/updateReq',verifyToken,acceptAndRejReq)





module.exports = router