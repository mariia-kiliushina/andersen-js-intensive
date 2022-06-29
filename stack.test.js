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
});
