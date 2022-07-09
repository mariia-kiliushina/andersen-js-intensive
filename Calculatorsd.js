import { Button } from './Button.js';
import { Screen } from './Screen.js';

export class Calculator {
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
    this._displayedValue = '';
    this.init();
  }
  getDisplayedValue() {
    return this._displayedValue;
  }

  setDisplayedValue(newValue) {
    let calculationResult;

    if (newValue === '') {
      calculationResult = newValue;
    } else {
      calculationResult = this.roundValue(newValue);
    }
    this._displayedValue = calculationResult;
    this.screen.setValue(calculationResult);
  }

  clearAll() {
    this.result = '';
    this.operator = null;
    this.setOperand('', 'firstOperand', true);
    this.setOperand('', 'secondOperand', true);
    this.lastEqualsButton = false;
    this.lastOperatorButton = false;
    this.screen.setValue(0);
    this.displayedValue = '';
  }
  setOperand = (newValue, operand, replace = false) => {
    console.log('this.lastOperatorButton');
    console.log(this.lastOperatorButton);
    console.log('this.lastEqualsButton');
    console.log(this.lastEqualsButton);
    if (this.lastOperatorButton || this.lastEqualsButton || replace) {
      debugger;
      this.setDisplayedValue(newValue);
    } else {
      this.setDisplayedValue(this._displayedValue + newValue);
    }
    this[operand] = this._displayedValue;
    debugger;
  };

  calculateResult = (firstOperand, secondOperand, operator) => {
    if (!this.operator) {
      return null;
    }
    let map = {
      divide: () => {
        return parseFloat(this.firstOperand) / parseFloat(this.secondOperand);
      },
      multiply: () => {
        return parseFloat(this.firstOperand) * parseFloat(this.secondOperand);
      },
      plus: () => {
        return parseFloat(this.firstOperand) + parseFloat(this.secondOperand);
      },
      minus: () => {
        return parseFloat(this.firstOperand) - parseFloat(this.secondOperand);
      },
    };
    let handler = map[this.operator];

    if (handler && (this.firstOperand || this.secondOperand) && this.operator) {
      this.result = handler(firstOperand, secondOperand);
      this.screen.setValue(this.roundValue(this.result));
    }
  };

  roundValue = (number, decimals = 8) => {
    let num = Number(number);
    return parseFloat(num.toFixed(decimals));
  };

  init = () => {
    this.root.classList.add('wrapper');
    this.root.appendChild(this.screen.render());

    this.numPad = document.createElement('div');

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

    this.root.appendChild(this.numPad);
    this.numPad.classList.add('numPad');

    this.numPad.addEventListener('click', (event) => {
      if (!event.target.hasAttribute('data-value')) return;
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
          if (!this.operator && this.firstOperand === '') {
            this.setOperand('0.', 'firstOperand', true);
          } else if (!this.operator && this.firstOperand) {
            debugger;
            this.setOperand('.', 'firstOperand');
          } else if (!this.operator && this.secondOperand) {
            this.setOperand('0.', 'secondOperand', true);
          } else {
            this.setOperand('.', 'secondOperand');
          }

          this.lastEqualsButton = false;
          this.lastOperatorButton = false;
          break;
        case 'number':
          if (!this.operator) {
            this.setOperand(value, 'firstOperand');
          } else {
            this.setOperand(value, 'secondOperand');
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
            this.screen.setValue(this.roundValue(this.result));
          }
          break;

        default:
          return;
      }
    });
  };
}
