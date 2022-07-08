export class Screen {
  constructor() {
    this.value = 0;
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
