const express = require('express');
const cors =require('cors')
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const INDEX = '/index.html';

const http = require('http').Server(app);

app.use(express.static('./client/build'));
app.use(cors())
http.listen(PORT, ()=>{
     console.log(`Server listening on ${PORT}`);

 })

//const server = express.use().listen(http)
// .use(function (res) {

//   res.sendFile('./client/build/'+INDEX)
// } 
// )
// .listen(PORT, () => console.log(`Listening on ${PORT}`));
//New imports
const socketIO = require('socket.io')(http);

let users = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  //Listens when a new user joins the server
  socket.on('newUser', (data) => {
    console.log(data)
    console.log(users)
    //Adds the new user to the list of users
      if(!users.find((ele)=> ele.socketID === data.socketID)){
    users.push(data);
    console.log(users)
  
  }
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
  });
  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});


app.get('/chat',function (req, res,next)  {

  res.sendFile(path.resolve(__dirname, './client/build'+INDEX));
  });

  
