const myFilter = function (filterCallback, thisObject) {
  let filteredArray = [];
  for (let index = 0; index < this.length; index++) {
    if (filterCallback.apply(thisObject, [this[index], index, this])) {
      filteredArray.push(this[index]);
    } else continue;
  }
  return filteredArray;
};

Array.prototype.myFilter = myFilter;

let array = [2, 0, 2, 128, 88, 14, 130, 44, 240, 56];

// function filterCallback(element, index, array) {
//   return element >= this.x && index % 2 === 0 && array.length >= 8;
// }
function filterCallback(element, index, array) {
  return element >= 200 && index % 2 === 0 && array.length >= 8;
}

// let filtered = array.myFilter(filterCallback, {
//   x: 100,
// });
let filtered = array.myFilter(filterCallback);
// console.log(filtered);

///////

const createDebounceFunction = (callback, delay) => {
  console.time('debounce');
  let timeout;

  return function () {
    console.time('debAgain');
    const set = () => {
      console.log('set timeout');
      console.timeLog('debAgain');
      timeout = setTimeout(callback, delay);
    };
    const stop = () => {
      console.log('stop timeout');
      console.timeLog('debAgain');
      clearTimeout(timeout);
    };
    stop();
    set();
    console.timeEnd('debAgain');
  };
};

const logger = () => {
  console.log('logger invoked');
  console.timeEnd('debounce');
};
const debounceFunction = createDebounceFunction(logger, 2000);
debounceFunction();
setTimeout(debounceFunction, 1000);
setTimeout(debounceFunction, 1500);
