class Car {
  constructor({
    brand,
    model,
    yearOfManufacturing,
    maxSpeed,
    maxFuelVolume,
    fuelConsumption,
    currentFuelVolume = 0,
    isStarted = false,
    mileage = 0,
  }) {
    if (this._checkBrand(brand) === 'ok') {
      this._brand = brand;
    }
    if (this._checkModel(model) === 'ok') {
      this._model = model;
    }
    if (this._checkYear(yearOfManufacturing) === 'ok') {
      this._yearOfManufacturing = yearOfManufacturing;
    }
    if (this._checkSpeed(maxSpeed) === 'ok') {
      this._maxSpeed = maxSpeed;
    }
    if (this._checkMaxFuel(maxFuelVolume) === 'ok') {
      this._maxFuelVolume = maxFuelVolume;
    }
    if (this._checkFuelConsumption(fuelConsumption) === 'ok') {
      this._fuelConsumption = fuelConsumption;
    }
    if (this._checkCurrentFuelVolume(currentFuelVolume) === 'ok') {
      this._currentFuelVolume = currentFuelVolume;
    }
    if (this._checkIsStarted(isStarted) === 'ok') {
      this._isStarted = isStarted;
    }
    if (this._checkMileage(mileage) === 'ok') {
      this._mileage = mileage;
    }
  }
  _isNotValidNumber(variable) {
    return (
      typeof variable !== 'number' ||
      isNaN(variable) ||
      variable === Infinity ||
      variable === -Infinity
    );
  }
  _isNegativeOrZero(variable) {
    return variable <= 0;
  }

  _throwTypeErrorWithText(type, variable, property) {
    throw new Error(`Expected ${type} as ${property} instead got ${typeof variable}`);
  }
  _checkBrand(newBrand) {
    if (typeof newBrand !== 'string') {
      this._throwTypeErrorWithText('string', newBrand, 'brand');
    }
    if (newBrand === '') {
      throw 'The "brand" property cannot be empty';
    }
    if (newBrand.length > 50) {
      throw 'The "brand" property cannot be longer than 50 symbols';
    }
    return 'ok';
  }
  _checkModel(newModel) {
    if (typeof newModel !== 'string') {
      this._throwTypeErrorWithText('string', newModel, 'model');
    }
    if (newModel === '') {
      throw 'The "model" property cannot be empty';
    }
    if (newModel.length > 50) {
      throw 'The "model" property cannot be longer than 50 symbols';
    }
    return 'ok';
  }
  _checkYear(newYearOfManufacturing) {
    if (this._isNotValidNumber(newYearOfManufacturing)) {
      this._throwTypeErrorWithText('number', newYearOfManufacturing, 'yearOfManufacturing');
    }
    if (newYearOfManufacturing < 1900) {
      throw 'The year of manufactoring cannot be earlier than 1900';
    }
    if (newYearOfManufacturing > new Date().getFullYear()) {
      throw 'The year of manufactoring cannot be in the future';
    }
    return 'ok';
  }
  _checkSpeed(newMaxSpeed) {
    if (this._isNotValidNumber(newMaxSpeed)) {
      this._throwTypeErrorWithText('number', newMaxSpeed, 'maxSpeed');
    }

    if (newMaxSpeed < 100 || newMaxSpeed >= 300) {
      throw 'Max speed should be within 100-300 km/h';
    }
    return 'ok';
  }
  _checkMaxFuel(newMaxFuelVolume) {
    if (this._isNotValidNumber(newMaxFuelVolume)) {
      this._throwTypeErrorWithText('number', newMaxFuelVolume, 'maxFuelVolume');
    }

    if (newMaxFuelVolume < 5 || newMaxFuelVolume >= 20) {
      throw 'Max speed should be within 5-20 (not inclusively) liters';
    }
    return 'ok';
  }
  _checkFuelConsumption(newFuelConsumption) {
    if (this._isNotValidNumber(newFuelConsumption)) {
      this._throwTypeErrorWithText('number', newFuelConsumption, 'fuelConsumption');
    }
    if (this._isNegativeOrZero(newFuelConsumption)) {
      throw new Error('Fuel consumption rate should be bigger than zero');
    }
    return 'ok';
  }
  _checkCurrentFuelVolume(currentFuelVolume) {
    if (this._isNotValidNumber(currentFuelVolume)) {
      this._throwTypeErrorWithText('number', currentFuelVolume, 'currentFuelVolume');
    }
    if (currentFuelVolume < 0) {
      throw new Error('Current fuel volume should be a positive number');
    }

    return 'ok';
  }
  _checkIsStarted(isStarted) {
    if (typeof isStarted !== 'boolean') {
      this._throwTypeErrorWithText('boolean', isStarted, 'isStarted');
    }
    return 'ok';
  }
  _checkMileage(mileage) {
    if (this._isNotValidNumber(mileage)) {
      this._throwTypeErrorWithText('number', mileage, 'mileage');
    }
    if (mileage < 0) {
      throw new Error('Mileage should be a positive number');
    }
    return 'ok';
  }

