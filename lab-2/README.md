# Отчет по лабораторной работе №2: "Калькулятор. JavaScript"

## Содержание

1. [Название работы](#1-название-работы)
2. [Цель работы](#2-цель-работы)
3. [Основное задание](#3-основное-задание)
4. [Дополнительное задание](#4-дополнительное-задание)

---

## 1. Название работы

**Тема:** Разработка интерактивных пользовательских интерфейсов. Создание клиентских скриптов на языке JavaScript для управления компонентами веб-страниц на примере приложения "Калькулятор".

---

## 2. Цель работы

Знакомство с инструментами построения пользовательских интерфейсов веб-сайтов: HTML, CSS, JavaScript. Изучение программирования логики кнопок калькулятора, доступа к DOM-элементам и обработки событий ввода.

---

## 3. Основное задание

В рамках основного задания была реализована привязка кнопок калькулятора, считывание цифр и формирование строк для вывода на экран текущего математического выражения.

### Разметка кнопок калькулятора (`Calculator.html`)

```html
<div id="calc-body" class="calc-body">
    <div id="history" class="calc-history"></div>
    <div id="result" class="calc-result">0</div>

    <div>
        <button id="btn_op_clear" class="button extra">C</button>
        <button id="btn_op_sign" class="button extra">+/-</button>
        <button id="btn_op_percent" class="button extra">%</button>
        <button id="btn_op_div" class="button operations">/</button>
        <button id="btn_op_pow" class="button operations">x²</button>
    </div>
</div>
```

### Обработка ввода цифр (mine.js)

```JavaScript
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
```

---

## 4. Дополнительное задание

Последовательный ввод нескольких операций и добавлене окна истории для сохранения предыдущего выражения.

### Стили окна истории и результата (style.css)

```CSS
.calc-history {
  height: 40px;
  border: 1px solid rgb(69, 69, 69);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  font-size: xx-large;
  color: rgb(142, 142, 142);
  background-color: rgb(69, 69, 69);
  text-align: right;
  padding-right: 10px;
  padding-top: 10px;
}
.calc-result {
  height: 60px;
  border: 1px solid rgb(69, 69, 69);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  font-size: xxx-large;
  color: rgb(211, 50, 5);
  background-color: rgb(69, 69, 69);
  text-align: right;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 20px;
  padding-left: 1px;
  padding-right: 10px;
}
```

### Последовательное вычисление и вывод в окно истории (mine.js)

```JavaScript
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
        break;
    }
  } else {
    console.log("a and b");
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
  }
  return expressionResult;
}

document.getElementById("btn_op_equal").onclick = function () {
  expressionResult = intermediateResult();
  a = expressionResult;
  b = "";
  selectedOperation = "";
  outputHistory.innerHTML = expressionOutput + "=";
  expressionOutput = expressionResult;
  outputElement.innerHTML = expressionResult;
};
```
