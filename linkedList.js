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
    this.head = {
      next: null,
    };
  }

  append(elem) {
    if (this.size === 0) {
      this.head.next = this.item(elem);
    }
    if (this.size === 1) {
      this.head.next.next = this.item(elem);
    }
    if (this.size === 2) {
      this.head.next.next.next = this.item(elem);
    }
    this.size += 1;
  }

  prepend(elem) {
    let item = this.item(elem);
    item.next = this.head.next;
    this.head.next = item;
    this.size += 1;
  }
  find(elem) {
    if (this.head.next.value === elem) {
      return 'elem was found!!!!';
    } else {
      return 'ERROR';
    }
  }
  toArray() {
    let arrayFromList = [];

    for (let i = 1; i <= this.size; i++) {
      arrayFromList.push(this.head.next.value);
    }

    return arrayFromList;
  }
}

let list = new LinkedList();
list.append('aaa');
list.append('bbb');
list.append('ccc');

console.log("list.find('aaa')");
console.log(list.find('aaa'));

console.warn('list.head.next');
console.log(list.head.next);
console.warn('list.head.next.next');
console.log(list.head.next.next);
console.warn('list.head.next.next.next');
console.log(list.head.next.next.next);
list.prepend('first');
console.warn('list.head.next after prepend');
console.log(list.head.next);
console.warn('list.head.next.next after prepend');
console.log(list.head.next.next);
console.log("list.find('first'))");
console.log(list.find('first'));
console.log(list.toArray());
