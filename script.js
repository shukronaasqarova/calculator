const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;

        if (buttonValue === 'AC') {
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay();
        } else if (buttonValue === '+/-') {
            currentInput = currentInput.charAt(0) === '-' ? currentInput.substring(1) : '-' + currentInput;
            updateDisplay();
        } else if (buttonValue === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
        } else if (['÷', '×', '-', '+'].includes(buttonValue)) {
            if (currentInput !== '') {
                operator = buttonValue === '÷' ? '/' : buttonValue === '×' ? '*' : buttonValue;
                previousInput = currentInput;
                currentInput = '';
            }
        } else if (buttonValue === '.') {
            if (!currentInput.includes('.')) {
                currentInput += buttonValue;
            }
        } else if (buttonValue === '=') {
            if (operator && previousInput !== '' && currentInput !== '') {
                currentInput = operate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
                previousInput = '';
                operator = '';
            }
        } else {
            currentInput += buttonValue;
        }

        updateDisplay();
    });
});

function updateDisplay() {
    display.value = currentInput;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return 0;
    }
}
