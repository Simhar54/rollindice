let startPannel = document.querySelector("#startPannel");
let formPannel = document.querySelector("#formPannel");
let startGame = document.querySelector("#startGame");
let validate = document.querySelector("#validate");

startGame.addEventListener("click", function () {
  startPannel.classList.remove("d-block");
  startPannel.classList.add("d-none");
  formPannel.classList.remove("d-none");
  formPannel.classList.add("d-block");
});
