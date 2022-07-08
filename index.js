const CALCULATOR_CONFIG = {
  0: { type: 'number', value: 0, title: '0' },
  1: { type: 'number', value: 1, title: '1' },
  4: { type: 'number', value: 4, title: '4' },
  5: { type: 'number', value: 5, title: '5' },
  6: { type: 'number', value: 6, title: '6' },
  2: { type: 'number', value: 2, title: '2' },
  3: { type: 'number', value: 3, title: '3' },
  7: { type: 'number', value: 7, title: '7' },
  8: { type: 'number', value: 8, title: '8' },
  9: { type: 'number', value: 9, title: '9' },

  plus: {
    type: 'operator',
    value: 'plus',
    title: '+',
    handler: function (firstOperand, secondOperand) {
      return parseFloat(firstOperand) + parseFloat(secondOperand);
    },
  },
  minus: {
    type: 'operator',
    value: 'minus',
    title: '-',
    handler: function (firstOperand, secondOperand) {
      return parseFloat(firstOperand) - parseFloat(secondOperand);
    },
  },
  divide: {
    type: 'operator',
    value: 'divide',
    title: '&#247',
    handler: function (firstOperand, secondOperand) {
      return parseFloat(firstOperand) / parseFloat(secondOperand);
    },
  },
  multiply: {
    type: 'operator',
    value: 'multiply',
    title: '&#215',
    handler: function (firstOperand, secondOperand) {
      return parseFloat(firstOperand) * parseFloat(secondOperand);
    },
  },
  dot: {
    type: 'number',
    value: '.',
    title: '.',
  },
  clear: {
    type: 'clear',
    value: 'clear',
    title: 'C',
  },
  delete: {
    type: 'delete',
    value: 'delete',
    title: '&#8594',
  },
  equal: { type: 'result', value: 'equal', title: '=' },
};

class Button {
  constructor({ title, value, type }) {
    this.title = title;
    this.value = value;
    this.type = type;

    return this.render();
  }

  render() {
    const button = document.createElement('button');
    button.innerHTML = this.title;
    button.setAttribute('data-value', this.value);
    button.setAttribute('data-type', this.type);
    button.classList.add('button');
    return button;
  }
}

class Screen {
  constructor() {
    this.value = 0;
    this.input;
  }

  render = () => {
    this.input = document.createElement('input');
    this.input.setAttribute('type', 'text');
    this.input.setAttribute('readonly', true);
    this.input.setAttribute('value', this.value);
    this.input.classList.add('input');

    return this.input;
  };

  setValue = (newValue) => {
    this.input.setAttribute('value', newValue);
  };
}

class Calculator {
  constructor(config) {
    this.root = document.querySelector('#root');
    this.config = config;

    this.numPad;
    this.screen = new Screen();

    this.firstOperand = '';
    this.secondOperand = '';
    this.operator = null;
    this.result = '';
    this.lastEqualsButton = false;
    this.lastOperatorButton = false;

    this.init();
  }

  init = () => {
    this.root.appendChild(this.screen.render());

    this.numPad = document.createElement('div');
    this.numPad.classList.add('numPad');

    Object.keys(this.config).forEach((key) => {
      this.numPad.appendChild(new Button(this.config[key]));
    });

    this.root.appendChild(this.numPad);
    this.numPad.classList.add('numPad');

    this.numPad.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-value')) {
        const type = event.target.getAttribute('data-type');
        const value = event.target.getAttribute('data-value');

        console.log('this.firstOperand');
        console.log(this.firstOperand);
        console.log('this.secondOperand');
        console.log(this.secondOperand);
        console.log('this.operator');
        console.log(this.operator);
        console.log('result');
        console.log(this.result);

        switch (type) {
          case 'number':
            if (!this.operator) {
              if (value === '.' && !this.firstOperand) {
                this.setOperand('0.', 'firstOperand', true);
              } else {
                this.setOperand(value, 'firstOperand');
              }
            } else {
              if (value === '.' && !this.secondOperand) {
                this.setOperand('0.', 'secondOperand');
              } else {
                this.setOperand(value, 'secondOperand');
              }
            }
            this.lastEqualsButton = false;
            this.lastOperatorButton = false;
            break;
          case 'operator':
            if (this.firstOperand && this.secondOperand === '') {
            } else if (this.firstOperand && this.secondOperand && !this.lastEqualsButton) {
              this.calculateResult(this.firstOperand, this.secondOperand, this.operator);
              this.setOperand('', 'secondOperand', true);
              this.setOperand(this.result, 'firstOperand', true);
            } else if (this.firstOperand && this.secondOperand && this.lastEqualsButton) {
              this.setOperand(this.result, 'secondOperand');
              this.setOperand(this.result, 'firstOperand');
            }
            this.operator = value;
            this.lastEqualsButton = false;
            this.lastOperatorButton = true;
            break;
          case 'result':
            this.calculateResult(this.firstOperand, this.secondOperand, this.operator);
            this.setOperand(this.result, 'firstOperand', true);
            this.lastEqualsButton = true;
            this.lastOperatorButton = false;
            break;
          case 'clear':
            this.clearAll();
            break;
          case 'delete':
            if (this.result == 'Infinity') {
              this.clearAll();
            } else {
              this.result = Number(this.result.toString().slice(0, -1));
              this.setOperand(this.result, 'firstOperand', true);
              this.setOperand('', 'secondOperand', true);
              this.operator = null;
              this.screen.setValue(this.roundUpTo8(this.result));
            }
            break;

          default:
            return;
        }
      }
    });
  };

  clearAll() {
    this.result = '';
    this.operator = null;
    this.setOperand('', 'firstOperand', true);
    this.setOperand('', 'secondOperand', true);
    this.lastEqualsButton = false;
    this.lastOperatorButton = false;
    this.screen.setValue(0);
  }
  setOperand = (newValue, operand, replace = false) => {
    console.log('this.lastOperatorButton');
    console.log(this.lastOperatorButton);
    console.log('this.lastEqualsButton');
    console.log(this.lastEqualsButton);
    if (this.lastOperatorButton || this.lastEqualsButton || replace) {
      this[operand] = newValue;
    } else {
      this[operand] += newValue;
    }
    this.screen.setValue(this.roundUpTo8(this[operand]));
  };

  calculateResult = (firstOperand, secondOperand, operator) => {
    if (!this.operator) {
      return null;
    }
    const handler = this.config[operator].handler;

    if (handler && (this.firstOperand || this.secondOperand) && this.operator) {
      this.result = handler(firstOperand, secondOperand);
      this.screen.setValue(this.roundUpTo8(this.result));
    }
  };

  roundUpTo8 = (number, decimals = 8) => {
    let num = Number(number);
    return parseFloat(num.toFixed(decimals));
  };
}

new Calculator(CALCULATOR_CONFIG);
