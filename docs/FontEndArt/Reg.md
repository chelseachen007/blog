# 正则题

### 1.短横线命名转换成驼峰命名

var s1 = "get-element-by-id"; 给定这样一个连字符串，写一个function转换为驼峰命名法形式的字符串 getElementById

解析：

```js
var s1 = "get-element-by-id";

const toUpperCase = (s) =>
  s.replace(/-[a-z]/g, (x) => x.slice(1).toUpperCase());

console.log(toUpperCase(s1));
```



### 2、正则题：实现正则获取url params 对象

```js
function parseQuery(url) {
    var queryObj={};
    var reg=/[?&]([^=&]+)=([^&]*)/g;
    var querys=url.match(reg);
    console.log(querys);
    if(querys){
        for(var i in querys){
            var query=querys[i].split('=');
            var key=query[0].substr(1),
                value=query[1];
            queryObj[key]
              ? queryObj[key]=[].concat(queryObj[key],value)
              : queryObj[key]=value;
        }
    }
    return queryObj;
}

// [xyz] 一个字符集合。匹配方括号中的任意字符，[abcd] 和[a-d]是一样的
// [^xyz] 一个反向字符集。也就是说， 它匹配任何没有包含在方括号中的字符。
// + 匹配 1 次或多次
// \* 匹配 0 次或多次

var url='http:www.baidu.com/index?=name=username&age=27&pwd=zbc|123@&likes=lol&likes=beautifull girl&$id=main#flag=66';
console.log(parseQuery(url));
```





### 3、使用正则获取URL中参数值（QueryString）



### 4、实现正则切分千分位（10000 => 10,000）

```js
var numberStr = "10000000";

console.log(numberStr.replace(/(?=([0-9]{3})+$)/g, "$&,"));
```



### 5、匹配邮箱

```js
function parseQuery(url) {
  let reg = /^[\w]+@[\w-]+(\.[\w-]+)$/g;
  return url.match(reg);
}

console.log(parseQuery(`6xxxxxxx9_chen@qq.com`));

```

