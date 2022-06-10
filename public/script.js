"use strict"



 const socket = io()

// the chat screen
const chatRoom = document.querySelector(".chat-room");
const logOut = document.querySelector(".log-out");
let chatHistory = document.querySelector(".chat-history");
const chatInput = document.querySelector("#type-chat");
const sendMessage = document.querySelector(".send-message");


// collect username from the homepage
const displayName = localStorage.getItem("name")






 
  

  //Handles the send message button

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


// Rendering the messages 
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


// Handles logout
logOut.addEventListener("click",()=>{
  location.href = location.origin
  localStorage.clear()
})



// Just beore user leaves the browser
  window.addEventListener("beforeunload",(e)=>{
 //I used cookie to trigger a 30min count down, since cookie works even while the browser is closed
    document.cookie =`firstTimer = ${true}; expires = ${new Date(Date.parse(new Date()) + 1800000)}; path = /; secure;`

   localStorage.setItem ("chats", chatHistory.innerHTML) 

  }) 

 
// Statement that set the expiry time for the local storage

window.onunload= (function (){
  
 if(document.cookies = ""){
   localStorage.clear();
   chatHistory.innerHTML = ""
   location.href = location.origin
 }else{
   return
 }
})()

  

if (!window.closed){
  chatHistory.innerHTML =(localStorage.getItem("chats"))
}












