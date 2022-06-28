class Stack {
  constructor(numOfElements = 10) {
    if (
      typeof numOfElements !== 'number' ||
      numOfElements === Infinity ||
      numOfElements === -Infinity ||
      numOfElements === 0
    ) {
      throw new Error('Invalid argument was provided');
    }

    this.numOfElements = numOfElements;
  }
}

module.exports = { Stack };
