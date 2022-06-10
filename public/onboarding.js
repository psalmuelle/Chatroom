"use strict";

// the first screen
const onboardingScreen = document.querySelector(".onboarding-page");
const startBtn = document.querySelector(".start-chat-btn");

// the second screen
const userName = document.querySelector(".info-page");
const exitUserName = document.querySelector("#exit-info-page");
const userInput = document.querySelector("#name");
const submitUserName = document.querySelector(".join-chat");

// Event listeners to handle exit popup, cta button and sumbit name button
exitUserName.addEventListener("click", () => {
  userName.style.display = "none";
});

startBtn.addEventListener("click", () => {
  userName.style.display = "flex";
});

submitUserName.addEventListener("click", () => {
  let displayName = userInput.value;
  if (displayName.length === 0) {
    return;
  }

  // stores the name of user in local storage
  localStorage.setItem("name", displayName);
  //navigates to the chat page
  location.replace("/chat.html");
  userInput.value = "";
});

// Check if user has history, the page skips the Enter your name section to the chat page directly
if (localStorage.length == 2) {
  startBtn.addEventListener("click", () => {
    userName.style.display = "none";
    location.replace("/chat.html");
  });
}
