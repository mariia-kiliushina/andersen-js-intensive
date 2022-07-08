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
  };

  roundValue = (value) => {
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

    if (newValue === '' || newValue.endsWith('.')) {
      calculationResult = newValue;
    } else {
      calculationResult = this.roundValue(newValue);
    }

    this._displayedValue = calculationResult;
    this.screen.setValue(calculationResult);
  }

  calculateResult() {
    if (this.operator === null) return;
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
    let handler = map[this.operator];
    console.log(handler);

    const calculationResult = handler(this.firstOperand, this.secondOperand).toString();
    this.displayedValue = calculationResult;
    this.firstOperand = calculationResult;
    this.secondOperand = '';
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

      const buttonType = event.target.getAttribute('data-type');
      const buttonValue = event.target.getAttribute('data-value');

      switch (buttonType) {
        case 'number':
          if (this.shouldSetStateToDefaultOnCharacterInput) this.setStateToDeafult();
          this[this.operandBeingEditedName] += buttonValue;
          this.displayedValue = this[this.operandBeingEditedName];
          break;
        case 'period':
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
            !this.firstOperand.includes('.')
          ) {
            this.secondOperand += buttonValue;
            this.displayedValue = this.secondOperand;
            break;
          }
          break;
        case 'inverse':
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
          this.shouldSetStateToDefaultOnCharacterInput = false;
          if (this.firstOperand === '') break;
          this.operator = buttonValue;
          this.operandBeingEditedName = 'secondOperand';
          this.calculateResult();
          break;
        case 'calculate':
          this.calculateResult();
          this.shouldSetStateToDefaultOnCharacterInput = true;
          this.operandBeingEditedName = 'firstOperand';
          break;
        case 'clear':
          this.setStateToDeafult();
          break;
        case 'delete':
          if (this.operandBeingEditedName === 'firstOperand') {
            const newValue = this.firstOperand.slice(0, -1);
            this.firstOperand = newValue;
            this.displayedValue = newValue;
            break;
          }
          if (this.operandBeingEditedName === 'secondOperand') {
            const newValue = this.secondOperand.slice(0, -1);
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
