const { Stack } = require('./stack');

describe('Stack', () => {
  let newStack;
  beforeEach(() => {
    newStack = new Stack(3);
    newStack.push('a');
    newStack.push('b');
    newStack.push('c');
  });

  test('', () => {
    expect(newStack.stack).toEqual({ 1: 'a', 2: 'b', 3: 'c' });
  });
  test('', () => {
    expect(() => newStack.push('another one')).toThrow(
      'Stack is already full. No elements can be pushed'
    );
  });
  test('', () => {
    newStack.pop();
    newStack.pop();
    expect(newStack.stack).toEqual({ 1: 'a' });
  });
  test('', () => {
    let answer = newStack.pop();
    expect(answer).toEqual('c');
  });

  test('', () => {
    newStack.pop();
    newStack.push('peek');
    let peek = newStack.peek();
    expect(peek).toEqual('peek');
  });

  test('', () => {
    expect(newStack.isEmpty()).toEqual(false);
  });
  test('', () => {
    newStack.pop();
    newStack.pop();
    newStack.pop();
    expect(newStack.isEmpty()).toEqual(true);
  });
  test('', () => {
    expect(newStack.toArray()).toEqual(['a', 'b', 'c']);
  });

  test('', () => {
    expect(Stack.fromIterable(['a', 'f', 'h']).stack).toEqual({ 1: 'a', 2: 'f', 3: 'h' });
  });
  test('', () => {
    expect(Stack.fromIterable({ 1: 'a', 2: 'f', 3: 'h' }).stack).toEqual({
      1: 'a',
      2: 'f',
      3: 'h',
    });
    expect(Stack.fromIterable({ 1: 'a', 2: 'f', 3: 'h' }).stackSize).toEqual(3);
  });

  test('', () => {
    expect(Stack.fromIterable('abcd').stack).toEqual({ 1: 'a', 2: 'b', 3: 'c', 4: 'd' });
    expect(Stack.fromIterable('abcd').stackSize).toEqual(4);
  });

  test('', () => {
    let map = new Map();
    map.set('1', 'foo');
    map.set('2', 5);
    expect(Stack.fromIterable(map).stack).toEqual({ 1: 'foo', 2: 5 });
    expect(Stack.fromIterable(map).stackSize).toEqual(2);
  });

  test('', () => {
    let mySet = new Set();
    mySet.add(90);
    mySet.add('apple');
    expect(Stack.fromIterable(mySet).stack).toEqual({ 1: 90, 2: 'apple' });
    expect(Stack.fromIterable(mySet).stackSize).toEqual(2);
  });
});
