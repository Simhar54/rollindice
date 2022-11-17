const startPannel = document.querySelector("#startPannel");
const formPannel = document.querySelector("#formPannel");
const buttonGamePanel = document.querySelector("#buttonGamePanel");
const validate = document.querySelector("#validate");

let inputs = document.querySelectorAll("input");

let p1Input = document.querySelector("#p1Input");
let p2Input = document.querySelector("#p2Input");
let p1Name = document.querySelector("#p1Name");
let p2Name = document.querySelector("#p2Name");

let removeAddClass = (vanish, appear) => {
  vanish.classList.remove("d-block");
  vanish.classList.add("d-none");
  appear.classList.remove("d-none");
  appear.classList.add("d-block");
};

startGame.addEventListener("click", function () {
  removeAddClass(startPannel, formPannel);
});

formPannel.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  checkName();
  changeName(p1Input, p1Name);
  changeName(p2Input, p2Name);
}

function checkName() {
  inputs.forEach((input) => {
    if (input.value === "" || input.value == null) {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      input.nextElementSibling.style.display = "block";
    } else {
      input.nextElementSibling.style.display = "none";
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
  });
  if (
    p1Input.classList.contains("is-valid") &&
    p2Input.classList.contains("is-valid")
  ) {
    removeAddClass(formPannel, buttonGamePanel);
  }
}

function changeName(input, name) {
  name.textContent = input.value;
}