  get brand() {
    return this._brand;
  }
  set brand(newBrand) {
    this._checkBrand(newBrand);
    this._brand = newBrand;
  }
  get model() {
    return this._model;
  }
  set model(newModel) {
    this._checkModel(newModel);
    this._model = newModel;
  }
  get yearOfManufacturing() {
    return this._yearOfManufacturing;
  }
  set yearOfManufacturing(newYearOfManufacturing) {
    this._checkYear(newYearOfManufacturing);
    this._newYearOfManufacturing = newYearOfManufacturing;
  }
  get maxSpeed() {
    return this._maxSpeed;
  }
  set maxSpeed(newMaxSpeed) {
    this._checkSpeed(newMaxSpeed);
    this._maxSpeed = newMaxSpeed;
  }
  get maxFuelVolume() {
    return this._maxFuelVolume;
  }
  set maxFuelVolume(newMaxFuelVolume) {
    this.maxFuelVolume(newMaxFuelVolume);
    this._maxFuelVolume = newMaxFuelVolume;
  }
  get fuelConsumption() {
    return this._fuelConsumption;
  }
  set fuelConsumption(newFuelConsumption) {
    this._checkFuelConsumption(newFuelConsumption);
    this._fuelConsumption = newFuelConsumption;
  }
  get currentFuelVolume() {
    return this._currentFuelVolume;
  }
  get isStarted() {
    return this._isStarted;
  }
  get mileage() {
    return this._mileage;
  }

  start() {
    if (this._isStarted) {
      throw new Error('Машина уже заведена');
    }
    this._isStarted = true;
  }
  shutDownEngine() {
    if (this._isStarted === false) {
      throw new Error('Машина ещё не заведена');
    }
    this._isStarted = false;
  }
  fillUpGasTank(liters) {
    if (this._isNotValidNumber(liters)) {
      throw new Error('Неверное количество топлива для заправки');
    }
    if (this._isNegativeOrZero(liters)) {
      throw new Error('Неверное количество топлива для заправки');
    }
    if (this._currentFuelVolume + liters > this._maxFuelVolume) {
      throw new Error('Топливный бак переполнен');
    }
    this._currentFuelVolume += liters;
  }
  drive(speed, hours) {
    if (this._isNotValidNumber(speed)) {
      throw new Error('Неверная скорость');
    }

    if (this._isNegativeOrZero(speed)) {
      throw new Error('Неверное количество топлива для заправки');
    }

    if (this._isNotValidNumber(hours)) {
      throw new Error('Неверное количество часов');
    }

    if (this._isNegativeOrZero(hours)) {
      throw new Error('Неверное количество топлива для заправки');
    }

    if (speed > this._maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    }

    if (this._isStarted === false) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }

    const mileageToBeDriven = speed * hours;
    const amountOfFuelToBeConsumed = (mileageToBeDriven * this._fuelConsumption) / 100;
    if (this._currentFuelVolume < amountOfFuelToBeConsumed) {
      throw new Error('Недостаточно топлива');
    }

    this._currentFuelVolume -= amountOfFuelToBeConsumed;
    this._mileage += mileageToBeDriven;
  }
}

let myCar = new Car({
  brand: 'asdsd',
  model: 'hehehehhe',
  yearOfManufacturing: 1967,
  maxSpeed: 114,
  maxFuelVolume: 14,
  fuelConsumption: 76,
  currentFuelVolume: 0,
  isStarted: true,
  mileage: 90,
});

console.log(myCar);
console.log(myCar.);
module.exports = { Car };
