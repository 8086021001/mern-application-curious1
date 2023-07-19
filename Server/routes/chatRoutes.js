
const express = require('express')
const router = express.Router()
const {searchAllUsers,fetchChatData,fetchMessages} = require('../controllers/chat')
const {verifyToken} = require('../controllers/verifyToken')


///getting all users availabke for chat


router.get('/searchAllUsers',verifyToken,searchAllUsers)


//get user chat
router.get(`/fetchChatData/:chatId`,verifyToken,fetchChatData)

//get userChat messages

router.get(`/fetchMessages/:chatId`,verifyToken,fetchMessages)




module.exports = router