const CALCULATOR_CONFIG = {
  10: { type: 'number', value: 0, title: '0', numbersPad: true },
  6: { type: 'number', value: 1, title: '1', numbersPad: true },
  7: { type: 'number', value: 4, title: '4', numbersPad: true },
  8: { type: 'number', value: 5, title: '5', numbersPad: true },
  3: { type: 'number', value: 6, title: '6', numbersPad: true },
  4: { type: 'number', value: 2, title: '2', numbersPad: true },
  5: { type: 'number', value: 3, title: '3', numbersPad: true },
  0: { type: 'number', value: 7, title: '7', numbersPad: true },
  1: { type: 'number', value: 8, title: '8', numbersPad: true },
  2: { type: 'number', value: 9, title: '9', numbersPad: true },

  9: {
    type: 'clear',
    value: 'clear',
    title: 'C',
    numbersPad: true,
  },
  11: {
    type: 'dot',
    value: '.',
    title: '.',
    numbersPad: true,
  },
  18: {
    type: 'operator',
    value: 'plus',
    title: '+',
    handler: function (firstOperand, secondOperand) {
      return parseFloat(firstOperand) + parseFloat(secondOperand);
    },
  },
  16: {
    type: 'operator',
    value: 'minus',
    title: '-',
    handler: function (firstOperand, secondOperand) {
      return parseFloat(firstOperand) - parseFloat(secondOperand);
    },
  },
  15: {
    type: 'operator',
    value: 'divide',
    title: '&#247',
    handler: function (firstOperand, secondOperand) {
      return parseFloat(firstOperand) / parseFloat(secondOperand);
    },
  },
  14: {
    type: 'operator',
    value: 'multiply',
    title: '&#215',
    handler: function (firstOperand, secondOperand) {
      return parseFloat(firstOperand) * parseFloat(secondOperand);
    },
  },

  13: {
    type: 'delete',
    value: 'delete',
    title: '&#8594',
  },

  12: {
    type: 'inverse',
    value: 'inverse',
    title: '&#177',
  },
  17: { type: 'result', value: 'equal', title: '=' },
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
    this.display = '';
    this.lastEqualsButton = false;
    this.lastOperatorButton = false;
    this.lastDelete = false;
    this.init();
  }

  init = () => {
    this.root.classList.add('wrapper');
    this.root.appendChild(this.screen.render());

    this.numPad = document.createElement('div');
    this.numPad.classList.add('numPad');
    /////NEW///
    this.numbers = document.createElement('div');
    this.numbers.classList.add('numbersWrapper');
    this.operators = document.createElement('div');
    this.operators.classList.add('operatorsWrapper');

    Object.values(this.config).forEach((value) => {
      let child = new Button(value);
      let className = () => {
        if (child.getAttribute('data-type') === 'number') {
          return 'numButton';
        } else if (child.getAttribute('data-type') === 'operator') {
          return 'operatorButton';
        } else if (child.getAttribute('data-type') === 'clear') {
          return 'clearButton';
        } else if (child.getAttribute('data-type') === 'result') {
          return 'resultButton';
        } else {
          return 'funcButton';
        }
      };
      child.classList.add(className());

      if (value.numbersPad) {
        this.numbers.appendChild(child);
      } else {
        this.operators.appendChild(child);
      }
    });

    this.numPad.appendChild(this.numbers);
    this.numPad.appendChild(this.operators);
    /////NEW///

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
          case 'dot':
            break;
          case 'number':
            if (!this.operator) {
              if (!this.firstOperand) {
                this.setOperand('0.', 'firstOperand', true);
                this.setOperand('', 'secondOperand', true);
                this.display = this.firstOperand;
              } else {
                this.setOperand(value, 'firstOperand', false);
                this.display = this.firstOperand;
              }
            } else {
              if (value === '.' && !this.secondOperand) {
                this.setOperand('0.', 'secondOperand', true);
                this.display = this.secondOperand;
              } else {
                this.setOperand(value, 'secondOperand', false);
                this.display = this.secondOperand;
              }
            }
            this.screen.setValue(this.roundUpTo8(this.display));
            this.lastEqualsButton = false;
            this.lastOperatorButton = false;
            console.log('THIS DISPLAY');
            console.log(this.display);
            break;
          case 'operator':
            if (this.firstOperand && this.secondOperand === '') {
            } else if (this.firstOperand && this.secondOperand && !this.lastEqualsButton) {
              this.calculateResult(this.firstOperand, this.secondOperand, this.operator);
              this.setOperand('', 'secondOperand', true);
              this.setOperand(this.result, 'firstOperand', true);
              this.display = this.firstOperand;
            } else if (this.firstOperand && this.secondOperand && this.lastEqualsButton) {
              // this.lastOperatorButton || this.lastEqualsButton
              if (this.lastEqualsButton) {
                this.setOperand(this.result, 'secondOperand', true);
                this.setOperand(this.result, 'firstOperand', true);
              }
            }
            this.operator = value;
            this.lastEqualsButton = false;
            this.lastOperatorButton = true;
            console.log('THIS DISPLAY');
            console.log(this.display);
            break;
          case 'result':
            this.calculateResult(this.firstOperand, this.secondOperand, this.operator);
            this.setOperand(this.result, 'firstOperand', true);
            this.display = this.result;
            this.lastEqualsButton = true;
            this.lastOperatorButton = false;
            console.log('THIS DISPLAY');
            console.log(this.display);
            break;
          case 'clear':
            this.clearAll();
            this.screen.setValue(0);
            console.log('THIS DISPLAY');
            console.log(this.display);
            break;
          case 'delete':
            this.lastDelete = true;
            if (this.result == 'Infinity') {
              this.clearAll();
            } else {
              console.log(this.result);
              this.result = Number(this.result.toString().slice(0, -1));
              this.setOperand(this.result, 'firstOperand', true);
              this.result = this.firstOperand;
              this.display = this.result;
              this.screen.setValue(this.roundUpTo8(this.display));
              this.operator = null;
              this.result = this.firstOperand;
              console.log('THIS DISPLAY');
              console.log(this.display);
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
    this.display = '';
    this.operator = null;
    this.setOperand('', 'firstOperand', true);
    this.setOperand('', 'secondOperand', true);
    this.lastEqualsButton = false;
    this.lastOperatorButton = false;
  }
  setOperand = (newValue, operand, replace = false) => {
    if (replace) {
      this[operand] = newValue;
    } else {
      this[operand] += newValue;
    }
    this.display = this[operand];

    this.screen.setValue(this.roundUpTo8(this.display));
  };

  calculateResult = (firstOperand, secondOperand, operator) => {
    if (!this.operator) {
      return null;
    }
    const handler = this.config[operator].handler;

    if (handler && (this.firstOperand || this.secondOperand) && this.operator) {
      this.result = handler(firstOperand, secondOperand);
      this.display = this.result;
      this.screen.setValue(this.roundUpTo8(this.display));
      this.setOperand('', 'secondOperand', true);
    }
  };

  roundUpTo8 = (number, decimals = 8) => {
    let num = Number(number);
    return parseFloat(num.toFixed(decimals));
  };
}

new Calculator(CALCULATOR_CONFIG);
