# 【day-02】75. 颜色分类

[75.颜色分类](https://leetcode-cn.com/problems/sort-colors)

## 题目描述

```
给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

注意:
不能使用代码库中的排序函数来解决这道题。

示例:

输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]
进阶：

一个直观的解决方案是使用计数排序的两趟扫描算法。
首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。
你能想出一个仅使用常数空间的一趟扫描算法吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sort-colors
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 我的回答

### 暴力算法

这种算法特别暴力，但是不符合原地，继续思考

时间复杂度 `O(n)`,空间复杂度 `O(n)`

```js
var sortColors = function(nums) {
  let twoNums = 0;
  let newArray = [];
  nums.forEach((element) => {
    if (element == "0") newArray.unshift(element);
    if (element == "1") newArray.push(element);
    if (element == "2") twoNums++;
  });
  nums = [...newArray, ...new Array(twoNums).fill(2)];
  return nums;
};
```

### 快速排序

排序中的二分法

时间复杂度 `O(nlogn)`,空间复杂度 `O(n)`

```js
let sortColors = function(ary, left = 0, right = ary.length - 1) {
  if (left >= right) {
    return ary;
  }

  var i = left,
    j = right;
  base = ary[left];

  while (i < j) {
    // 从右边起，寻找比基数小的数
    while (i < j && ary[j] >= base) {
      j--;
    }

    // 从左边起，寻找比基数大的数
    while (i < j && ary[i] <= base) {
      i++;
    }

    if (i < j) {
      var temp = ary[i];
      ary[i] = ary[j];
      ary[j] = temp;
    }
  }

  ary[left] = ary[i];
  ary[i] = base;

  sortColors(ary, left, i - 1);
  sortColors(ary, i + 1, right);

  return ary;
};
```

### 三色旗算法

大表哥让看的三色旗算法。

主要定义三个指针，zero，one，two，zero 和 one 初始指向第一个元素，two 指向最后一个。
然后是中间保持是 1，其他情况进行交换和移动指针

时间复杂度`O(n)`,空间复杂度 `O(1)`

```js
var sortColors = function(nums) {
  let one = 0, //，用来遍历数组
    zero = 0, //始终指向第一个非0元素
    two = nums.length - 1; //默认最后一个，始终指向第一个非2元素
  function swap(left, right) {
    let temp = nums[left];
    nums[left] = nums[right];
    nums[right] = temp;
  }
  while (one <= two) {
    let newNumber = nums[one];
    if (newNumber === 0) {
      swap(one, zero);
      zero++;
      one++;
    }
    if (newNumber === 1) {
      one++;
    }
    if (newNumber === 2) {
      swap(one, two);
      two--;
    }
  }
  return nums;
};
```

## 参考回答
