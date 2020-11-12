# 链表专题

数组是连续的内存空间，通常每一个单位的大小也是固定的，因此可以按下标随机访问。

链表则不一定连续，因此其查找只能依靠别的方式，一般我们是通过一个叫 next 指针来遍历查找。

链表的优势在于在增删上 

而数组的优势在于查找

## 反转链表

### 反转整个链表

https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/

```js
var reverseList = function (head) {
    let [curr, pre] = [head, null]
    while (curr) {
        let next = curr.next
        curr.next = pre

        pre = curr
        curr = next
    }
    return pre
};

var reverseList = function (head) {
    if (!head || !head.next) return head
    const curr = reverseList(head.next)
    head.next.next = head
    head.next = null
    return curr
};
```

### 反转前N个链表

```js
// 反转以 head 为起点的 n 个节点，返回新的头结点
function reverseN(head, n) {
    if (n == 1) {
        // 记录第 n + 1 个节点
        successor = head.next;
        return head;
    }
    // 以 head.next 为起点，需要反转前 n - 1 个节点
    let last = reverseN(head.next, n - 1);

    head.next.next = head;
    // 让反转之后的 head 节点和后面的节点连起来
    head.next = successor;
    return last;
}
```

### 反转M-N之间的链表

https://leetcode-cn.com/problems/reverse-linked-list-ii/

```js
var reverseBetween = function (head, m, n) {
    if (m == 1) {
        return reverseN(head, n);
    }
    // 前进到反转的起点触发 base case
    head.next = reverseBetween(head.next, m - 1, n - 1);
    return head
};
```

## 环形链表

I 题只要相遇就是有环

快慢指针

![fig1](Grokking_four.assets/142_fig1.png)

任意时刻，\textit{fast}*fast* 指针走过的距离都为 \textit{slow}*slow* 指针的 22 倍。因此，我们有

​                                                        ***a*+(*n*+1)*b*+*nc*=2(*a*+*b*)⟹*a*=*c*+(*n*−1)(*b*+*c*)**

有了 a=c+(n-1)(b+c)a=c+(n−1)(b+c) 的等量关系，我们会发现：从相遇点到入环点的距离加上**n−1** 圈的环长，恰好等于从链表头部到入环点的距离。

因此，当发现slow 与fast 相遇时，我们再额外使用一个指针 ptr。起始，它指向链表头部；随后，它和slow 每次向后移动一个位置。最终，它们会在入环点相遇。

