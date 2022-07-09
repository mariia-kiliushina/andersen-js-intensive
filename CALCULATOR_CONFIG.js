export const CALCULATOR_CONFIG = {
  10: { type: 'number', value: 0, title: '0', numbersPad: true },
  6: { type: 'number', value: 1, title: '1', numbersPad: true },
  7: { type: 'number', value: 2, title: '2', numbersPad: true },
  8: { type: 'number', value: 3, title: '3', numbersPad: true },
  3: { type: 'number', value: 4, title: '4', numbersPad: true },
  4: { type: 'number', value: 5, title: '5', numbersPad: true },
  5: { type: 'number', value: 6, title: '6', numbersPad: true },
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
  17: { type: 'calculate', value: 'calculate', title: '=' },
};
