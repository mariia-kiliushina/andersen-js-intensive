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

let myStack = new Stack(3);
myStack.push('a');
myStack.push('b');
myStack.push('c');
console.log(myStack);
console.log(myStack.pop());
console.log(myStack.pop());
myStack.push('hehe');
console.log(myStack.peek());
module.exports = { Stack };
