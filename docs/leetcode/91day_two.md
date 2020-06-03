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

> ## 题目地址
> https://leetcode.com/problems/sort-colors/description/
>
> ## 题目描述
> 给定一个包含红色、白色和蓝色，一共 _n_ 个元素的数组，**[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)**对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
>
> 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
>
> **注意:**
> 不能使用代码库中的排序函数来解决这道题。
>
> **示例:**
>
> **输入:** [2,0,2,1,1,0]
> **输出:** [0,0,1,1,2,2]
>
> ## 前置知识
> * [快速排序](https://baike.baidu.com/item/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/369842?fromtitle=%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F&fromid=2084344)
> * [计数排序](https://baike.baidu.com/item/%E8%AE%A1%E6%95%B0%E6%8E%92%E5%BA%8F)
>
> ## 思路
> 这个问题是典型的荷兰国旗问题 （[https://en.wikipedia.org/wiki/Dutch_national_flag_problem）。](https://en.wikipedia.org/wiki/Dutch_national_flag_problem%EF%BC%89%E3%80%82) 因为我们可以将红白蓝三色小球想象成条状物，有序排列后正好组成荷兰国旗。
>
> ## 解法一 - 计数排序
> * 遍历数组，统计红白蓝三色球（0，1，2）的个数
> * 根据红白蓝三色球（0，1，2）的个数重排数组
>
> 这种思路的时间复杂度：$O(n)$，需要遍历数组两次（Two pass）。
>
> ![image](../../../../Blog/docs/.vuepress/public/83542989-4ef55100-a52e-11ea-9a49-a0e9443da5f4.png)
>
> ## 解法二 - 挡板法
> 我们可以把数组分成三部分，前部（全部是0），中部（全部是1）和后部（全部是2）三个部分。每一个元素（红白蓝分别对应0、1、2）必属于其中之一。将前部和后部各排在数组的前边和后边，中部自然就排好了。
>
> 我们用三个指针，设置两个指针begin指向前部的末尾的下一个元素（刚开始默认前部无0，所以指向第一个位置），end指向后部开头的前一个位置（刚开始默认后部无2，所以指向最后一个位置），然后设置一个遍历指针current，从头开始进行遍历。
>
> 形象地来说地话就是有两个挡板，这两个挡板实现我们不知道，我们地目标就是移动挡板到合适位置，并且使得挡板每一部分都是合适地颜色。
>
> ![image](https://user-images.githubusercontent.com/12479470/83542469-9a5b2f80-a52d-11ea-990d-1b56623ba2c8.png)
>
> 还是以题目给的样例来说，初始化挡板位置为最左侧和最右侧：
>
> ![image](../../../../Blog/docs/.vuepress/public/83542548-b19a1d00-a52d-11ea-92aa-c2458d7fe178.png)
>
> 读取第一个元素是2，它应该在右边，那么我们移动右边地挡板。
>
> ![image](https://user-images.githubusercontent.com/12479470/83542598-c5de1a00-a52d-11ea-9095-c66e1ed20c8f.png)
>
> 并将其和移动挡板后挡板右侧地元素进行一次交换，这意味着“被移动挡板右侧地元素已就位”。
>
> ![image](../../../../Blog/docs/.vuepress/public/83542711-e9a16000-a52d-11ea-9226-5a385c26174c.png)
>
> 。。。
>
> 整个过程大概是这样的：
>
> ![image](https://user-images.githubusercontent.com/12479470/83542777-08075b80-a52e-11ea-922b-110b6f1a9fbc.png)
>
> 这种思路的时间复杂度也是$O(n)$, 只需要遍历数组一次。
>
> ### 关键点解析
> * 荷兰国旗问题
> * counting sort
>
> ### 代码
> 代码支持： Python3
>
> Python3 Code:
>
> ```python
> class Solution:
>     def sortColors(self, nums: List[int]) -> None:
>         """
>         Do not return anything, modify nums in-place instead.
>         """
>         p0 = cur = 0
>         p2 = len(nums) - 1
>         
>         while cur <= p2:
>             if nums[cur] == 0:
>                 nums[cur], nums[p0] = nums[p0], nums[cur]
>                 p0 += 1
>                 cur += 1
>             elif nums[cur] == 2:
>                 nums[cur], nums[p2] = nums[p2], nums[cur]
>                 p2 -= 1
>             else:
>                 cur += 1
> ```
>
> _**复杂度分析**_
>
> * 时间复杂度：$O(N)$
> * 空间复杂度：$O(1)$
>
> 更多题解可以访问我的LeetCode题解仓库：https://github.com/azl397985856/leetcode 。 目前已经30K star啦。
>
> 大家也可以关注我的公众号《力扣加加sa》获取更多更新鲜的LeetCode题解
>