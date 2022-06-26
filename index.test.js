const { concatStrings, Calculator } = require('./index');

describe('concatStrings', () => {
  test('', () => {
    expect(concatStrings('first')()).toEqual('first');
  });

  test('', () => {
    expect(concatStrings('first')('second')([])).toEqual('firstsecond');
  });

  test('', () => {
    expect(concatStrings('first')('second')('third')(34)).toEqual('firstsecondthird');
  });

  test('', () => {
    expect(concatStrings('first', null)('second')()).toEqual('firstsecond');
  });

  test('', () => {
    expect(concatStrings('first', '123')('second')('third')()).toEqual('first123second123third');
  });
  test('', () => {
    expect(concatStrings('first', 5)('second')('third')()).toEqual('firstsecondthird');
  });

  test('', () => {
    expect(concatStrings('first', '123')('second', '+')('third')()).toEqual('first123second+third');
  });

  test('', () => {
    expect(concatStrings('first', '123')('second', null)('third', '*')()).toEqual(
      'first123second123third'
    );
  });

  test('', () => {
    expect(concatStrings('first', '123')('second', null)('third', '*')('fourth')()).toEqual(
      'first123second123third*fourth'
    );
  });
  test('', () => {
    expect(concatStrings('first', '123')('second', 78)('third', '*')('fourth')()).toEqual(
      'first123second123third*fourth'
    );
  });

  test('', () => {
    expect(concatStrings('some-value')('')('')('again')(null)).toEqual('some-valueagain');
  });

  test('', () => {
    expect(concatStrings('some-value')('')('')({})).toEqual('some-value');
  });

  test('', () => {
    expect(concatStrings('some-value')(2)).toEqual('some-value');
  });

  test('', () => {
    expect(concatStrings('some-value')()).toEqual('some-value');
  });

  test('', () => {
    expect(concatStrings('some-value')('333')(123n)).toEqual('some-value333');
  });

  test('', () => {
    expect(concatStrings('second')('third')('last')()).toEqual('secondthirdlast');
  });

  test('', () => {
    expect(concatStrings('first')('')('third')(1)).toEqual('firstthird');
  });

  test('', () => {
    expect(concatStrings('first')('')('third')([])).toEqual('firstthird');
  });
});

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator(10, 2);
    jest.spyOn(console, 'log');
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test('logDiv', () => {
    calculator.logDiv();
    expect(console.log).toHaveBeenCalledWith(5);
  });

  test('logMul', () => {
    calculator.logMul();
    expect(console.log).toHaveBeenCalledWith(20);
  });

  test('logSum', () => {
    calculator.logSum();
    expect(console.log).toHaveBeenCalledWith(12);
  });

  test('logSub', () => {
    calculator.logSub();
    expect(console.log).toHaveBeenCalledWith(8);
  });

  test('setX', () => {
    calculator.setX(6);
    expect(calculator.x).toEqual(6);
  });

  test('setX().setX()', () => {
    calculator.setX(6).setX(7);
    expect(calculator.x).toEqual(7);
  });

  test('setY()', () => {
    calculator.setY(61);
    expect(calculator.y).toEqual(61);
  });

  test('setY().setY()', () => {
    calculator.setY(61).setY(8);
    expect(calculator.y).toEqual(8);
  });

  test('setX().setY()', () => {
    calculator.setX(61).setY(8);
    expect(calculator.x).toEqual(61);
    expect(calculator.y).toEqual(8);
  });

  test('setX, logMul', () => {
    calculator.setX(6).logMul();
    expect(calculator.x).toEqual(6);
    expect(console.log).toHaveBeenCalledWith(12);
  });

  test('', () => {
    calculator.setX(6).logSum();
    expect(console.log).toHaveBeenCalledWith(8);
  });

  test('', () => {
    calculator.setX(6).logSub();
    expect(console.log).toHaveBeenCalledWith(4);
  });

  test('', () => {
    calculator.setX(24).setY(3).logDiv();
    expect(calculator.x).toEqual(24);
    expect(console.log).toHaveBeenCalledWith(8);
  });

  test('', () => {
    calculator.setX(24).setY(3).logMul();
    expect(console.log).toHaveBeenCalledWith(72);
  });

  test('', () => {
    calculator.setX(24).setY(3).logSum();
    expect(console.log).toHaveBeenCalledWith(27);
  });

  test('', () => {
    calculator.setX(24).setY(3).logSub();
    expect(console.log).toHaveBeenCalledWith(21);
  });

  test('', () => {
    calculator.setX(24).setY(3).logMul().logDiv();
    expect(console.log.mock.calls[0][0]).toEqual(72);
    expect(console.log.mock.calls[1][0]).toEqual(8);
  });
  test('', () => {
    calculator.setX(24).setY(3).logSum().logSub();
    expect(console.log.mock.calls[0][0]).toEqual(27);
    expect(console.log.mock.calls[1][0]).toEqual(21);
  });
  test('', () => {
    calculator.setX(24).setY(3).logSum().setY(1).setX(7).logSub();
    expect(console.log.mock.calls[0][0]).toEqual(27);
    expect(console.log.mock.calls[1][0]).toEqual(6);
  });
  test('', () => {
    calculator.setX(24).logSum().setY(1).logSub();
    expect(console.log.mock.calls[0][0]).toEqual(26);
    expect(console.log.mock.calls[1][0]).toEqual(23);
  });
  test('', () => {
    calculator.logSum().setY(1).setX(24).logSub().setX(65);
    expect(console.log.mock.calls[0][0]).toEqual(12);
    expect(console.log.mock.calls[1][0]).toEqual(23);
    expect(calculator.x).toEqual(65);
  });
});

