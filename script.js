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

const resetButtonHandler = () => {
  currentNumber = "";
  storedNumber = "";
  operation = "";
  updateUI(currentNumber);
};

const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === "0") return;
  if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }
  updateUI(currentNumber);
};

const excuteOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
      case "/":
        if (currentNumber === "0") updateUI("Zero Division Error");
        else {
          storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        }
        break;
    }
    updateUI(storedNumber);
    currentNumber = "";
  }
};

const operationButtonHandler = (operationValue) => {
  if (!currentNumber && !storedNumber) return;
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;

    if (currentNumber) excuteOperation();
  }
};

const keysHandler = (button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.type;
    if (type === "number") {
      numberButtonHandler(button.dataset.value);
    } else if (type === "operation") {
      switch (button.dataset.value) {
        case "c":
          resetButtonHandler();
          break;
        case "Backspace":
          deleteButtonHandler();
          break;
        case "Enter":
          excuteOperation();
          break;
        default:
          operationButtonHandler(button.dataset.value);
          break;
      }
    }
  });
};

calculatorButtons.forEach(keysHandler);
