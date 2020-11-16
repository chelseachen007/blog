# 数据结构模板

## 栈

```js
class Stack {
    constructor() {
        this.dataStore = []; //{2}
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

```js
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

```js
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    isEmpty () {
        return this.length === 0;
    }
    printList () {
        const nodes = [];
        let current = this.head;
        while (current) {
            nodes.push(current.value);
            current = current.next;
        }
        return nodes.join(' -> ');
    }
    push (value) {
        const node = Node(value);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
            this.length++;
            return node;
        }
        this.tail.next = node;
        this.tail = node;
        this.length++;
    }
    pop () {
        if (this.isEmpty()) {
            return null;
        }
        const nodeToRemove = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.length--;
            return nodeToRemove;
        }

        let currentNode = this.head;
        let secondToLastNode;

        while (currentNode) {
            if (currentNode.next === this.tail) {
                secondToLastNode = currentNode;
                break;
            }
            currentNode = currentNode.next;
        }
        secondToLastNode.next = null;
        this.tail = secondToLastNode;
        this.length--;

        return nodeToRemove;
    }

    get (index) {
        if (index < 0 || index > this.length) {
            return null;
        }

        if (this.isEmpty()) {
            return null;
        }

        if (index === 0) {
            return this.head;
        }

        let current = this.head;
        let iterator = 0;

        while (iterator < index) {
            iterator++;
            current = current.next;
        }

        return current;
    }
    delete (index) {
        if (index < 0 || index > this.length - 1) {
            return null;
        }

        if (this.isEmpty()) {
            return null;
        }

        if (index === 0) {
            const nodeToDelete = this.head;
            this.head = this.head.next;
            this.length--;
            return nodeToDelete;
        }

        let current = this.head;
        let previous;
        let iterator = 0;

        while (iterator < index) {
            iterator++;
            previous = current;
            current = current.next;
        }
        const nodeToDelete = current;
        previous.next = current.next;

        if (previous.next === null) {
            this.tail = previous;
        }

        this.length--;

        return nodeToDelete;
    }
}
```

