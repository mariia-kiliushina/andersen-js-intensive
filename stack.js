class Stack {
  constructor(maxNumOfElements = 10) {
    if (
      typeof maxNumOfElements !== 'number' ||
      maxNumOfElements === Infinity ||
      maxNumOfElements === -Infinity ||
      maxNumOfElements === 0
    ) {
      throw new Error('Invalid argument was provided');
    }
    this.maxNumOfElements = maxNumOfElements;
    this.stackSize = 0;
    this.stack = {};
  }
  static fromIterable(iterable) {
    if (typeof iterable !== 'object' && typeof iterable !== 'string') {
      throw new Error(`Cannot iterate trough ${typeof iterable}`);
    }
    let stackFromIterable = new this();
    if (iterable instanceof Map || iterable instanceof Set) {
      let iterator = iterable.values();
      while (true) {
        let nextElement = iterator.next();
        if (nextElement.done) break;
        stackFromIterable.push(nextElement.value);
      }
    } else {
      for (let i in iterable) {
        stackFromIterable.push(iterable[i]);
      }
    }

    stackFromIterable.maxNumOfElements = stackFromIterable.stackSize;
    return stackFromIterable;
  }

  push(elem) {
    if (this.stackSize >= this.maxNumOfElements) {
      throw new Error('Stack is already full. No elements can be pushed');
    }
    this.stackSize += 1;
    this.stack[this.stackSize] = elem;
  }
  pop() {
    let answer = this.stack[this.stackSize];
    delete this.stack[this.stackSize];
    this.stackSize -= 1;
    return answer;
  }
  peek() {
    if (this.stackSize === 0) {
      return null;
    }
    return this.stack[this.stackSize];
  }
  isEmpty() {
    if (this.stackSize === 0) {
      return true;
    } else {
      return false;
    }
  }
  toArray() {
    return Object.values(this.stack);
  }
}

module.exports = { Stack };
