const { Server } = require("socket.io");



const io = new Server({
    pingTimeout: 60000,
    cors: {
      origin: process.env.CLIENT_URL,
    },
  })

  io.on("connection", (socket) => {
    console.log("hellloo connected to socket.io")
    socket.on('setup',(chatData)=>{
      socket.join(chatData?.chatroomId);
      console.log("user connected to specific room",chatData?.chatroomId)
      socket.emit("connected",socket.id)
    })
    socket.on("send message",(chatData)=>{
      const chatroomId = chatData?.chatDataId;
      console.log("sendong my messages o",chatData)
      socket.in(chatroomId).emit("receive Message", chatData?.inputValue,socket.id);
  
    })
    
  });







  module.exports = io