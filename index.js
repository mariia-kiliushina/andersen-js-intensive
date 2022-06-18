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
    return negativeIndexesArray;
  }

  let slicedArray = [];
  for (let numberIndex in arrayOfNums) {
    if (numberIndex >= start - 1 && numberIndex <= end - 1) {
      slicedArray.push(arrayOfNums[numberIndex]);
    }
  }
  return slicedArray;
};

// console.log('result of invocation >> selectFromInterval:');
// console.log(selectFromInterval([3, 7, 9], 2, 4));

const myIterable = { from: 0, to: 7 };

myIterable[Symbol.iterator] = function () {
  if (this.from === undefined)
    throw Error(
      'Ошибка: у итерируемого объекта отсутствует начальное значение'
    );
  if (this.to === undefined)
    throw Error('Ошибка: у итерируемого объекта отсутствует конечное значение');
  if (typeof this.from !== 'number')
    throw Error(
      'Ошибка: значения интервалов должны являться числами. В качестве начала интервала получено нечисловое значение'
    );
  if (typeof this.to !== 'number')
    throw Error(
      'Ошибка: значения интервалов должны являться числами. В качестве конца интервала получено нечисловое значение'
    );
  if (this.to < this.from) {
    throw Error(
      'Ошибка: значение конца интервала не может быть меньше значения начала интервала'
    );
  }

  return {
    iteratorFrom: this.from,
    iteratorTo: this.to,
    next() {
      if (this.iteratorFrom <= this.iteratorTo) {
        const result = {
          done: false,
          value: this.iteratorFrom++,
        };
        return result;
      } else {
        return { done: true };
      }
    },
  };
};

// console.log('result of iteration of >> myIterable:');
// for (let item of myIterable) {
//   console.log(item);
// }

const makeObjectDeepCopy = (objectToCopyFrom) => {
  const makeArrayDeepCopy = (arr) => {
    const arrayDeepCopy = arr.reduce(function (copiedArr, value) {
      if (Array.isArray(value)) {
        copiedArr.push(makeArrayDeepCopy(value));
      } else if (typeof value === 'object') {
        copiedArr.push(makeObjectDeepCopy(value));
      } else {
        copiedArr.push(value);
      }
      return copiedArr;
    }, []);
    return arrayDeepCopy;
  };

  const objectDeepCopy = Object.entries(objectToCopyFrom).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = makeArrayDeepCopy(value);
      } else if (typeof value === 'object') {
        acc[key] = makeObjectDeepCopy(value);
      } else {
        acc[key] = value;
      }

      return acc;
    },
    {}
  );

  return objectDeepCopy;
};

//>>>Example of copying
// const mainObj = {
//   a: 'test',
//   b: {
//     c: 777,
//     k: { l: 34 },
//   },
//   d: ['foo', ['bar', 'baz'], { 1: 'one', 2: 'two' }],
// };

// const deepCopy = makeObjectDeepCopy(mainObj);
// console.log('result of invocation >> selectFromInterval:');
// console.log('>>>deepCopy');
// console.log(deepCopy);

//>>>Test cases
// deepCopy.b.c = 'changes c';
// deepCopy.b.k.l = 'changes l';
// deepCopy.d[0] = ['changes foo'];
// deepCopy.d[1][0] = 'changes bar';
// deepCopy.d[2]['1'] = 'changes key one';

// mainObj.b.c = 'again the same c';
// mainObj.b.k.l = 'again the same l';
// mainObj.d[0] = ['again the same foo'];
// mainObj.d[1][0] = 'again the same bar';
// mainObj.d[2]['1'] = 'again the same key one';

// console.log('>>>changed deepCopy');
// console.log(deepCopy);
// console.log('>>>changed mainObj');
// console.log(mainObj);
