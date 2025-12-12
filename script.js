const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-screen');

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) return;

    const value = target.value;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            // Check if the value is a number
            if (!isNaN(parseFloat(value))) {
                inputDigit(value);
            }
    }
    updateDisplay();
});

function inputDigit(digit) {
    if (waitingForSecondValue === true) {
        display.value = digit;
        waitingForSecondValue = false;
    } else {
        display.value = display.value === '0' ? digit : display.value + digit;
    }
}

function inputDecimal(dot) {
    // Prevent multiple decimals
    if (waitingForSecondValue === true) {
        display.value = '0.';
        waitingForSecondValue = false;
        return;
    }
    if (!display.value.includes(dot)) {
        display.value += dot;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(display.value);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null && !isNaN(inputValue)) {
        firstValue = inputValue;
    } else if (operator) {
        const result = calculate(firstValue, inputValue, operator);
        
        // Use precision to fix floating point issues
        firstValue = parseFloat(result.toFixed(7));
    }

    waitingForSecondValue = true;
    operator = nextOperator === '=' ? null : nextOperator;
}

function calculate(first, second, op) {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '*') return first * second;
    if (op === '/') return first / second;
    
    return second;
}

function resetCalculator() {
    display.value = '';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}

function updateDisplay() {
    // Ensures the display is updated after every action
}
