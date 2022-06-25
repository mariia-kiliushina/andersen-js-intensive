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

module.exports = { concatStrings };
