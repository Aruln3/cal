// Get the calculator container element
let calculator = document.getElementById('calculator');

// Create the display element and append it to the calculator container
let display = document.createElement('input');
display.setAttribute('type', 'text');
display.setAttribute('id', 'display');
display.setAttribute('disabled', 'disabled');
calculator.appendChild(display);

// Create the number buttons and append them to the calculator container
for (let i = 0; i < 10; i++) {
    let button = document.createElement('button');
    button.setAttribute('class', 'number');
    button.setAttribute('value', i);
    button.textContent = i;
    button.addEventListener('click', function() {
        let value = this.getAttribute('value');
        display.value += value;
    });
    calculator.appendChild(button);
}

// Create the operator buttons and append them to the calculator container
let operators = ['+', '-', '*', '/', '%', 'C','M+', 'M-', 'MC', '='];
let operand1 = null;
let operator = null;
let memory = 0;

for (let i = 0; i < operators.length; i++) {
    let button = document.createElement('button');
    button.setAttribute('class', 'operator');
    button.setAttribute('value', operators[i]);
    button.textContent = operators[i];
    button.addEventListener('click', function() {
        let value = this.getAttribute('value');
        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                operand1 = display.value;
                operator = value;
                display.value = '';
                break;
            case 'C':
                operand1 = null;
                operator = null;
                display.value = '';
                break;
            case 'M+':
                memory += parseFloat(display.value);
                display.value = '';
                break;
            case 'M-':
                memory -= parseFloat(display.value);
                display.value = '';
                break;
            case 'MC':
                memory = 0;
                display.value = '';
                break;
            case '=':
                let operand2 = display.value;
                let result = null;
                
                switch (operator) {
                    case '+':
                        result = parseFloat(operand1) + parseFloat(operand2);
                        break;
                    case '-':
                        result = parseFloat(operand1) - parseFloat(operand2);
                        break;
                    case '*':
                        result = parseFloat(operand1) * parseFloat(operand2);
                        break;
                    case '/':
                        result = parseFloat(operand1) / parseFloat(operand2);
                        break;
                    case '%':
                        result = parseFloat(operand1) % parseFloat(operand2);
                        break;
                }

                display.value = result;
                operand1 = result;
                operator = null;
                break;
            default:
                if (isNaN(parseFloat(value))) {
                    alert('Only numbers are allowed.');
                } else {
                    display.value += value;
                }
                break;
        }
    });
    calculator.appendChild(button);
}
