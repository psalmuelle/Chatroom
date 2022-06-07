"use strict"

 const socket = io()
// the first screen
const onboardingScreen = document.querySelector(".onboarding-page");
const startBtn = document.querySelector(".start-chat-btn");

// the second screen
const userName = document.querySelector(".info-page");
const exitUserName = document.querySelector("#exit-info-page");
const userInput = document.querySelector("#name");
const submitUserName = document.querySelector(".join-chat");

// the third screen
const chatRoom = document.querySelector(".chat-room");
const logOut = document.querySelector(".log-out");
const chatHistory = document.querySelector(".chat-history");
const chatInput = document.querySelector("#type-chat");
const sendMessage = document.querySelector(".send-message");


let nameOfUser



startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  userName.style.display = "flex";
});

exitUserName.addEventListener("click", () => {
  userName.style.display = "none";
});



  submitUserName.addEventListener("click", () => {
  let displayName = userInput.value
  if(userName.length === 0){
    return;
  }
  nameOfUser = displayName;
  userName.style.display = "none";
  onboardingScreen.style.display = "none";
  chatRoom.style.display = "block"
  socket.emit("newuser", displayName);

  });

sendMessage.addEventListener("click",()=>{
  let message = chatInput.value;
  if(message.length === 0){
    return;
  }
  renderMessage("my", {
   username: nameOfUser,
   text: message
  })
  socket.emit("chat",{
    username:nameOfUser,
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
    localStorage.setItem("chat-history", messageContainer)
  }else if(type == "other"){
    let el = document.createElement("li");
    el.setAttribute("class", "message others-message")
    el.innerHTML = `
    <div>${message.username}</div>
    ${message.text}
    
    `
    messageContainer.appendChild(el)
    localStorage.setItem("chat-history", messageContainer)

  }else if (type == "update"){
    let el = document.createElement("li");
    el.setAttribute("class", "message .someone-joined")
    el.innerText = `${message.username} joined!`
    messageContainer.appendChild(el)
    localStorage.setItem("chat-history", messageContainer)
  }
}


logOut.addEventListener("click",()=>{
  socket.emit("exituser", nameOfUser)
  
  chatRoom.style.display ="none";
  onboardingScreen.style.display = "block"
  localStorage.clear()
})
socket.on("newuser", (update)=>{
  renderMessage("update", update)
})
socket.on("chat", (message)=>{
  renderMessage("other", message)
})
socket.on("exituser",(update)=>{
  renderMessage("update", update)
} )


