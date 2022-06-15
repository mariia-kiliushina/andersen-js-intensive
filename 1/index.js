const changeNumberSystem = () => {
  let number = prompt('Введите число:');
  const numberSystem = prompt(
    'Введите систему счисления (в виде числа, например, "2" для двоичной системы:'
  );
  if (isNaN(number) || isNaN(numberSystem)) {
    return 'Некорректный ввод!';
  }
  let result = [];
  do {
    let addToResult = number % numberSystem;
    let numberForFurtherDivision = Math.floor(number / numberSystem);
    result.push(addToResult);
    number = numberForFurtherDivision;
  } while (number >= numberSystem);
  result.push(number); //number here is the last remainder in division cycle
  const answer = result.reverse().join('');
  return answer;
};

console.log(changeNumberSystem());
