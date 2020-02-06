const readline = require('readline');
const colors = require('colors/safe');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите Ваше имя ', (answer) => {
    console.log(`Привет тебе от GeekBrains, ${colors.random(answer)} !`);
    rl.close();
});