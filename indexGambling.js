// const { isArgumentsObject } = require('util/types');

// const concatStrings = (firstWord) => {
//   let result = firstWord;

//   const concatenator = (aWord) => {
//     if (aWord === undefined) {
//       return concatenator;
//     }

//     result += aWord;

//     concatenator[Symbol.toPrimitive] = function (hint) {
//       if (hint === 'string') return result;
//     };

//     concatenator.toString = () => {
//       return result;
//     };

//     return concatenator;
//   };
//   return concatenator;
// };

// let gambledResult = String(concatStrings('first')('second')(123)('third'));
// console.log('gambledResult >>', gambledResult);

// let gambledResult2 = concatStrings('first')()('second')('third')().toString();
// console.log('gambledResult2 >>', gambledResult2);

const concatStrings = (firstWord) => {
  function _concatStrings(firstWord) {
    let result = firstWord;
    const concatenator = (aWord) => {
      if (aWord === undefined) {
        return concatenator;
      }
      result += aWord;
      concatenator[Symbol.toPrimitive] = function (hint) {
        if (hint === 'string') return result;
      };
      concatenator.toString = () => {
        return result;
      };
      return concatenator;
    };
    return concatenator;
  }
  return String(_concatStrings());
};

console.log(concatStrings('first')('second')(123)('third'));
let gambledResult = String(concatStrings('first')('second')(123)('third'));
console.log('gambledResult >>', gambledResult);

let gambledResult2 = concatStrings('first')()('second')('third')().toString();
console.log('gambledResult2 >>', gambledResult2);
