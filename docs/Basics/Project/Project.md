# 项目总结

## 虚拟滚动列表

虚拟滚动简单的说就是渲染在浏览器中当前可见的范围内的内容，通过用户滑动滚动条的位置动态地来计算显示内容，其余部分用空白填充来给用户造成一个长列表的假象。

[图片懒加载原理](https://hateonion.me/posts/19jan30/)

[浅说虚拟列表的实现原理](https://github.com/dwqs/blog/issues/70)

[如何高性能的渲染十万条数据(虚拟列表)](https://github.com/chenqf/frontEndBlog/issues/16)

### 当高度不固定时

- 传入动态高度，缺点 还是已知高度
- 预先渲染至屏幕外，再渲染至屏幕内，这导致渲染成本增加一倍，
- 维护一个position数组，监听scrollTop 实时更新高度差 （后面都是写这个）

### 优化点

- 通过二分法寻找开始索引
- 防止滚动过快出现白屏，在可视区域上下增加额外的预渲染区域
- 使用 **IntersectionObserver** 替代scrollTop，减少频繁计算
- 动态资源使用 [ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) 监听高度变化



## 异常监控插件

## 大数据优化

## webpack 优化

## 代码规范和自动化监测

## 多种格式预览

