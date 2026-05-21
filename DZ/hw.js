const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function findMaxOnesSequence() {
    rl.question("Введите строку, состоящую из 0 и 1: ", (input) => {
        if (!input || !/^[01]+$/.test(input)) {
            console.log("Ошибка: строка должна состоять только из 0 и 1");
            rl.close();
            return;
        }

        let maxLength = 0;
        let currentLength = 0;

        for (let i = 0; i < input.length; i++) {
            if (input[i] === "1") {
                currentLength++;
                if (currentLength > maxLength) {
                    maxLength = currentLength;
                }
            } else {
                currentLength = 0;
            }
        }

        console.log(maxLength);
        rl.close();
    });
}

function flatternArray(inputArr) {
    let result = [];

    for (let i = 0; i < inputArr.length; i++) {
        if (Array.isArray(inputArr[i])) {
            result = result.concat(flatternArray(inputArr[i]));
        } else {
            result.push(inputArr[i]);
        }
    }

    return result;
}

function flatten() {
    rl.question("Введите массив (например: [1, 2, [3, 4]]): ", (input) => {
        try {
            const arr = eval(input);

            if (!Array.isArray(arr)) {
                console.log("Ошибка: введите корректный массив");
                rl.close();
                return;
            }

            const flattenedArray = flatternArray(arr);
            console.log("\n Исходный массив:");
            console.log(arr);
            console.log("\n Полученный массив:");
            console.log(flattenedArray);
            rl.close();
        } catch (error) {
            console.log("Неверный формат массива");
            rl.close();
        }
    });
}

rl.question(
    "Выберите задание:\n1 - Поиск максимальной последовательности единиц\n2 - Выравнивание массива\n",
    (choice) => {
        if (choice === "1") {
            findMaxOnesSequence();
        } else if (choice === "2") {
            flatten();
        } else {
            console.log("Ошибка: выберите 1 или 2");
            rl.close();
        }
    },
);
