const { concatStrings } = require('./index');

describe('String concatenation', () => {
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
      'first123secondthird'
    );
  });

  test('', () => {
    expect(concatStrings('first', '123')('second', null)('third', '*')('fourth')()).toEqual(
      'first123secondthird*fourth'
    );
  });
  test('', () => {
    expect(concatStrings('first', '123')('second', 78)('third', '*')('fourth')()).toEqual(
      'first123secondthird*fourth'
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
