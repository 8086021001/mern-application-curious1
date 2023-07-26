const { Server } = require("socket.io");
const messageSchema = require('../models/messageSchema')
const chatSchema = require('../models/chatSchema')
const { ObjectId } = require('mongodb');





const io = new Server({
    pingTimeout: 60000,
    cors: {
      origin: process.env.CLIENT_URL,
    },
  })


  const activeRooms = {}

  const userIdToSocketMapping = new Map();
  const socketToUserIdMapping = new Map();

  io.on("connection", (socket) => {
    console.log("hellloo connected to socket.io")
    socket.on('setup',(chatData)=>{
      console.log(chatData?.chatroomId)
      socket.join(chatData?.chatroomId);
      // console.log("user connected to specific room",chatData?.chatroomId)
      if (!activeRooms[chatData?.chatroomId]) {
        activeRooms[chatData?.chatroomId] = [];
      }
      activeRooms[chatData?.chatroomId].push(socket.id);
  
      socket.emit("connected",socket.id)
    })



    socket.on("send message",async (chatData,callBack)=>{
      const chatroomId = chatData?.chatDataId ;
      const senderId = chatData?.authUserId
      const message = chatData?.inputValue
      const formattedDate = new Date().toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
      const messageData = {
        senderId:senderId,
        content:message,
        createdAt:formattedDate
      }
      callBack(messageData)
      socket.in(chatroomId).emit("receive Message", messageData);

      try {
        const mssageData = {
      chat:chatroomId,
      sender:senderId,
      content:message
    }
  
    const saveMessage = await  messageSchema.create(mssageData)
    const updateChat = await chatSchema.findByIdAndUpdate(chatroomId,{lastMessage:saveMessage._id},{new:true})

      } catch (error) {
        console.log("rerror occured")
      }
    })

    socket.on("fetch all messages", async(chatId,callBack)=>{
      try {
        console.log("hey can you see chat id",chatId)
        const fetchMsgData=await messageSchema.find({chat:chatId})
        if(fetchMsgData){
        const fetchAllMessages = await messageSchema.find({chat:chatId})
        .populate({
          path:'sender',
          select:'name image'
        })
        .sort({createdAt:1})
          const messagesTosend = fetchAllMessages.map((message)=>{
            const { sender, content, createdAt,isAudio } = message;
            const formattedDate = new Date(createdAt).toLocaleString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            });
            return {
              senderId: sender._id,
              sender: sender.name,
              senderImage: sender.image,
              content,
              isAudio,
              createdAt: formattedDate,
            };
          })
          // console.log("Thia is the messagesssss sorted", messagesTosend)
  
  
          // return messagesTosend
          callBack(messagesTosend)

        }else{
          callBack([]) 

        }



      } catch (error) {
            console.error("Error fetching messages:", error);
            callBack([]) 
               }
    })


    socket.on('join-vc-room',(data)=>{
      const {roomId,authUserId} = data
      console.log("videocall lo",roomId,authUserId)
      userIdToSocketMapping.set(authUserId,socket.id)
      socketToUserIdMapping.set(socket.id,authUserId)
      socket.join(roomId);
      socket.emit('joined-room',{roomId})
      socket.broadcast.to(roomId).emit("user-joined",{authUserId})
    })

    socket.on('call-user', (data)=>{
      const{authUserId,offer} = data
      const fromUser = socketToUserIdMapping.get(socket.id)
      const socketId = userIdToSocketMapping.get(authUserId)
      socket.to(socketId).emit('incoming-call',{from:fromUser,offer})
    })

    socket.on('call-accepted',(data)=>{
      const{authUserId,ans}= data
      console.log(data)
      const socketId = userIdToSocketMapping.get(authUserId);
      socket.to(socketId).emit('call-accepted',{ans})
    })
    
  });

  





  module.exports = io






