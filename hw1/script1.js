// 1
function func1() {
    let odd = 0, even = 0;

    for (let i = 1; i <= 50; i++) {
        if (i % 2 == 0) {
            ++even;
        } else {
            ++odd;
        }
    }
    console.log(`Четные числа: ${even}\nНечётные числа: ${odd}\n`);
}


// 2
function func2() {
    const prompt = require("prompt-sync")();
    const num = Number(prompt("Введите число: "));
    let total = 1;

    for (let i = 1; i <= num; i++) {
        total *= i;
    }
    console.log(`Фактроиал числа ${num} = ${total}\n`);
}


// 3 
function func3() {
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            console.log(`${i} * ${j} = ${i * j}`);
        }
        console.log("\n");
    }
    console.log("\n");
}


// 4
function func4() {
    const prompt = require("prompt-sync")();
    const num = Number(prompt("Введите число: "));
    let sum = 0, i = 1;

    while (num >= i) {
        sum += i;
        i++;
    }
    console.log(`Сумма чисел от 1 до ${num} = ${sum}\n`);
}


// 5
function func5() {
    for (let i = 1; i <= 100; i++) {
        if (i % 15 == 0) {
            console.log("FizzBuzz", i);
        } else if (i % 5 == 0) {
            console.log("Bizz", i);
        } else if (i % 3 == 0) {
            console.log("Fizz", i);
        }
    }
}


// 6
function func6() {
    // F(n) = F(n-1) + F(n-2)
    const prompt = require("prompt-sync")();
    const num = Number(prompt("Введите число: "));
    let a = 0, b = 1, c = 0;

    for (let i = 0; i <= num; i++) {
        console.log(a);
        c = a + b;
        a = b;
        b = c;
    }
}


// func1();
// func2();
// func3();
// func4();
// func5();
// func6();
