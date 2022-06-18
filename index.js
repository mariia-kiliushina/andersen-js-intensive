const selectFromInterval = (arrayOfNums, start, end) => {
  if (!Array.isArray(arrayOfNums))
    throw new Error('Ошибка: первый аргумент должен быть массивом');
  if (!arrayOfNums.every((number) => typeof number === 'number'))
    throw new Error(
      'Ошибка: массив не должен содержать значения отличные от чисел'
    );
  if (!Number.isInteger(start) || !Number.isInteger(end))
    throw new Error('Ошибка: параметры интервала должны быть целыми числами');
  if (end < start) [start, end] = [end, start];
  // из примера не совсем понятно, но потенциально массиву могут быть присвоены значения по
  // отрицательным индексам. Ниже обработка такого случая
  if (start < 0 || end < 0) {
    let negativeIndexesArray = [];
    let steps = [];
    let i = 0;
    do {
      steps.push(start + i);
      i += 1;
    } while (steps[steps.length - 1] < end);
    steps.forEach((step) =>
      arrayOfNums[step] ? negativeIndexesArray.push(arrayOfNums[step]) : null
    );
    console.log(negativeIndexesArray);
    return;
  }

  let slicedArray = [];
  for (let numberIndex in arrayOfNums) {
    if (numberIndex >= start - 1 && numberIndex <= end - 1) {
      slicedArray.push(arrayOfNums[numberIndex]);
    }
  }
  console.log(slicedArray);
};

// const makeObjectDeepCopy = (objectToCopyFrom) => {
//   let objectToArray = Object.entries(objectToCopyFrom);

//   const objectDeepCopy = objectToArray.reduce((acc, [key, value]) => {
//     const makeArrayDeepCopy = (value) => {
//       value.reduce((acc, item) => {
//         if (Array.isArray(item)) {
//           acc.push(makeArrayDeepCopy(item));
//         } else if (typeof item === 'object') {
//           acc.push(makeObjectDeepCopy(value));
//         } else {
//           acc.push(item);
//         }
//         return acc;
//       }, []);
//       return value;
//     };

//     if (Array.isArray(value)) {
//       console.log('array value');
//       console.log(value);
//       acc[key] = makeArrayDeepCopy(value);
//       console.log('ACCUMULATOR after array');
//       console.log(acc);
//       console.log('ACCUMULATOR key after array');
//       console.log(acc[key]);
//     } else if (typeof value === 'object') {
//       acc[key] = makeObjectDeepCopy(value);
//     } else {
//       acc[key] = value;
//     }

//     return acc;
//   }, {});

//   return objectDeepCopy;
// };

// const mainObj = {
//   a: 'test',
//   b: {
//     c: 777,
//     k: { l: 34 },
//   },
//   d: ['foo', ['bar', 'baz'], { 1: 'one', 2: 'two' }],
// };

// const deepCopy = makeObjectDeepCopy(mainObj);
// console.log('deepCopy');
// console.log(deepCopy);

// deepCopy.b.c = 'CHANGES C';
// deepCopy.b.k.l = 'CHANGES L';
// deepCopy.d[0] = ['changes D'];
// deepCopy.d[1][0] = 'changes bar';

// mainObj.b.c = 'again the same C';
// mainObj.b.k.l = 'again the same L';
// mainObj.d[0] = ['again the same D'];
// mainObj.d[1][0] = 'again the same bar';

// console.log(deepCopy);
// console.log(mainObj);
