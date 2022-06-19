const selectFromInterval = (arrayOfNums, start, end) => {
  if (!Array.isArray(arrayOfNums))
    throw new Error('Ошибка: первый аргумент должен быть массивом');
  if (!arrayOfNums.every((number) => typeof number === 'number'))
    throw new Error(
      'Ошибка: массив не должен содержать значения, отличные от чисел'
    );
  if (!Number.isInteger(start) || !Number.isInteger(end))
    throw new Error('Ошибка: параметры интервала должны быть целыми числами');
  if (end < start) [start, end] = [end, start];

  let filteredArray = [];
  for (let number of arrayOfNums) {
    if (number >= start && number <= end) {
      filteredArray.push(number);
    }
  }
  return filteredArray;
};

// console.log('result of invocation >> selectFromInterval:');
// console.log(selectFromInterval([-2, -7, -15, 0, 4], -13, -5)); // -7

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

// console.('result of invocation >> makeObjectDeepCopy:');
// console.log(makeObjectDeepCopy(mainObj));
