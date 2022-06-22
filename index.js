Array.prototype.myFilter = myFilter;

function myFilter(filterCallback, thisObject) {
  let filteredArray = [];
  for (let index = 0; index < this.length; index++) {
    if (filterCallback.apply(thisObject, [this[index], index, this])) {
      filteredArray.push(this[index]);
    } else continue;
  }
  return filteredArray;
}

Array.prototype.myFilter = myFilter;

function filterCallback(element, index, array) {
  return element >= this.x && index % 2 !== 0 && array.length >= 6;
}

let array = [2, 128, 88, 14, 130, 44, 240, 56];
let filtered = array.myFilter(filterCallback, { x: 100 });
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
setTimeout(debounceFunction, 1500);
setTimeout(debounceFunction, 1999);
