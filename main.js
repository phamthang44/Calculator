const features = document.querySelector(".features");
const lastResult = document.querySelector(".last-result");
const display = document.querySelector(".display");

features.addEventListener("click", showNumber);
features.addEventListener("click", handleClear);
features.addEventListener("click", handleConvertNumber);
features.addEventListener("click", showPercentNumber);
features.addEventListener("click", checkDisplay);
features.addEventListener("click", handleOperators);
features.addEventListener("click", handleOverFlow);
features.addEventListener("mousedown", handleNaN);
features.addEventListener("click", handleNaN);
features.addEventListener("click", handleUndefined);
features.addEventListener("mousedown", handleUndefined);

function showNumber(e) {
  let number = +e.target.innerHTML;
  if (display.innerHTML === "0" || display.innerHTML === lastResult.innerHTML) {
    display.innerHTML = "";
  }
  if (isNumber(number)) {
    display.innerHTML += String(number);
  }
  changeClearButton();
}

function changeClearButton() {
  const ac = document.querySelector(".clear");
  if (ac) {
    if (display.innerHTML) {
      ac.innerHTML = "⌫";
    } else {
      ac.innerHTML = "AC";
    }
  } else return;
}

function handleClear(e) {
  let resultDisplay = display.innerHTML;
  //   let fontSize = parseFloat(window.getComputedStyle(display).fontSize);
  //   fontSize = fontSize / 10;
  //console.log(isInfinity(Number(resultDisplay)));

  //   if (isInfinity(Number(resultDisplay))) {
  //     handleClearInfinity();
  //   }

  if (e.target.className === "button btn-top clear") {
    if (isExponential(display.innerHTML)) {
      resultDisplay = Number(display.innerHTML).toFixed(6);
    }
    if (resultDisplay.length > 1) {
      display.innerHTML = "0";
    }
    if (e.target.classList.contains("clear")) {
      let result = String(resultDisplay).split("");

      const clear = document.querySelector(".clear");

      if (clear.innerHTML === "⌫") {
        if (isInfinity(Number(resultDisplay))) {
          result.splice(1);
        }

        if (resultDisplay.includes(".")) {
          let index = resultDisplay.indexOf(".");
          let afterCut = resultDisplay.slice(index);
          let arr = afterCut.split("");
          const isAnyNumberAfterDot = arr.some((item) => item !== 0);
          if (!isAnyNumberAfterDot) {
            result.splice(1);
          } else {
            result.splice(index);
          }
        }

        result.splice(-1, 1);

        // if (resultDisplay.length > 9) {
        //   fontSize--;
        //   display.style.setProperty("font-size", `${fontSize}rem`);
        // } else if (fontSize <= 5) {
        //   fontSize++;
        //   display.style.setProperty("font-size", `${fontSize}rem`);
        // } else {
        //   result.splice(1);
        // }

        display.innerHTML = result.join("");
      } else if (clear.innerHTML === "AC") {
        display.innerHTML = "0";
        lastResult.innerHTML = "0";
      }
    }
  }
}

// function handleClearInfinity() {
//   display.innerHTML = "0";
// }

function handleNaN() {
  if (display.innerHTML.includes("NaN")) {
    display.innerHTML = "undefined";
    lastResult.innerHTML = "undefined";
  }
}

function handleUndefined() {
  if (display.innerHTML.includes("undefined")) {
    display.innerHTML = "0";
    lastResult.innerHTML = "0";
  }
}

function isInfinity(num) {
  return (
    typeof num === "number" &&
    !isNaN(num) &&
    (num === Infinity || num === -Infinity)
  );
}

function isNumber(number) {
  return typeof number === "number" && !isNaN(number);
}
function checkDisplay(e) {
  const ac = document.querySelector(".clear");
  if (display.innerHTML === "") {
    display.innerHTML = "0";
    ac.innerHTML = "AC";
  }
}

