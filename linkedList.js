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
  find(elem) {}
  toArray() {}
}

let list = new LinkedList();
list.append('aaa');
list.append('bbb');
list.append('ccc');

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
