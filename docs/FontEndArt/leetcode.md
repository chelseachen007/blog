# 算法题

## 实现交通灯的逻辑：红灯亮5s,绿灯亮10s,黄灯亮3s,红灯亮5s...不停循环执行，亮的动作可以用一个伪函数来表示。

```js
      function sleep(wait) {
        return new Promise((reslove) => {
          setTimeout(reslove, wait);
        });
      }
      async function changeColor(color, wait) {
        // this.color = color;
        console.log(color);
        await sleep(wait);
      }
      async function go() {
        while (true) {
          await changeColor("red", 5000);
          await changeColor("green", 15000);
          await changeColor("yellow", 3000);
        }
      }
```





## 在开发中，我们经常会碰到将abc-xyz这类格式的字符串转为AbcXyz形式的驼峰字符串进行处理，例如：hello-world我们希望能够变成驼峰风格的HelloWorld,请编写代码实现这个camelize(str)方法

```js
toUpperCase()
```

