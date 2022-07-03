class LinkedList {
  constructor() {
    this.item = (elem) => {
      return {
        value: elem,
        next: null,
      };
    };
    this.size = 0;
    this.head = null;
    this.tail = null;
  }
  static fromIterable(iterable) {
    if (
      !isNaN(iterable) ||
      typeof iterable === 'string' ||
      iterable instanceof Array ||
      iterable instanceof Map ||
      iterable instanceof Set
    ) {
      let listFromIterable = new this();
      if (iterable instanceof Map || iterable instanceof Set) {
        let iterator = iterable.values();
        while (true) {
          let nextElement = iterator.next();
          if (nextElement.done) break;
          listFromIterable.append(nextElement.value);
        }
      } else {
        for (let i in iterable) {
          listFromIterable.append(iterable[i]);
        }
      }

      return listFromIterable;
    } else {
      throw new Error(`Cannot iterate trough ${typeof iterable}`);
    }
  }

  append(elem) {
    let item = this.item(elem);
    if (this.size === 0) {
      this.head = item;
    } else {
      this.tail.next = item;
    }

    item.next = null;
    this.tail = item;
    this.size += 1;
  }

  prepend(elem) {
    let item = this.item(elem);
    if (this.size === 0) {
      item.next = null;
      this.tail = item;
    } else {
      item.next = this.head;
    }
    this.head = item;
    this.size += 1;
  }
  find(elem) {
    if (this.size === 0) {
      return null;
    }

    let searchItem = this.head;
    while (searchItem.next) {
      if (searchItem.value === elem) {
        return searchItem;
      } else {
        searchItem = searchItem.next;
      }
    }

    return null;
  }
  toArray() {
    let arrayFromList = [];

    let searchItem = this.head;
    while (searchItem.next) {
      arrayFromList = [...arrayFromList, searchItem.value];
      searchItem = searchItem.next;
    }
    return arrayFromList;
  }
}

module.exports = { LinkedList };
