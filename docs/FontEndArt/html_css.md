# HTML/CSS 专题

## 不限制方式绘制一个三角形状

### CSS 大法

```CSS
     .Triangle {
        width: 0;
        height: 0;
        border-top: 100px solid red;
        border-left: 100px solid transparent;
        border-right: 100px solid transparent;
      }
```

### SVG 大法

```HTML
    <svg>
      <polygon points="1,10 250,190 160,210" style="fill: red;" />
    </svg>
```

### canvas

```JavaScript
      let can = document.getElementById("canvas");
      let ctx = can.getContext("2d");
      let draw = function (x1, y1, x2, y2, x3, y3, color, type) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx[type + "Style"] = color;
        ctx.closePath();
        ctx[type]();
      };
      draw(50, 50, 75, 75, 50, 100, "red", "fill");
```
