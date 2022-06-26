const concatStrings = (...args) => {
  const [firstWord, firstSeparator] = args;
  let result = firstWord;
  let separator = '';
  if (typeof firstSeparator === 'string') {
    separator = firstSeparator;
  }

  return function _concatenator(...nextArgs) {
    const [aWord, aSeparator] = nextArgs;

    if (typeof aWord !== 'string') {
      return result;
    }

    if (typeof aSeparator !== 'string') {
      result += separator + aWord;
      return _concatenator;
    }

    if (typeof aSeparator === 'string') {
      result += separator + aWord;
      separator = aSeparator;
      return _concatenator;
    }

    result += separator + aWord;
    return _concatenator;
  };
};

class Calculator {
  static checkIsDefined(arg) {
    if (arg === undefined) {
      throw new Error('Expected an argument instead got undefined');
    }
  }
  static isInvalidNumber(arg) {
    return arg === Infinity || arg === -Infinity || isNaN(arg);
  }

  static checkIfNumberAndIfValidNumber(arg) {
    if (typeof arg !== 'number' || this.isInvalidNumber(arg)) {
      throw new Error(`Expected a valid number as an argument instead got ${arg}`);
    }
  }

  constructor(x, y) {
    Calculator.checkIsDefined(y);
    Calculator.checkIfNumberAndIfValidNumber(x);
    Calculator.checkIfNumberAndIfValidNumber(y);

    this.x = x;
    this.y = y;
  }

  setX(newX) {
    Calculator.checkIsDefined(newX);
    Calculator.checkIfNumberAndIfValidNumber(newX);
    this.x = newX;
    return this;
  }
  setY(newY) {
    Calculator.checkIsDefined(newY);
    Calculator.checkIfNumberAndIfValidNumber(newY);
    this.y = newY;
    return this;
  }
  logSum = () => {
    console.log(this.x + this.y);
    return this;
  };
  logMul = () => {
    console.log(this.x * this.y);
    return this;
  };

  logDiv = () => {
    if (this.y === 0) {
      throw new Error('You cannot divide by zero. Please change the value of the "y" argument');
    }
    console.log(this.x / this.y);
    return this;
  };
  logSub = () => {
    console.log(this.x - this.y);
    return this;
  };
}

module.exports = { concatStrings, Calculator };
