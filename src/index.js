//socket io handler
const io = require('socket.io')(5000);
const user={};
io.on('connection',socket =>{   
    socket.on('new-user-joined',username => {
        
        console.log("new user",username)
        user[socket.id]= username;
        socket.broadcast.emit('user-joined',username);
        

    });
    socket.on('send-msg',message=>
    {
        socket.broadcast.emit('receive-msg', {message: message,username: user[socket.id]})
    });
})
module.exports=myclient;
