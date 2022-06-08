"use strict"

 const socket = io()

// the third screen
const chatRoom = document.querySelector(".chat-room");
const logOut = document.querySelector(".log-out");
let chatHistory = document.querySelector(".chat-history");
const chatInput = document.querySelector("#type-chat");
const sendMessage = document.querySelector(".send-message");


const displayName = localStorage.getItem("name")






 
  

  

sendMessage.addEventListener("click",()=>{
  let message = chatInput.value;
  if(message.length === 0){
    return;
  }
  renderMessage("my", {
   username: displayName,
   text: message
  })
  socket.emit("chat",{
    username:displayName,
    text: message
  }); 
  chatInput.value = ""
})

function renderMessage(type, message){
  let messageContainer = chatHistory;

  if (type == "my"){
    let el = document.createElement("li");
    el.setAttribute("class", "message my-message")
    el.innerHTML = `
    <div>You</div>
    ${message.text}
    
    `
    messageContainer.appendChild(el)
   
  }else if(type == "other"){
    let el = document.createElement("li");
    el.setAttribute("class", "message others-message")
    el.innerHTML = `
    <div>${message.username}</div>
    ${message.text}
    
    `
    messageContainer.appendChild(el)
   
  }
  }

socket.on("chat", (message)=>{
  renderMessage("other", message)
})


logOut.addEventListener("click",()=>{
  
  location.href = location.origin
  localStorage.clear()
})




  window.addEventListener("beforeunload",(e)=>{
 e.preventDefault()
 
   localStorage.setItem ("chats", chatHistory.innerHTML) 
  localStorage.setItem ("time", new Date())
  }) 

 
  
  if(!window.closed){

 chatHistory.innerHTML =(localStorage.getItem("chats"))
 
  }


if (Date.parse(new Date()) - Date.parse(localStorage.getItem("time")) > 1800000 ){
localStorage.clear()

chatHistory.innerHTML = ""

}


 

