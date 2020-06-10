# 【Day 10】 相交链表

## 题目描述

> * 编写一个程序，找到两个单链表相交的起始节点。
>   如下面的两个链表：
>   ![img](../.vuepress/public/68747470733a2f2f6173736574732e6c656574636f64652d636e2e636f6d2f616c6979756e2d6c632d75706c6f61642f75706c6f6164732f323031382f31322f31342f3136305f73746174656d656e742e706e67)
>   ![image](https://user-images.githubusercontent.com/38604634/84168838-77d79200-aaaa-11ea-92f5-eb50231d0669.png)
>   在节点 c1 开始相交。
>   示例 1：
>   ![img](../.vuepress/public/68747470733a2f2f6173736574732e6c656574636f64652d636e2e636f6d2f616c6979756e2d6c632d75706c6f61642f75706c6f6164732f323031382f31322f31342f3136305f6578616d706c655f312e706e67)
>   ![image](https://user-images.githubusercontent.com/38604634/84168864-80c86380-aaaa-11ea-978f-f8f479fb84e4.png)
>   输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
>   输出：Reference of the node with value = 8
>   输入解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
>   示例 2：
>   ![img](../.vuepress/public/68747470733a2f2f6173736574732e6c656574636f64652d636e2e636f6d2f616c6979756e2d6c632d75706c6f61642f75706c6f6164732f323031382f31322f31342f3136305f6578616d706c655f322e706e67)
>   ![image](https://user-images.githubusercontent.com/38604634/84168917-8de55280-aaaa-11ea-9e41-fb6f49fcc9ef.png)
>   输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
>   输出：Reference of the node with value = 2
>   输入解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
>   示例 3：
>   ![img](../.vuepress/public/68747470733a2f2f6173736574732e6c656574636f64652d636e2e636f6d2f616c6979756e2d6c632d75706c6f61642f75706c6f6164732f323031382f31322f31342f3136305f6578616d706c655f332e706e67)
>   ![image](https://user-images.githubusercontent.com/38604634/84168956-9ccc0500-aaaa-11ea-8541-f3245f91ec73.png)
>   输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
>   输出：null
>   输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
>   解释：这两个链表不相交，因此返回 null。
>   注意：
>   如果两个链表没有交点，返回 null.
>   在返回结果后，两个链表仍须保持原有的结构。
>   可假定整个链表结构中没有循环。
>   程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。
>   来源：力扣（LeetCode）
>   链接：https://leetcode-cn.com/problems/intersection-of-two-linked-lists
>   著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 我的回答

### 解法一

理解了好久 链表的next指向的是引用地址，只需要向每个地址中添加一个标记位，B链表访问到的第一个有标记位的地址就是公共交点

#### 时空复杂度O(2n)

```js
var getIntersectionNode = function(headA, headB) {
    while(headA) {
        headA.flag = true
        headA = headA.next
    }
    while(headB) {
        if (headB.flag) return headB
        headB = headB.next
    }
    return null
};
```

### 解法二

这个解法看题解理解的，把两个链表连接起来，会得到两条数量相同，但是连接地址不同的链表，

## 参考回答
