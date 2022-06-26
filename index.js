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

const checkIsDefined = (arg) => {
  if (arg === undefined) {
    throw new Error('Expected an argument instead got undefined');
  }
};

const isInvalidNumber = (arg) => {
  return arg === Infinity || arg === -Infinity || isNaN(arg);
};

const checkIfNumberAndIfValidNumber = (arg) => {
  if (typeof arg !== 'number' || isInvalidNumber(arg)) {
    throw new Error(`Expected a valid number as an argument instead got ${arg}`);
  }
};

class Calculator {
  constructor(x, y) {
    this.checkIsDefined = (arg) => {
      if (arg === undefined) {
        throw new Error('Expected an argument instead got undefined');
      }
    };
    this.isInvalidNumber = (arg) => {
      return arg === Infinity || arg === -Infinity || isNaN(arg);
    };
    this.checkIfNumberAndIfValidNumber = (arg) => {
      if (typeof arg !== 'number' || this.isInvalidNumber(arg)) {
        throw new Error(`Expected a valid number as an argument instead got ${arg}`);
      }
    };
    this.checkIsDefined(y);
    this.checkIfNumberAndIfValidNumber(x);
    this.checkIfNumberAndIfValidNumber(y);

    this.x = x;
    this.y = y;
  }
  setX(newX) {
    checkIsDefined(newX);
    checkIfNumberAndIfValidNumber(newX);
    this.x = newX;
    return this;
  }
  setY(newY) {
    checkIsDefined(newY);
    checkIfNumberAndIfValidNumber(newY);
    this.y = newY;
    return this;
  }
  logSum() {
    console.log(this.x + this.y);
    return this;
  }
  logMul() {
    console.log(this.x * this.y);
    return this;
  }
  logSub() {
    console.log(this.x - this.y);
    return this;
  }
  logDiv = () => {
    if (this.y === 0) {
      throw new Error('You cannot divide by zero. Please change the value of the "y" argument');
    }
    console.log(this.x / this.y);
    return this;
  };
}

module.exports = { concatStrings, Calculator };
