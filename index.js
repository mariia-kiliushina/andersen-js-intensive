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
    handler: function (firstValue, seconValue) {
      return parseFloat(firstValue) + parseFloat(seconValue);
    },
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
    button.innerText = this.title;
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

    this.init();
  }

  init = () => {
    console.log('this.firstOperand');
    console.log(this.firstOperand);
    console.log('this.secondOperand');
    console.log(this.secondOperand);
    console.log('this.operator');
    console.log(this.operator);

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
              this.setOperand(value, 'firstOperand');
            } else {
              this.setOperand(value, 'secondOperand');
            }
            break;
          case 'operator':
            if (this.firstOperand && this.secondOperand === '') {
            } else if (this.firstOperand && this.secondOperand && !this.lastEqualsButton) {
              this.calculateResult(this.firstOperand, this.secondOperand, this.operator);
              this.setOperand('', 'secondOperand');
              this.setOperand(this.result, 'firstOperand');
            } else if (this.firstOperand && this.secondOperand && this.lastEqualsButton) {
              this.setOperand(this.result, 'secondOperand');
              this.setOperand(this.result, 'firstOperand');
            }
            this.operator = value;
            this.lastEqualsButton = false;
            break;
          case 'result':
            this.calculateResult(this.firstOperand, this.secondOperand, this.operator);
            this.setOperand(this.result, 'firstOperand');
            this.lastEqualsButton = true;
            break;
          default:
            return;
        }
      }
    });
  };

  setOperand = (newValue, operand) => {
    this[operand] = newValue;
    this.screen.setValue(this[operand]);
  };

  calculateResult = (firstOperand, secondOperand, operator) => {
    const handler = this.config[operator].handler;

    if (handler && this.firstOperand && this.secondOperand && this.operator) {
      this.result = handler(firstOperand, secondOperand);
      this.screen.setValue(this.result);
    }
  };
}

new Calculator(CALCULATOR_CONFIG);
