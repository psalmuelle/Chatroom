"use strict"




// the first screen
const onboardingScreen = document.querySelector(".onboarding-page");
const startBtn = document.querySelector(".start-chat-btn");

// the second screen
const userName = document.querySelector(".info-page");
const exitUserName = document.querySelector("#exit-info-page");
const userInput = document.querySelector("#name");
const submitUserName = document.querySelector(".join-chat");



exitUserName.addEventListener("click", () => {
    userName.style.display = "none";
});


startBtn.addEventListener("click", () => {    
    userName.style.display = "flex";
  });
  

  submitUserName.addEventListener("click", () => {
      
      let displayName = userInput.value
      if(displayName === 0){
          return;
        }
    
       localStorage.setItem("name", displayName)
        location.replace("/chat.html")
         userInput.value =""
    }
  )

  if(localStorage.length ==3){
    startBtn.addEventListener("click", () => { 
      userName.style.display = "none";
      location.replace("/chat.html")
      
    });
    
  }
 