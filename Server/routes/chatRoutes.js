
const express = require('express')
const router = express.Router()
const {searchAllUsers,fetchChatData,fetchMessages,fetchAllChatdat,audioMessage} = require('../controllers/chat')
const {scheduleVideoCall, fetchAlRequests}  =require('../controllers/videoCall')
const {verifyToken} = require('../controllers/verifyToken')
const {uploadAudio} =require('../utils/multerConfig')

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





module.exports = router