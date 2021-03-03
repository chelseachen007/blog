# 【Day 6】 常数时间插入、删除和获取随机元素

## 题目描述

```markdown
设计一个支持在平均 时间复杂度 O(1) 下，执行以下操作的数据结构。

insert(val)：当元素 val 不存在时，向集合中插入该项。
remove(val)：元素 val 存在时，从集合中移除该项。
getRandom：随机返回现有集合中的一项。每个元素应该有相同的概率被返回。
示例 :

// 初始化一个空的集合。
RandomizedSet randomSet = new RandomizedSet();

// 向集合中插入 1 。返回 true 表示 1 被成功地插入。
randomSet.insert(1);

// 返回 false ，表示集合中不存在 2 。
randomSet.remove(2);

// 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
randomSet.insert(2);

// getRandom 应随机返回 1 或 2 。
randomSet.getRandom();

// 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
randomSet.remove(1);

// 2 已在集合中，所以返回 false 。
randomSet.insert(2);

// 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
randomSet.getRandom();

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/insert-delete-getrandom-o1
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 我的回答

https://github.com/leetcode-pp/91alg-1/issues/23#issuecomment-639949391

### 解法一

使用`Map`记录每个`val`对应地址，`push`的时候直接记录长度就可以，

当`remove`的时候开始使用`splice`发现保存的地址会混乱，然后就想到将最后一个`val`保存到`remove`的 val 地址中就可以了。

`getRandom`的话直接使用 JS 自带的`random`是伪随机，不能保证每个元素有相同的概率被返回。

#### 时间复杂度

insert O(1)

remove O(1)

getRandom O(1)

空间复杂度 O(n)

```JavaScript
/**
 * Initialize your data structure here.
 */
var RandomizedSet = function () {
    this.map = new Map()
    this.arr = []
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
    if (this.map.has(val)) return false
    this.map.set(val, this.arr.length)
    this.arr.push(val)
    return true
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
    if (!this.map.has(val)) return false
    let index = this.map.get(val)
    if (index == this.arr.length - 1) {
        this.arr.pop()
        this.map.delete(val)
    } else {
        let lastValue = this.arr.pop()
        this.arr[index] = lastValue
        this.map.set(lastValue,index)
        this.map.delete(val)
    }
    return true

};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
    let num = Math.floor(Math.random() * this.arr.length)
    return this.arr[num]
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
```

## 参考回答
