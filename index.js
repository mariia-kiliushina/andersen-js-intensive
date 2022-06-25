const concatStrings = (...args) => {
  const [firstWord, firstSeparator] = args;
  let result = firstWord;
  let separator = '';
  if (typeof firstSeparator === 'string') {
    separator = firstSeparator;
  }

  return function concatenator(...nextArgs) {
    const [aWord, aSeparator] = nextArgs;

    if (typeof aWord !== 'string') {
      return result;
    }

    if (aSeparator !== undefined && typeof aSeparator !== 'string') {
      result += separator + aWord;
      separator = '';
      return concatenator;
    }

    if (typeof aSeparator === 'string') {
      result += separator + aWord;
      separator = aSeparator;
      return concatenator;
    }

    if (!aSeparator) {
      result += separator + aWord;
      return concatenator;
    }
  };
};

module.exports = { concatStrings };