function handleConvertNumber(e) {
  if (e.target.closest(".convert")) {
    let number = +display.innerHTML;
    if (isNumber(number)) {
      display.innerHTML = isPositive(number)
        ? convertNegativeNumber(number)
        : convertPositiveNumber(number);
    }
  }
}

function showPercentNumber(e) {
  if (e.target.closest(".percent")) {
    if (display.innerHTML.includes("%")) return;
    display.innerHTML += "%";
  }
}

function handleConvertPercent() {
  if (display.innerHTML) {
    let number = display.innerHTML.replace("%", "");
    display.innerHTML = convertPercent(Number(number));
  } else return;
}
function handlePlus() {
  if (display.innerHTML) {
    let number = display.innerHTML;

    let arr = number.split("+");

    if (arr.length === 2) {
      display.innerHTML = sum(+arr[0], +arr[1]);
    } else {
      console.log("Error here");
    }
  } else return;
}

function handleMinus() {
  if (display.innerHTML) {
    let number = display.innerHTML;

    let arr = number.split("-");

    if (arr.length === 2) {
      display.innerHTML = minus(+arr[0], +arr[1]);
    } else {
      console.log("Error here");
    }
  } else return;
}

function handleMultiply() {
  if (display.innerHTML) {
    let number = display.innerHTML;

    let arr = number.split("×");

    if (arr.length === 2) {
      display.innerHTML = multiply(+arr[0], +arr[1]);
    } else {
      console.log("Error here");
    }
  } else return;
}

function handleDivide() {
  if (display.innerHTML) {
    let number = display.innerHTML;

    let arr = number.split("÷");

    if (arr.length === 2) {
      display.innerHTML = divide(+arr[0], +arr[1]);
    } else {
      console.log("Error here");
    }
  } else return;
}

function handleOperators(e) {
  if (e.target.classList.contains("operator")) {
    const operator = e.target.innerHTML;
    switch (operator) {
      case "+":
        showPlus();
        break;
      case "-":
        showMinus();
        break;
      case "×":
        showMultiply();
        break;
      case "÷":
        showDivide();
        break;
      case "%":
        showPercentNumber();
        break;
      case "=":
        const helpMe = display.innerHTML;
        if (helpMe.includes("%")) {
          handleConvertPercent();
        } else if (helpMe.includes("+")) {
          handlePlus();
        } else if (helpMe.includes("-")) {
          handleMinus();
        } else if (helpMe.includes("×")) {
          handleMultiply();
        } else if (helpMe.includes("÷")) {
          handleDivide();
        }
        saveLastResult();
        break;
      default:
        break;
    }
  }
}

function sum(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function divide(a, b) {
  if (b !== 0) {
    if (a !== 0) {
      return a / b;
    } else return "Error";
  } else return Infinity;
}

function multiply(a, b) {
  return a * b;
}

function isPositive(number) {
  return number > 0;
}

function isNegative(number) {
  return number < 0;
}

function convertPositiveNumber(number) {
  if (isNumber(number)) {
    return Math.abs(number);
  }
  return undefined;
}

function convertNegativeNumber(number) {
  if (isNumber(number)) {
    return -number;
  }
}

function convertPercent(number) {
  if (isNumber(number)) {
    return number / 100;
  }
}

function isExponential(num) {
  return num.includes("e");
}

function saveLastResult() {
  lastResult.innerHTML = display.innerHTML;
  lastResult.style.opacity = 1;
}

function showPlus() {
  if (display.innerHTML.includes("+")) return;
  display.innerHTML += "+";
}

function showMinus() {
  if (display.innerHTML.includes("-")) return;
  display.innerHTML += "-";
}

function showMultiply() {
  if (display.innerHTML.includes("×")) return;
  display.innerHTML += "×";
}

function showDivide() {
  if (display.innerHTML.includes("÷")) return;
  display.innerHTML += "÷";
}

function handleOverFlow(e) {
  if (display.innerHTML.length > 10) {
    display.innerHTML = Number(display.innerHTML).toFixed(6);
  }
}
