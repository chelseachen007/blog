# 基础算法

### 快速排序

```js
let sortColors = function (ary, left = 0, right = ary.length - 1) {
  if (left >= right) {
    return ary;
  }

  var i = left,
    j = right;
  base = ary[left];

  while (i < j) {
    // 从右边起，寻找比基数小的数
    while (i < j && ary[j] > base) {
      j--;
    }

    // 从左边起，寻找比基数大的数
    while (i < j && ary[i] < base) {
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

