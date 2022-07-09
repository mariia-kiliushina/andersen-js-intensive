import { Button } from './Button.js';
import { Screen } from './Screen.js';

export class Calculator {
  constructor(config) {
    this.root = document.querySelector('#root');
    this.config = config;
    this.screen = new Screen();
    this.init();
    this.setStateToDeafult();
  }
  setStateToDeafult = () => {
    this.operator = null;
    this.displayedValue = '';
    this.firstOperand = '';
    this.secondOperand = '';
    this.operandBeingEditedName = 'firstOperand';
    this.shouldSetStateToDefaultOnCharacterInput = false;
    this.lastEqualsButton = false;
    this.lastDelete = false;
  };

  roundValue = (value) => {
    if (value === '') return 0;
    const parsedValue = parseFloat(value);
    const fixedValue = parsedValue.toFixed(8);
    const parsedFixedValue = parseFloat(fixedValue);
    return parsedFixedValue.toString();
  };

  get displayedValue() {
    this._displayedValue;
  }

  set displayedValue(newValue) {
    let calculationResult;
    if (newValue.endsWith('0')) {
      calculationResult = this.roundValue(newValue);
      this._displayedValue = calculationResult;
      console.log('this._displayedValue');
      console.log(this._displayedValue);
      this.screen.setValue(calculationResult);
      return;
    }
    if (newValue === '') {
      calculationResult = newValue;
    } else {
      calculationResult = newValue;
    }

    this._displayedValue = calculationResult;
    console.log('this._displayedValue');
    console.log(this._displayedValue);
    if (newValue.endsWith('.') && !this.lastDelete) {
      this.screen.setValue(this._displayedValue);
      return;
    }
    this.screen.setValue(this.roundValue(calculationResult));
  }

  calculateResult(previousOperator) {
    if (previousOperator === null) return;
    if (this.firstOperand === '') return;
    if (this.secondOperand === '') return;

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

    let handler = map[previousOperator];
    const calculationResult = handler(this.firstOperand, this.secondOperand).toString();
    console.log('calculationResult');
    console.log(calculationResult);
    this.displayedValue = calculationResult;
    this.firstOperand = calculationResult;
    if (this.lastEqualsButton === false) {
      this.secondOperand = '';
    }
  }

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
        } else if (child.getAttribute('data-type') === 'calculate') {
          return 'calculateButton';
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
      console.log('this.firstOperand');
      console.log(this.firstOperand);
      console.log('this.secondOperand');
      console.log(this.secondOperand);
      console.log('this.operator');
      console.log(this.operator);

      if (!event.target.hasAttribute('data-value')) return;

      const buttonType = event.target.getAttribute('data-type');
      const buttonValue = event.target.getAttribute('data-value');
      switch (buttonType) {
        case 'number':
          this.lastEqualsButton = false;
          this.lastDelete = false;
          if (this.shouldSetStateToDefaultOnCharacterInput) this.setStateToDeafult();
          this[this.operandBeingEditedName] += buttonValue;
          this.displayedValue = this[this.operandBeingEditedName];
          break;
        case 'period':
          console.log('this.operandBeingEditedName');
          console.log(this.operandBeingEditedName);
          this.lastEqualsButton = false;
          this.lastDelete = false;
          if (this.shouldSetStateToDefaultOnCharacterInput) {
            this.setStateToDeafult();
          }
          if (this.operandBeingEditedName === 'firstOperand' && this.firstOperand === '') {
            this.firstOperand = '0.';
            this.displayedValue = this.firstOperand;
            break;
          }
          if (
            this.operandBeingEditedName === 'firstOperand' &&
            this.firstOperand !== '' &&
            !this.firstOperand.includes('.')
          ) {
            this.firstOperand += buttonValue;
            this.displayedValue = this.firstOperand;
            break;
          }
          if (this.operandBeingEditedName === 'secondOperand' && this.secondOperand === '') {
            this.secondOperand = '0.';
            this.displayedValue = this.secondOperand;
            break;
          }
          if (
            this.operandBeingEditedName === 'secondOperand' &&
            this.secondOperand !== '' &&
            !this.secondOperand.includes('.')
          ) {
            this.secondOperand += buttonValue;
            this.displayedValue = this.secondOperand;
            break;
          }
          break;
        case 'inverse':
          this.lastEqualsButton = false;
          this.lastDelete = false;
          if (this.operandBeingEditedName === 'firstOperand') {
            this.firstOperand = this.roundValue(String(this.firstOperand * -1));
            this.displayedValue = this.firstOperand;
            break;
          }
          if (this.operandBeingEditedName === 'secondOperand') {
            this.secondOperand = this.roundValue(String(this.secondOperand * -1));
            this.displayedValue = this.secondOperand;
            break;
          }
          break;
        case 'operator':
          let previousOperator = this.operator;
          let currentOperator = buttonValue;
          this.lastEqualsButton = false;
          this.lastDelete = false;
          this.shouldSetStateToDefaultOnCharacterInput = false;
          if (this.firstOperand === '') break;
          this.operandBeingEditedName = 'secondOperand';
          this.calculateResult(previousOperator);
          this.operator = currentOperator;
          break;
        case 'calculate':
          this.lastDelete = false;
          let prevOperator = this.operator;
          this.calculateResult(prevOperator);
          this.shouldSetStateToDefaultOnCharacterInput = true;
          this.operandBeingEditedName = 'firstOperand';
          break;
        case 'clear':
          this.lastEqualsButton = false;
          this.lastDelete = false;
          this.setStateToDeafult();
          break;
        case 'delete':
          this.lastEqualsButton = false;
          this.lastDelete = true;
          if (this._displayedValue == 0) return;
          let newValue;
          if (this.operandBeingEditedName === 'firstOperand') {
            if (this.firstOperand.length > 10) {
              this.firstOperand = this.roundValue(this.firstOperand);
              this.displayedValue = this.firstOperand;
            }
            if (this.secondOperand.length > 10) {
              this.secondOperand = this.roundValue(this.secondOperand);
              this.displayedValue = this.secondOperand;
            }

            if (this.firstOperand.length === 2 && this.firstOperand.includes('-')) {
              newValue = '';
            } else {
              newValue = this.firstOperand.slice(0, -1);
            }
            this.displayedValue = newValue;
            this.firstOperand = this._displayedValue;
            console.log('this._displayedValue  in delete');
            console.log(this._displayedValue);
            break;
          }
          if (this.operandBeingEditedName === 'secondOperand') {
            if (this.secondOperand.length === 2 && this.secondOperand.includes('-')) {
              newValue = '';
            } else {
              newValue = this.secondOperand.slice(0, -1);
            }
            this.secondOperand = newValue;
            this.displayedValue = newValue;
            break;
          }
          break;
        default:
          break;
      }
    });
  };
}
