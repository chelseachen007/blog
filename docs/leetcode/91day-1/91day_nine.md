# 【Day 9】 有序链表转换二叉搜索树

## 题目描述

```markdown
给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:

给定的有序链表： [-10, -3, 0, 5, 9],

一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5   
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

## 我的回答

### 解法一

#### 时空复杂度

```js

```



## 参考回答

> 二叉搜索树性质
>
> 对于树中任意一个点，当前节点的权值必然大于所有左子树节点的权值
> 同理,当前节点的权值必然小于所有右子树节点的权值
> 因为给的链表是有序的,
>
> 以链表中点为根
> 中点左边的值都小于它,可以构造左子树,
> 同理构造右子树
> 循环第一步
> 因为链表访问中点的时间复杂度为O(n),
> 所以可以使用数组将链表的值存储,以空间换时间
>
>```js
> var sortedListToBST = function(head) {
>     let res = []
>     while(head){
>         res.push(head.val)
>         head = head.next
>     }
>
>     return run(res)
> };
>
> function run(res){
>     if(res.length == 0) return null
>     let mid = parseInt(res.length / 2)
>     let root = new TreeNode(res[mid])
>     root.left = mid > 0 ? run(res.slice(0, mid)) : null
>     root.right = mid >= res.length - 1 ? null : run(res.slice(mid + 1))
>     return root
> }
>```
> 作者：ZStar01
> 链接：https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/solution/di-gui-yi-ba-suo-by-zstar01/
> 来源：力扣（LeetCode）
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。