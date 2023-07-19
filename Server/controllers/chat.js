const chatSchema = require('../models/chatSchema')
const userSchema = require('../models/userSchema')
const messageSchema = require('../models/messageSchema')


const searchAllUsers = async(req,res)=>{
    try {
        const userId = req.id
        const searchUser = await userSchema
        .findById(userId)
        .populate({
            path: 'followers',
            select: 'name email image',
        })
        .populate({
            path: 'following',
            select: 'name email image',
          })
        .select('name email image');
                console.log(searchUser)

        res.status(200).json({users:searchUser})
        
    } catch (error) {
        
    }
}

const fetchChatData = async(req,res)=>{
    try {
        const userId = req.id
        const chatUserId = req.query.chatId
        const fetchChat = await chatSchema.find({users:{$in:[userId,chatUserId]}}).populate('lastMessage')
        if(fetchChat.length > 0){
            res.json(fetchChat)

        }else{
            const data = {
                users : [userId,chatUserId],
            }
            const newChatDat = await chatSchema.create(data)
            res.json(newChatDat)
        }
    } catch (error) {
        
    }
}

const fetchMessages = async(req,res)=>{
    try {
        const userId = req.id
        const chatId = req.query.chatId
        const messages = await messageSchema.find({chat:chatId})
        if(!messages){
            return res.status(404).json({message:"user not connected"})
        }
        console.log(messages)
        res.status(200).json({messages})
    } catch (error) {
        
    }
}





module.exports = {searchAllUsers,fetchChatData,fetchMessages}
