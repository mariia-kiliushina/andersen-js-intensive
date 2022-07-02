class Car {
  constructor(
    brand,
    model,
    yearOfManufacturing,
    maxSpeed,
    maxFuelVolume,
    fuelConsumption,
    currentFuelVolume = 0,
    isStarted = false,
    mileage = 0
  ) {
    this._brand = brand;
    this._model = model;
    this._yearOfManufacturing = yearOfManufacturing;
    this._maxSpeed = maxSpeed;
    this._maxFuelVolume = maxFuelVolume;
    this._fuelConsumption = fuelConsumption;
    this._currentFuelVolume = currentFuelVolume;
    this._isStarted = isStarted;
    this._mileage = mileage;
  }
  get brand() {
    return this._brand;
  }
  set brand(newBrand) {
    if (typeof newBrand !== 'string') {
      throw `Expected string instead got ${typeof newBrand}`;
    }
    if (newBrand === '') {
      throw 'The "brand" property cannot be empty';
    }
    if (newBrand.length > 50) {
      throw 'The "brand" property cannot be longer than 50 symbols';
    }
    this._brand = newBrand;
  }
  get model() {
    return this._model;
  }
  set model(newModel) {
    if (typeof newModel !== 'string') {
      throw `Expected string instead got ${typeof newModel}`;
    }
    if (newModel === '') {
      throw 'The "model" property cannot be empty';
    }
    if (newModel.length > 50) {
      throw 'The "model" property cannot be longer than 50 symbols';
    }
    this.model = newModel;
  }
  get yearOfManufacturing() {
    return this._yearOfManufacturing;
  }
  set yearOfManufacturing(newYearOfManufacturing) {
    if (typeof newYearOfManufacturing !== 'number') {
      throw `Expected number instead got ${typeof newYearOfManufacturing}`;
    }

    if (newYearOfManufacturing < 1900) {
      throw 'The year of manufactoring cannot be earlier than 1900';
    }
    this._newYearOfManufacturing = newYearOfManufacturing;
  }
  get maxSpeed() {
    return this._maxSpeed;
  }
  set maxSpeed(newMaxSpeed) {
    if (typeof newMaxSpeed !== 'number') {
      throw `Expected number instead got ${typeof newMaxSpeed}`;
    }

    if (newMaxSpeed < 100 || newMaxSpeed >= 300) {
      throw 'Max speed should be within 100-300 km/h';
    }
    this._maxSpeed = newMaxSpeed;
  }
  get maxFuelVolume() {
    return this._maxFuelVolume;
  }
  set maxFuelVolume(newMaxFuelVolume) {
    if (typeof newMaxFuelVolume !== 'number') {
      throw `Expected number instead got ${typeof newMaxFuelVolume}`;
    }

    if (newMaxFuelVolume < 5 || newMaxFuelVolume >= 20) {
      throw 'Max speed should be within 5-20 liters';
    }
    this._maxFuelVolume = newMaxFuelVolume;
  }
  get fuelConsumption() {
    return this._fuelConsumption;
  }
  set fuelConsumption(newFuelConsumption) {
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
    if (
      typeof liters !== 'number' ||
      liters === NaN ||
      liters === Infinity ||
      liters === -Infinity ||
      liters <= 0
    ) {
      throw new Error('Неверное количество топлива для заправки');
    }
    if (this._currentFuelVolume + liters > this._maxFuelVolume) {
      throw new Error('Топливный бак переполнен');
    }
    this._currentFuelVolume += liters;
  }
  drive(speed, hours) {
    if (
      typeof speed !== 'number' ||
      speed === NaN ||
      speed === Infinity ||
      speed === -Infinity ||
      speed <= 0
    ) {
      throw new Error('Неверная скорость');
    }

    if (
      typeof hours !== 'number' ||
      hours === NaN ||
      hours === Infinity ||
      hours === -Infinity ||
      hours <= 0
    ) {
      throw new Error('Неверное количество часов');
    }

    if (speed > this._maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    }

    if (this._isStarted === false) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
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

module.exports = { Car };
