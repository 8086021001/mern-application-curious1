const { Server } = require("socket.io");



const io = new Server({
    pingTimeout: 60000,
    cors: {
      origin: process.env.CLIENT_URL,
    },
  })

  io.on("connection", (socket) => {
    console.log("hellloo connected to socket.io")
  });


  module.exports = io