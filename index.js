class Button {
  constructor(text) {
    this.text = text;
    return this.render();
  }
  render() {
    let button = document.createElement('button');
    button.append(this.text);
    return button;
  }
}

class NumButton extends Button {
  constructor(text, number) {
    super(text);
    this.number = number;
    return this.render();
  }
  render() {
    const button = document.createElement('button');
    return button;
  }
}

class OperatorButton extends Button {
  constructor(text, value) {
    super(text);
    this.value = value;
    return this.render();
  }
  render() {
    const button = document.createElement('button');
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

class NumPad {}

class Screen {}

class Calculator {
  constructor() {}

  render() {
    const root = document.querySelector('#root');
    const wrapper = document.createElement('div');
    wrapper.appendChild(new Screen());
    wrapper.appendChild(new NumPad());
    root.appendChild(wrapper);
  }
}

new Calculator();
