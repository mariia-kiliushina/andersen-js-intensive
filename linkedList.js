class LinkedList {
  static fromIterable(iterable) {}
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

let list = new LinkedList();
list.append('aaa');
list.append('bbb');
list.append('ccc');
list.append('ddd');
list.append('fff');

console.warn('list.head');
console.log(list.head);
console.warn('list.head.next');
console.log(list.head.next);
console.warn('list.tail.next');
console.log(list.tail.next);
console.warn('list.head.next.next');
console.log(list.head.next.next);
list.prepend('first');
console.warn('list.head after prepend');
console.log(list.head);
console.warn('list.head.next after prepend');
console.log(list.head.next);
console.warn('list.head.next.next after prepend');
console.log(list.head.next.next);
console.log("list.find('first'))");
console.log(list.find('first'));
console.log("list.find('eee'))");
console.log(list.find('eee'));
console.log("list.find('ccc'))");
console.log(list.find('ccc'));
console.log('list.toArray()');
console.log(list.toArray());

module.exports = { LinkedList };
