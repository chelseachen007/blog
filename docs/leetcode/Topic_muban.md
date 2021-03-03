# 数据结构模板

## 栈

```JavaScript
class Stack {
    constructor() {
        this.dataStore = [];
        this.top = 0;
    }
    //Stack方法
    push (item) {
        this.dataStore.push(item);
        this.top++;
    }
    pop () {
        this.top--;
        return this.dataStore.pop();
    }
    peek () {
        return this.dataStore[this.top - 1];
    }
    size () {
        return this.top;
    }
    clear () {
        this.dataStore = [];
    }
}
```

## 链表

### 双向链表

```JavaScript
class DoubleLinkedListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}
```

### 链表操作

```JavaScript

```

## 堆

```JavaScript
class Heap {
    constructor(list = [], comparator) {
        this.list = list;

        if (typeof comparator != 'function') {
            this.comparator = function comparator (target, compared) {
                return target < compared;
            };
        } else {
            this.comparator = comparator;
        }

        this.init();
    }

    init () {
        const size = this.size();
        for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
            this.heapify(this.list, size, i);
        }
    }

    insert (n) {
        this.list.push(n);
        this.init()
    }

    peek () {
        return this.list[0];
    }

    pop () {
        const last = this.list.pop();
        if (this.size() === 0) return last;
        const returnItem = this.list[0];
        this.list[0] = last;
        this.heapify(this.list, this.size(), 0);
        return returnItem;
    }
    replace (n) {
        this.list[0] = n
        this.init()
    }
    sort () {
        let k = this.size() - 1;
        let sortArr = [...this.list]
        while (k > 1) {
            [sortArr[0], sortArr[k]] = [sortArr[k], sortArr[0]]
            --k;
            this.heapify(sortArr, k, 0);
        }
        return sortArr
    }
    size () {
        return this.list.length;
    }
    heapify (arr, size, i) {
        let largest = i;
        const left = i * 2 + 1;
        const right = i * 2 + 2;
        if (left < size && this.comparator(arr[largest], arr[left]))
            largest = left;
        if (right < size && this.comparator(arr[largest], arr[right]))
            largest = right;

        if (largest !== i) {
            [arr[largest], arr[i]] = [arr[i], arr[largest]];
            this.heapify(arr, size, largest);
        }
    }
}

class MaxHeap extends Heap {
    constructor(list, comparator) {
        super(list, comparator);
    }
}

class MinHeap extends Heap {
    constructor(list, comparator) {
        if (typeof comparator != 'function') {
            comparator = function comparator (inserted, compared) {
                return inserted > compared;
            };
        }
        super(list, comparator);
    }
}
```
