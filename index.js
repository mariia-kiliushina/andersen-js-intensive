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
  constructor(x, y) {
    if (y === undefined) {
      throw new Error('Expected 2 arguments instead got 1');
    }

    if (typeof x !== 'number') {
      throw new Error('Expected number as "x" instead got some other type');
    }
    if (typeof y !== 'number') {
      throw new Error('Expected number as "y" instead got some other type');
    }
    if (x === Infinity || x === -Infinity || isNaN(x)) {
      throw new Error('Expected valid number as "x" instead got "Infinity | -Infinity | NaN"');
    }
    if (y === Infinity || y === -Infinity || isNaN(y)) {
      throw new Error('Expected valid number as "y" instead got "Infinity | -Infinity | NaN"');
    }
    this.x = x;
    this.y = y;
  }
  setX(newX) {
    this.x = newX;
    return this;
  }
  setY(newY) {
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
