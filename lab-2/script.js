window.onload = function () {
  let a = "";
  let b = "";
  let expressionResult = "";
  let expressionOutput = "";
  let selectedOperation = "";
  const outputHistory = document.getElementById("history");
  const outputElement = document.getElementById("result");
  const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

  function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
      if (digit != "." || (digit == "." && !a.includes(digit))) {
        a += digit;
      }
      expressionOutput = a;
      outputElement.innerHTML = expressionOutput;
    } else {
      if (digit != "." || (digit == "." && !b.includes(digit))) {
        b += digit;
        outputElement.innerHTML = expressionOutput + selectedOperation + b;
      }
    }
    console.log(expressionOutput + selectedOperation + b);
    console.log(a + selectedOperation + b);
  }

  function intermediateResult() {
    if (b === "") {
      console.log("only a");
      switch (selectedOperation) {
        case "%":
          expressionResult = +a / 100;
          expressionOutput = expressionOutput + "%";
          break;
        case "²":
          expressionResult = +a * +a;
          expressionOutput = expressionOutput + "²";
          break;
        case "√":
          if (a < 0) return;
          expressionResult = Math.sqrt(a);
          expressionOutput = "√" + expressionOutput;
          break;
        case "!":
          if (a < 0) return;
          let fac = 1;
          for (let i = 2; i <= a; i++) {
            fac *= i;
          }
          expressionResult = fac;
          expressionOutput = expressionOutput + "!";
          break;

        default:
          expressionResult = a;
          break;
      }
    } else {
      switch (selectedOperation) {
        case "x":
          expressionResult = +a * +b;
          break;
        case "+":
          expressionResult = +a + +b;
          break;
        case "-":
          expressionResult = +a - +b;
          break;
        case "/":
          expressionResult = +a / +b;
          break;

        default:
          break;
      }
      expressionOutput = expressionOutput + selectedOperation + b;
    }

    selectedOperation = "";
    b = "";
    console.log(expressionResult.toString());
    return expressionResult.toString();
  }

  digitButtons.forEach((button) => {
    console.log("digitButtons");
    button.onclick = function () {
      const digitValue = button.innerHTML;
      onDigitButtonClicked(digitValue);
    };
  });

  document.getElementById("btn_op_theme").onclick = function () {
    if (
      document.getElementById("calc-body").style.backgroundColor ===
      "rgb(241, 244, 244)"
    ) {
      document.getElementById("calc-body").style.backgroundColor =
        "rgb(23, 23, 23)";
      document.getElementById("result").style.backgroundColor =
        "rgb(69, 69, 69)";
      document.getElementById("result").style.color = "rgb(255, 255, 255)";
      document.getElementById("history").style.backgroundColor =
        "rgb(69, 69, 69)";
      document.getElementById("history").style.color = "rgb(255, 255, 255)";
    } else {
      document.getElementById("calc-body").style.backgroundColor =
        "rgb(241, 244, 244)";
      document.getElementById("result").style.backgroundColor =
        "rgb(255, 255, 255)";
      document.getElementById("result").style.color = "rgb(69, 69, 69)";
      document.getElementById("history").style.backgroundColor =
        "rgb(255, 255, 255)";
      document.getElementById("history").style.color = "rgb(69, 69, 69)";
    }
  };

  document.getElementById("btn_op_plus").onclick = function () {
    if (a === "") return;
    a = intermediateResult();
    selectedOperation = "+";
    outputElement.innerHTML = expressionOutput + "+";
  };

  document.getElementById("btn_op_mult").onclick = function () {
    if (a === "") return;
    a = intermediateResult();
    selectedOperation = "x";
    outputElement.innerHTML = expressionOutput + "x";
  };

  document.getElementById("btn_op_minus").onclick = function () {
    if (a === "") return;
    a = intermediateResult();
    selectedOperation = "-";
    outputElement.innerHTML = expressionOutput + "-";
  };

  document.getElementById("btn_op_div").onclick = function () {
    if (a === "") return;
    a = intermediateResult();
    selectedOperation = "/";
    outputElement.innerHTML = expressionOutput + "/";
  };

  document.getElementById("btn_op_sign").onclick = function () {
    if (a === "") return;
    a = a * -1;
    outputElement.innerHTML = a;
  };

  document.getElementById("btn_op_percent").onclick = function () {
    if (a === "") return;
    a = intermediateResult();
    selectedOperation = "%";
    outputElement.innerHTML = a + "%";
  };

  document.getElementById("btn_op_pow").onclick = function () {
    if (a === "") return;
    a = intermediateResult();
    selectedOperation = "²";
    outputElement.innerHTML = a + "²";
  };

  document.getElementById("btn_op_sqrt").onclick = function () {
    if (a === "") return;
    a = intermediateResult();
    selectedOperation = "√";
    outputElement.innerHTML = "√" + a;
  };

  document.getElementById("btn_op_fac").onclick = function () {
    if (a === "") return;
    a = intermediateResult();
    selectedOperation = "!";
    outputElement.innerHTML = +a + "!";
  };

  document.getElementById("btn_op_clear").onclick = function () {
    a = "";
    b = "";
    selectedOperation = "";
    expressionResult = "";
    outputHistory.innerHTML = "";
    outputElement.innerHTML = 0;
  };

  document.getElementById("btn_op_equal").onclick = function () {
    expressionResult = intermediateResult();
    a = expressionResult;
    b = "";
    selectedOperation = "";
    outputHistory.innerHTML = expressionOutput + "=" + expressionResult;
    outputElement.innerHTML = a;
    expressionOutput = a;
  };
};
