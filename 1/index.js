const changeNumberSystem = () => {
  let number = prompt('Введите число:');
  const numberSystem = prompt(
    'Введите систему счисления (в виде числа, например, "2" для двоичной системы:'
  );
  if (isNaN(number) || isNaN(numberSystem)) {
    return 'Некорректный ввод!';
  }
  return (+number).toString(+numberSystem);
};

console.log(changeNumberSystem());
