# 树专题

从一题反转二叉树学模板 [翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

### 前序遍历

解题

```js
var invertTree = function (root) {
  if (!root) return root
    
  const temp = root.left
  root.left = root.right
  root.right = temp
    
  invertTree(root.left)
  invertTree(root.right)
  return root
};
```

提取模板，前中后序遍历的模板都差不多 遍历顺序有点不同

```js
function preorder(root) {
	if (!root) return root
	doSomething(root)
	preOrder(root.left)
	preOrder(root.right)
}
```

### 后序遍历

```js
function inorder(root) {
	if (!root) return root
	inorder(root.left)
	doSomething(root)
	inorder(root.right)
}
```

### 中序遍历

```js
function postorder(root) {
	if (!root) return root
	postorder(root.left)
	postorder(root.right)
	dosomething(root)
}
```

### 层序遍历

```js
var invertTree = function (root) {
  if (!root) return root
  let queue = []
  queue.push(root)
  while (queue.length) {
    // 当前层的节点个数
    const levelSize = queue.length;          
    // 逐个让当前层的节点出列
    for (let i = 0; i < levelSize; i++) {    
      // 当前出列的节点
      const cur = queue.shift();            
      // 左右子节点入列
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right); 
    }
   // dosmoething
  }
  return root
};

```

每层的数量即是queen.length

#### 提取模板

```js
var invertTree = function (root) {
  if (!root) return root
  let queue = []
  queue.push(root)
  while (queue.length) {
    let curLevel = queue.shift()
    
    dosomething() // 就这不一样
    
    if (curLevel.left) queue.push(curLevel.left)
    if (curLevel.right) queue.push(curLevel.right)
  }
  return root
};
```

### 构造一棵树

**单种前/中/后序遍历是无法确定一棵树**

实际上构造一棵树的本质是：

1. 确定根节点
2. 确定其左子树
3. 确定其右子树



- 前序遍历的顺序是 `root->left->right`，也就是说在前序遍历的结果中，**第一个节点就是 `root`**，它的后边紧跟着左子树和右子树的前序遍历结果。
- 中序遍历的顺序是 `left->root->right`，也就是说在中序遍历的结果数组中，**`root` 的左边是它左子树的中序遍历结果，它的右边是右子树的中序遍历结果。**
- 后序遍历的顺序是 `left->right->root`，也就是说在中序遍历的结果中，**最后个节点就是 `root**`，它的前面是左子树和右子树的后序遍历结果。

#### 练习

- [105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
- [106. 从中序与后序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)
- [889. 根据前序和后序遍历构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)