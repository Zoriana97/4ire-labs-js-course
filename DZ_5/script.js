let outputElem = document.querySelector('input[type="text"]');

let memoryIndicatorElem = document.querySelector('.memory-indicator');

let calculator = {
    output: '',
    result: 0,
    operator: '',
    memory: 0,
    showMemoryIndicator: false,
    shouldClearMemory: false
};

const numberArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

const operatorArr = ['+', '-', '*', '/'];

function renderCalculator() {
    outputElem.value = calculator.output;
    if (calculator.showMemoryIndicator) {
        memoryIndicatorElem.style.display = 'block';
    } else {
        memoryIndicatorElem.style.display = 'none';
    }
}

function calculateResult() {
    if (!calculator.output) {
        return;
    }

    switch (calculator.operator) {
        case '+':
            calculator.result += Number(calculator.output);
            break;
        case '-':
            calculator.result -= Number(calculator.output);
            break;
        case '*':
            calculator.result *= Number(calculator.output);
            break;
        case '/':
            calculator.result /= Number(calculator.output);
            break;
        case '':
            calculator.result = Number(calculator.output);
            break;
    }

    calculator.output = calculator.result;
    renderCalculator();
    calculator.output = '';
}

function onEnterNumber(value) {
    const newOutput = calculator.output + value;
    if (!Number.isNaN(Number(newOutput))) {
        calculator.output = newOutput;
        renderCalculator();
    }
    calculator.shouldClearMemory = false;
}

function onEnterOperator(operator) {
    if (!calculator.output && operator === '-') {
        calculator.output = '-';
        renderCalculator();
    } else {
        calculateResult();
        calculator.operator = operator;
    }
    calculator.shouldClearMemory = false;
}

function onEnterEqual() {
    calculateResult();
    calculator.operator = '';
    calculator.shouldClearMemory = false;
}

function onCancel() {
    calculator.output = '';
    calculator.operator = '';
    calculator.result = 0;
    renderCalculator();
    calculator.shouldClearMemory = false;
}

function onAddToMemory() {
    calculator.showMemoryIndicator = true;
    calculateResult();
    calculator.memory += calculator.result;
    calculator.shouldClearMemory = false;
}

function onSubstractFromMemory() {
    calculator.showMemoryIndicator = true;
    calculateResult();
    calculator.memory -= calculator.result;
    calculator.shouldClearMemory = false;
}

function onShowMemory() {
    if (calculator.shouldClearMemory) {
        calculator.memory = 0;
        calculator.showMemoryIndicator = false;
        calculator.shouldClearMemory = false;
        calculator.output = '';
        renderCalculator();
    } else if(calculator.showMemoryIndicator) {
        calculator.output = calculator.memory;
        renderCalculator();
        calculator.shouldClearMemory = true;
    }
}

window.addEventListener('click', function (e) {
    if (e.target.value === 'C') {
        onCancel();
    } else if (e.target.value === '=') {
        onEnterEqual();
    } else if (numberArr.includes(e.target.value)) {
        onEnterNumber(e.target.value);
    } else if (operatorArr.includes(e.target.value)) {
        onEnterOperator(e.target.value);
    } else if (e.target.value === 'm+') {
        onAddToMemory();
    } else if(e.target.value === 'm-') {
        onSubstractFromMemory();
    } else if(e.target.value === 'mrc') {
        onShowMemory();
    }
});

// m - m+
// n - m-
// r - mrc
window.addEventListener('keydown', function(e) {
    if (e.key === 'c') {
        onCancel();
    } else if (e.key === '=') {
        onEnterEqual();
    } else if (numberArr.includes(e.key)) {
        onEnterNumber(e.key);
    } else if (operatorArr.includes(e.key)) {
        onEnterOperator(e.key);
    } else if (e.key === 'm') {
        onAddToMemory();
    } else if(e.key === 'n') {
        onSubstractFromMemory();
    } else if(e.key === 'r') {
        onShowMemory();
    }
});