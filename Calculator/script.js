const display = document.getElementById("display");

let currentInput = "0";
let calculation = "";
let lastButtonWasEquals = false;

function updateDisplay() {
  display.value = currentInput;
}

function clearDisplay() {
  currentInput = "0";
  calculation = "";
  lastButtonWasEquals = false;
  updateDisplay();
}

function backspace() {
  if (currentInput.length === 1) {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

function appendNumber(num) {
  if (currentInput === "0" || lastButtonWasEquals) {
    currentInput = num;
    lastButtonWasEquals = false;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function appendOperation(op) {
  if (!lastButtonWasEquals) {
    calculation = currentInput + op;
    currentInput = calculation;
    updateDisplay();
  } else {
    calculation = currentInput + op;
    lastButtonWasEquals = false;
    updateDisplay();
  }
}

function calculate() {
  try {
    // Replace × with * for JavaScript eval
    let expr = currentInput.replace(/×/g, "*");

    // Calculate result
    let result = eval(expr);
    // If the result is integer, show without decimal
    if (Number.isInteger(result)) {
      currentInput = result.toString();
    } else {
      currentInput = result.toFixed(4).replace(/\.?0+$/, "");
    }

    calculation = currentInput;
    lastButtonWasEquals = true;
  } catch (error) {
    currentInput = "Error";
    calculation = "";
    lastButtonWasEquals = true;
  }
  updateDisplay();
}

// Allow typing from keyboard (optional)
document.addEventListener("keydown", (e) => {
  if (/[0-9]/.test(e.key)) {
    appendNumber(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculate();
  } else if (e.key === "Escape") {
    clearDisplay();
  } else if (e.key === "Backspace") {
    backspace();
  } else if (e.key === "+" || e.key === "-" || e.key === "*") {
    appendOperation(e.key);
  } else if (e.key === "/") {
    appendOperation("/");
  } else if (e.key === "%") {
    appendOperation("%");
  } else if (e.key === ".") {
    appendNumber(".");
  }
});
