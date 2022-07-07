const CreateNumButtonsMap = () => {
  let obj = {};
  for (let i = 0; i < 10; i++) {
    obj = { ...obj, [i]: { value: i, title: i.toString() } };
  }
  obj = { ...obj, ['.']: { value: 'point', title: '.' } };
  obj = { ...obj, ['00']: { value: 'double zero', title: '00' } };
  return obj;
};

const NumButtonsMap = CreateNumButtonsMap();

const CreateOperatorButtonsMap = () => {
  let obj = {
    plus: {
      value: 'plus',
      title: '+',
      handler: (firstNum, secondNum) => {
        return parseFloat(firstNum) + parseFloat(secondNum);
      },
    },
    minus: {
      value: 'minus',
      title: '-',
      handler: (firstNum, secondNum) => {
        return parseFloat(firstNum) - parseFloat(secondNum);
      },
    },
    equals: {
      value: 'equals',
      title: '=',
    },
  };
  return obj;
};
const OperatorButtonsMap = CreateOperatorButtonsMap();
console.log(OperatorButtonsMap);

class Button {
  constructor(text) {
    this.text = text;
    // return this.render();
  }
  render() {
    let button = document.createElement('button');
    button.append(this.text);
    return button;
  }
}

class NumButton {
  constructor(text, number) {
    this.number = number;
    this.text = text;
    return this.render();
  }
  render() {
    let button = document.createElement('button');
    button.append(this.text);
    button.classList.add('button');
    return button;
  }
}

class OperatorButton {
  constructor(text, value) {
    this.text = text;
    this.value = value;
    return this.render();
  }
  render() {
    const button = document.createElement('button');
    button.append(this.text);
    button.classList.add('button');
    return button;
  }
}
class FunctionalButton extends Button {
  constructor(text, func) {
    super(text);
    this.function = func;
    return this.render();
  }
  render() {
    const button = document.createElement('button');
    return button;
  }
}

class NumPad {
  constructor(x) {
    this.x = x;
    return this.render();
  }
  render() {
    let wrapper = document.createElement('div');
    let numWrapper = document.createElement('div');
    Object.entries(NumButtonsMap).forEach(([key, value]) => {
      numWrapper.appendChild(new NumButton(key, value));
    });
    numWrapper.classList.add('numpud');
    wrapper.appendChild(numWrapper);
    let operatorWrapper = document.createElement('div');
    Object.entries(OperatorButtonsMap).forEach(([key, value]) => {
      operatorWrapper.appendChild(new OperatorButton(value.title, key));
    });
    operatorWrapper.classList.add('operatorPud');
    wrapper.appendChild(operatorWrapper);

    return wrapper;
  }
}

class Screen {
  constructor() {
    this.value = 0;
    this.field;
    return this.render();
  }
  render() {
    this.field = document.createElement('input');
    this.field.setAttribute('readonly', true);
    this.field.setAttribute('type', 'text');
    this.field.setAttribute('value', this.value);
    this.field.classList.add('input');
    return this.field;
  }
  setFieldValue(newValue) {
    this.field.setAttribute('value', newValue);
  }
}

class Calculator {
  constructor() {
    this.firstOperand = '';
    this.secondOperand = '';
    this.operator = '';
    this.result = '';
    return this.render();
  }

  render() {
    const root = document.querySelector('#root');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    wrapper.append(new Screen('HEHEHEHHEHEH SASHA'));
    wrapper.appendChild(new NumPad());

    root.appendChild(wrapper);
  }
}

new Calculator();
