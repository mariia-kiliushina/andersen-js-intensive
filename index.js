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
console.log(filtered);

const createDebounceFunction = (callback, delay) => {
  let timeout;

  return function () {
    const set = () => {
      timeout = setTimeout(callback, delay);
    };
    const stop = () => {
      clearTimeout(timeout);
    };
    stop();
    set();
  };
};

const logger = () => {
  console.log(`logger has been invoked`);
};
const debounceFunction = createDebounceFunction(logger, 1000);
debounceFunction();
setTimeout(debounceFunction, 100);
setTimeout(debounceFunction, 999);
