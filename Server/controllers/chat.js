const chatSchema = require('../models/chatSchema')
const userSchema = require('../models/userSchema')
const messageSchema = require('../models/messageSchema')
const {audioUplodertoCloudinary,generateUniqueName}= require('../utils/helperFunctions')


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
        res.status(200).json({users:searchUser})
        
    } catch (error) {
        res.status(500).json({message:"Failed!"})

    }
}

const fetchChatData = async(req,res)=>{
        const userId = req.id
        const chatUserId = req.params.chatId
        const fetchChat = await chatSchema.find({users:{$all:[userId,chatUserId]}}).populate('lastMessage')
        if(fetchChat.length > 0){
            res.status(200).json({chat:fetchChat})

        }else{
            const data = {
                users : [userId,chatUserId],
            }
            const newChatDat = await chatSchema.create(data)
            res.status(200).json({chat:newChatDat})
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
        res.status(200).json({messages})
    } catch (error) {
        res.status(500).json({message:"Failed!"})

    }
}

const fetchAllChatdat = async(req,res)=>{
    try {
        
        const authUserId = req.id
        
        const chatedUsers = await chatSchema.find({users:{$in:authUserId}})
        .populate({
            path: 'users',
            select: 'name email image',
        })
        res.status(200).json({chatUsers:chatedUsers})
        
    } catch (error) {
        res.status(500).json({message:"Failed!"})

    }

}
const audioMessage = async (req,res)=>{
    try {
        console.log("dont worrry request is herer")
             const {chat,sender} = req.body
             const{originalname,buffer} = req.file
             console.log(req.file,"my req body",req.body)
             const filename = generateUniqueName(originalname)
     
             const audioUrl = await audioUplodertoCloudinary(filename,buffer)
             console.log(audioUrl)
     
             if(audioUrl){
                 const newAudioMessage = new messageSchema({
                     chat:chat,
                     sender:sender,
                     content:audioUrl,
                     isAudio:true
                 })
     
                 await newAudioMessage.save()
                 res.status(200).json({audioMessage:newAudioMessage,message:"success"})
             }else{
                res.status(404).json({message:"unable to upload audio"})
             }
        
    } catch (error) {
        res.status(500).json({message:"Failed!"})

    }
         
}











module.exports = {searchAllUsers,fetchChatData,fetchMessages,fetchAllChatdat,audioMessage}
