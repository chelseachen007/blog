# 算法基础

## 二分查找

二分查找适合解决在有序列表中寻找值。这个算法就是典型的 O(log n)查询

#### 最简单的情况就是有序数组中不存在重复元素，

```JavaScript
let easyArr = [1, 2, 5, 6, 7, 9, 15, 17, 25];
function easyCode(arr, value) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    let mid = (low + high) / 2;
    /*     mid=(low+high)/2 这种写法是有问题的。因为如果 low 和 high 比较大的话，两者之和就有可能会溢出。
    改进的方法是将 mid 的计算方式写成 low+(high-low)/2。
    更进一步，如果要将性能优化到极致的话，我们可以将这里的除以 2 操作转化成位运算 low+((high-low)>>1)。
    因为相比除法运算来说，计算机处理位运算要快得多。 */
    if (arr[mid] === value) {
      return mid;
    } else if (arr[mid] < value) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}

console.log(easyCode(easyArr, 15));
```

#### 变体一：查找第一个值等于给定值的元素

```JavaScript
let newArr = [8, 8, 8, 11, 15, 16];
// 变体一：查找第一个值等于给定值的元素
function findFirst(arr, value) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] < value) {
      low = mid + 1;
    } else if (arr[mid] > value) {
      high = mid - 1;
    } else {
      //只有当左边一个不是相等值的时候才是第一个
      //不然将变成右边界继续寻找更左的
      if (arr[mid - 1] != value) return mid;
      high = mid - 1;
    }
  }
  return -1;
}
console.log(findFirst(newArr, 8));
```

#### 变体二：查找最后一个值等于给定值的元素

```JavaScript
let endArr = [1, 3, 4, 5, 6, 8, 8, 8];
// 变体一：查找第一个值等于给定值的元素
function findEnd(arr, value) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] < value) {
      low = mid + 1;
    } else if (arr[mid] > value) {
      high = mid - 1;
    } else {
      if (arr[mid + 1] != value) return mid;
      low = mid + 1;
    }
  }
  return -1;
}
console.log(findEnd(endArr, 8));
```

#### 变体三：查找第一个大于等于给定值的元素

```JavaScript
let FirstThanArr = [1, 3, 4, 5, 6, 8, 8, 8];

//变体三：查找第一个大于等于给定值的元素
function findFirstThan(arr, value) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] < value) {
      low = mid + 1;
    } else if (arr[mid] > value) {
      high = mid - 1;
    } else {
      if (arr[mid + 1] != value) {
        return mid === arr.length - 1 ? -1 : mid + 1;
      }
      low = mid + 1;
    }
  }
  return -1;
}
console.log(findFirstThan(endArr, 8));
```

#### 变体四：查找最后一个小于等于给定值的元素

```JavaScript
let EndThanArr = [1, 3, 4, 5, 6, 8, 8, 8, 9];

// 变体四：查找最后一个小于等于给定值的元素
function findEndThan(arr, value) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] < value) {
      low = mid + 1;
    } else if (arr[mid] > value) {
      high = mid - 1;
    } else {
      if (arr[mid - 1] != value) {
        return mid === 0 ? -1 : mid - 1;
      }
      low = mid + 1;
    }
  }
  return -1;
}
console.log(findEndThan(EndThanArr, 8));
```

## 单调栈

```JavaScript
// 每日温度 适合做单调栈模板
var dailyTemperatures = function (T) {
    const stack = []
    for (let i = 0; i < T.length; i++) {
        while (stack.length && T[stack[stack.length - 1]] < T[i]) {
            let peek = stack.pop()
        }
        stack.push(i)
    }
};
```

- [84. 柱状图中最大的矩形](https://github.com/azl397985856/leetcode/blob/master/problems/84.largest-rectangle-in-histogram.md)
- [739.每日温度](https://leetcode.com/problems/daily-temperatures/)

## 链表

### 反转链表

#### 基础模板

https://leetcode-cn.com/problems/reverse-linked-list/

```JavaScript
// 迭代模板
var reverseList = function (head) {
    let [prev, curr] = [null, head]
    while (curr) {
        let next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }
    return prev
}
// 递归模板
var reverseList = function (head) {
    if (!head || !head.next) return head
    let newHead = reverseList(head.next)
    head.next.next = head
    head.next = null
    return newHead
}
```

#### [两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)
