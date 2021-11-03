const express = require("express");
const http = require('http')
const path = require("path");
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on('connection',(socket)=>{
  console.log("New web socket connection");
  // socket.emit("countUpdated",count)

  // socket.on('increment',()=>{
  //   count++;
  //   //socket.emit('countUpdated',count) emitting to single user
  //   io.emit("countUpdated",count) //send update to every connection
  // })

  socket.emit("message","Welcome")

  socket.broadcast.emit('message','A new user has joined!')

  socket.on('sendMessage',(msg)=>{
    console.log();
    io.emit("message",msg)
  })
  socket.on("sendLocation",({lat,lng})=>{
    io.emit('message',`https://google.com/maps?q=${lat},${lng}`)
  })

  socket.on('disconnect',()=>{
    io.emit('message','A user has left')
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