describe('CalculatorErrors', () => {
  let calculator;
  beforeEach(() => {
    calculator = new Calculator(10, 2);
    jest.spyOn(console, 'log');
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test('', () => {
    expect(() => new Calculator(10)).toThrow('Expected an argument instead got undefined');
  });

  test('', () => {
    expect(() => new Calculator('123', 90)).toThrow(
      'Expected a valid number as an argument instead got 123'
    );
  });

  test('', () => {
    expect(() => new Calculator(Infinity, 90)).toThrow(
      'Expected a valid number as an argument instead got Infinity'
    );
  });
  test('', () => {
    expect(() => new Calculator(-Infinity, 90)).toThrow(
      'Expected a valid number as an argument instead got -Infinity'
    );
  });
  test('', () => {
    expect(() => new Calculator(NaN, 90)).toThrow(
      'Expected a valid number as an argument instead got NaN'
    );
  });
  test('', () => {
    expect(() => new Calculator(90, Infinity)).toThrow(
      'Expected a valid number as an argument instead got Infinity'
    );
  });
  test('', () => {
    expect(() => new Calculator(90, -Infinity)).toThrow(
      'Expected a valid number as an argument instead got -Infinity'
    );
  });
  test('', () => {
    expect(() => new Calculator(90, NaN)).toThrow(
      'Expected a valid number as an argument instead got NaN'
    );
  });

  test('', () => {
    expect(() => new Calculator('76', 89)).toThrow(
      'Expected a valid number as an argument instead got 76'
    );
  });
  test('', () => {
    expect(() => new Calculator([], 89)).toThrow(
      'Expected a valid number as an argument instead got '
    );
  });
  test('', () => {
    expect(() => new Calculator({}, 89)).toThrow(
      'Expected a valid number as an argument instead got [object Object]'
    );
  });
  test('', () => {
    expect(() => new Calculator(true, 89)).toThrow(
      'Expected a valid number as an argument instead got true'
    );
  });
  test('', () => {
    expect(() => new Calculator(98909n, 89)).toThrow(
      'Expected a valid number as an argument instead got 98909'
    );
  });

  test('', () => {
    expect(() => new Calculator(56, '89')).toThrow(
      'Expected a valid number as an argument instead got 89'
    );
  });
  test('', () => {
    expect(() => new Calculator(56, [1, 2, 3, 4])).toThrow(
      'Expected a valid number as an argument instead got 1,2,3,4'
    );
  });
  test('', () => {
    expect(() => new Calculator(56, { x: '876876' })).toThrow(
      'Expected a valid number as an argument instead got [object Object]'
    );
  });
  test('', () => {
    expect(() => new Calculator(56, false)).toThrow(
      'Expected a valid number as an argument instead got false'
    );
  });
  test('', () => {
    expect(() => new Calculator(56, 9891232409n)).toThrow(
      'Expected a valid number as an argument instead got 9891232409'
    );
  });

  test('', () => {
    let calculator = new Calculator(10, 2);
    expect(() => calculator.setX()).toThrow('Expected an argument instead got undefined');
  });
  test('', () => {
    expect(() => calculator.setX('cat')).toThrow(
      'Expected a valid number as an argument instead got cat'
    );
  });
  test('', () => {
    expect(() => calculator.setX(true)).toThrow(
      'Expected a valid number as an argument instead got true'
    );
  });
  test('', () => {
    expect(() => calculator.setX([])).toThrow(
      'Expected a valid number as an argument instead got '
    );
  });

  test('', () => {
    expect(() => calculator.setX({})).toThrow(
      'Expected a valid number as an argument instead got [object Object]'
    );
  });

  test('', () => {
    expect(() => calculator.setX(93847923847n)).toThrow(
      'Expected a valid number as an argument instead got 93847923847'
    );
  });

  test('', () => {
    expect(() => calculator.setY()).toThrow('Expected an argument instead got undefined');
  });
  test('', () => {
    expect(() => calculator.setY('cat')).toThrow(
      'Expected a valid number as an argument instead got cat'
    );
  });
  test('', () => {
    expect(() => calculator.setY(true)).toThrow(
      'Expected a valid number as an argument instead got true'
    );
  });
  test('', () => {
    expect(() => calculator.setY([])).toThrow(
      'Expected a valid number as an argument instead got '
    );
  });

  test('', () => {
    expect(() => calculator.setY({})).toThrow(
      'Expected a valid number as an argument instead got [object Object]'
    );
  });

  test('', () => {
    expect(() => calculator.setY(93847923847n)).toThrow(
      'Expected a valid number as an argument instead got 93847923847'
    );
  });

  test('', () => {
    let calculator = new Calculator(10, 0);
    expect(() => calculator.logDiv()).toThrow(
      'You cannot divide by zero. Please change the value of the "y" argument'
    );
  });
});

describe('CalculatorReturnMethod', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator(16, 8);
    jest.spyOn(console, 'log');
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test('logMul', () => {
    const logCalculatorMul = calculator.logMul;
    logCalculatorMul();
    expect(console.log).toHaveBeenCalledWith(128);
  });
  test('logDiv', () => {
    const logCalculatorDiv = calculator.logDiv;
    logCalculatorDiv();
    expect(console.log).toHaveBeenCalledWith(2);
  });
  test('logSum', () => {
    const logCalculatorSum = calculator.logSum;
    logCalculatorSum();
    expect(console.log).toHaveBeenCalledWith(24);
  });
  test('logSub', () => {
    const logCalculatorSub = calculator.logSub;
    logCalculatorSub();
    expect(console.log).toHaveBeenCalledWith(8);
  });
});
