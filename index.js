const myFilter = function (filterCallback, thisObject) {
  let x = 30;
  let filteredArray = [];
  for (let index in this) {
    if (filterCallback.apply(thisObject, [this[index], index, this])) {
      filteredArray.push(this[index]);
    } else continue;
  }
  return filteredArray;
};

Array.prototype.myFilter = myFilter;

let array1 = [12, 5, 2, 0, 2, 128, 88, 14, 130, 44, 240, 56];
let array2 = [12, 12, 12, 12, 12, 12, 12, 12, 112];

function filterCallback(element, index, array) {
  return element >= this.x && index % 2 === 0 && array.length >= 8;
}

let obj1 = {
  x: 100,
};

let filtered = array1.myFilter(filterCallback, obj1);
console.log(filtered);

///////

// let obj1 = {
//   x: 100,
// };

// let obj = {
//   x: 40,
//   filteredArray() {
//     return [12, 5, 2, 0, 2, 88, 14, 130, 44, 56].filter(function calls(
//       element
//     ) {
//       return element > this.x;
//     },
//     anotherObj);
//   },
// };

// console.log(obj.filteredArray());
