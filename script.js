const themeButton = document.querySelector(".themes__toggle");
const calculatorButtons = document.querySelectorAll(`[data-type]`);
const calcResult = document.querySelector(".calc__result");

const toggleTheme = () => {
  themeButton.classList.toggle("themes__toggle--isActive");
};
const toggleThemeWithEnter = (event) => {
  event.key === "Enter" && toggleTheme();
};

themeButton.addEventListener("keydown", (e) => toggleThemeWithEnter(e));

themeButton.addEventListener("click", toggleTheme);

let storedNumber = "";
let currentNumber = "";
let operation = "";

const updateUI = (value) => {
  calcResult.innerText = !value ? "0" : value;
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;
  currentNumber += value;
  updateUI(currentNumber);
};

const keysHandler = (button) => {
  button.addEventListener("click", () => {
    button.dataset.type === "number" &&
      numberButtonHandler(button.dataset.value);
  });
};

calculatorButtons.forEach(keysHandler);
