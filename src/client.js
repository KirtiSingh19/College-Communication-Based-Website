const mydata=require('./index')
const socket = io('http://localhost:5000')
const form=document.getElementById('chat-message-input-container')
const messageInput = document.getElementById('chat-message-input')
const messageContainer=document.querySelector("chat-container")

const append =(message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classLink.add('message');
    messageElement.classLink.add(position);
    messageContainer.append(messageElement);

}

socket.emit('new-user-joined',username)
socket.on('user-joined', data=>{
    append('${username} joined the chat', 'right')

})