# 排序算法

计时都是使用一个长度为 1000 的随机数组

### 复杂度列表

| 排序法 | 平均时间 | 最差情形    | 稳定度 | 额外空间 | 备注                            |
| ------ | -------- | ----------- | ------ | -------- | ------------------------------- |
| 冒泡   | O(n2)    | O(n2)       | 稳定   | O(1)     | n 小时较好                      |
| 选择   | O(n2)    | O(n2)       | 不稳定 | O(1)     | n 小时较好                      |
| 插入   | O(n2)    | O(n2)       | 稳定   | O(1)     | 大部分已排序时较好              |
| 基数   | O(logRB) | O(logRB)    | 稳定   | O(n)     | B 是真数(0-9)，R 是基数(个十百) |
| Shell  | O(nlogn) | O(ns) 1<s<2 | 不稳定 | O(1)     | s 是所选分组                    |
| 快速   | O(nlogn) | O(n2)       | 不稳定 | O(nlogn) | n 大时较好                      |
| 归并   | O(nlogn) | O(nlogn)    | 稳定   | O(1)     | n 大时较好                      |
| 堆     | O(nlogn) | O(nlogn)    | 不稳定 | O(1)     | n 大时较好                      |

### 冒泡排序

冒泡排序（Bubble Sort)一种交换排序，它的基本思想是：两两比较相邻记录的关键字，如果反序则交换，直到没有反序的记录为止

#### 基础版本

基础版本也叫交换排序，双层循环遇到比自己大的进行交换

```JavaScript
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] <= arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}
```

#### 优化版本

优化点

1. 从后往前，把过程中的几次交换提到更前面位置，减少了交换过程中的不必要交换
2. 循环 一次没有进行交换，则已完成排序，退出

```JavaScript
function HighBubbleSort(arr) {
  let flag = true;
  for (let i = 0; i < arr.length && flag; i++) {
    flag = false;
    for (let j = arr.length - 1; j >= i; j--) {
      if (arr[i] < arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        flag = true;
      }
    }
  }
  return arr;
}
```

#### 计时比较

```JavaScript
bubbleSort: 7.117ms
HighBubbleSort: 0.109ms
```

### 插入排序

取出下一个元素和当前元素比较，如果当前元素大就交换位置。那么此时第一个元素就是当前的最小数，所以下次取出操作从第三个元素开始，向前对比，重复之前的操作。

```JavaScript
function insertSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    let preIndex = i - 1;
    let current = arr[i];
    // 若大于current 则右移一位
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    //将值替换到下标点
    arr[preIndex + 1] = current;
  }
  return arr;
}
```

#### 计时

```JavaScript
insertSort: 4.876ms
```

### 选择排序

**时间复杂度为 O(n^2)**

循环过去 记录最小值下标 比起冒泡 不用多次交换位置

```JavaScript
function selectSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}
```

#### 计时

```JavaScript
selectSort: 6.682ms
```

### 快速排序

快速排序是对冒泡排序的一种改进，第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小。然后递归调用，在两边都实行快速排序。

```JavaScript
function quickSort (arr, begin = 0, end = arr.length - 1) {
    //递归出口
    if (begin >= end)
        return;
    var l = begin; // 左指针
    var r = end; //右指针
    // 尽量避免最差情况
    const p = Math.floor(Math.random() * (end - begin + 1)) + begin;
    swap(arr, p, begin)

    var temp = arr[begin]; //基准数，这里取数组第一个数

    //左右指针相遇的时候退出扫描循环
    while (l < r) {
        //右指针从右向左扫描，碰到第一个小于基准数的时候停住
        while (l < r && arr[r] >= temp)
            r--;
        //左指针从左向右扫描，碰到第一个大于基准数的时候停住
        while (l < r && arr[l] <= temp)
            l++;
        //交换左右指针所停位置的数
        swap(arr, l, r)

    }
    //最后交换基准数与指针相遇位置的数
    swap(arr, begin, l)
    //递归处理左右数组
    quickSort(arr, begin, l - 1);
    quickSort(arr, l + 1, end);
    return arr
}
const swap = (nums, i, j) => ([nums[i], nums[j]] = [nums[j], nums[i]]);
```

#### 计时

```JavaScript
quickSort: 4.178ms
```

### 归并排序

归并排序通过分治的思想，把长度为 n 的数列，每次简化为两个长度为 n/2 的数列。这更有利于计算机的并行处理，只需要 log2n 次归并。
