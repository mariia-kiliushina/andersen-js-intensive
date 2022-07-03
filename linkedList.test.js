const { LinkedList } = require('./linkedList');

describe('LinkedList', () => {
  let aList;

  beforeEach(() => {
    aList = new LinkedList();
    aList.append('aaa');
    aList.append('bbb');
    aList.append('ccc');
  });

  it('', () => {
    expect(aList.head.next.value).toEqual('aaa');
  });

  it('', () => {
    expect(aList.head.next.next.value).toEqual('bbb');
  });

  it('', () => {
    expect(aList.head.next.next.next.value).toEqual('ccc');
  });
});

// console.warn('list.head.next');
// console.log(list.head.next);
// console.warn('list.head.next.next');
// console.log(list.head.next.next);
// console.warn('list.head.next.next.next');
// console.log(list.head.next.next.next);
// list.prepend('first');
// console.warn('list.head.next after prepend');
// console.log(list.head.next);
// console.warn('list.head.next.next after prepend');
// console.log(list.head.next.next);
// console.log("list.find('first'))");
// console.log(list.find('first'));
// console.log(list.toArray());
