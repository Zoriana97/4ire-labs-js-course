function fibonacciSequence(f0, f1, n) {
    let currentNumber;

    if (n === 0) {
        return f0;
    }

    if (n === 1) {
        return f1;
    }

    if(n > 1) {
        for(let i = 1; i < n; i++) {
            currentNumber = f0 + f1;
            f0 = f1;
            f1 = currentNumber;
                    
            if (currentNumber === Infinity) {
                return currentNumber;
            }
        }
    } else if(n < 0) {
        for(let i = 0; i > n; i--) {
            currentNumber = f1 - f0;
            f1 = f0;
            f0 = currentNumber;

            if (currentNumber === -Infinity) {
                return currentNumber;
            }
        }
    }

    return currentNumber;
}

let loopExecution = true;

let f0 = 0;
let f1 = 1;
let n;

while(loopExecution) {
    n = prompt('Enter n:');

    if(isNaN(+n) || n % 1 !== 0 || n === '') {
        alert('The entered value is incorrect. Please, enter an integer number');
    } else if(n === null) {
        let exitProgram = confirm('Do you want to finish the process?');
        if(exitProgram) {
            alert('Have a nice day. Bye!');
            loopExecution = false;
        } else if(!exitProgram) {
            loopExecution = true;
        }
    } else {
        const result = fibonacciSequence(f0, f1, +n);
        const resultStr = result === Infinity || result === -Infinity ? String(result) : String(BigInt(result));

        alert(`${resultStr} is a number of generalized Fibonacci sequence where F0=${f0}, F1=${f1}, n=${n}`);        
        loopExecution = false;
    }
}