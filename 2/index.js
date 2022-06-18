const getResult = () => {
  const errorMessage = 'Некорректный ввод!';
  const number1 = +prompt('Введите число 1:');
  if (isNaN(number1)) {
    return errorMessage;
  }

  const number2 = +prompt('Введите число 2:');
  if (isNaN(number2)) {
    return errorMessage;
  }

  const sum = number1 + number2;
  const quotient = number1 / number2;

  return `Ответ: ${sum}, ${quotient}`;
};

console.log(getResult());
