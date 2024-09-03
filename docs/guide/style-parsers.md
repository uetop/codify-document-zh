# 样式解析

解析程序可以将图层描述信息转换为相应的 `HTML` 和 `CSS` 代码。而且每个样式解析程序都可以配置[渲染选项](/guide/render-options)，并且它们在很大程度上是相似的。所以在进行样式解析配置之前，希望你尽可能的了解它们的使用方法。

> 受原型设计平台的描述信息的限制，Codify 暂时无法包含所有的 CSS 样式特性。

## 特点

解析程序会判断图层样式是否为 `class` 或 `style`。如果你的选项（Options）为特定的样式映射了对应的类名，它会自动将类名写入相应的 `classAttr` 属性中。以下是一个示例：

```json{16-19}
// 假设获取的目标图层 Fill 为白色填充 #fff
// 调用background解析程序
"background": {
  ...
  "styleAttr": "style",
  "stylePrefix": "--bg-color",
}
// 渲染为：
// <div style="--bg-color: #fff"></div>
```

[渲染器选项](/guide/render-options) 为解析程序提供了灵活性，并允许根据当前流行的前端框架和组件库输出相对应的代码格式。

### 配置样式映射
样式映射解析程序默认会调用样式映射配置中的 [background映射表](/guide/mappings#background)，同时也能够自定义样式映射表，如下所示：

```json{5-8}
"background": {
  ...
  "classAttr": "panel-body",
  "classPrefix": "bg-",
  "mappings": {
    "#fff": "content",
    "#eee": "hover"
  }
}
// 渲染为：
// <div panel-body="bg-content""></div>
```

## 小提示
以下代码示例为 Codify 提供的默认配置，如果你不需要对它进行修改，可以不用给这个解析器添加渲染选项。

```json
"background": {}
```

接下来，我们建议你在新窗口打开 <a href="/guide/render-options" target="_blank">渲染器选项</a> 同时参考渲染器选项的作用文档。

## width

解析节点的宽度

```json
"width": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "w-",
  "stylePrefix": "width",
  "getCssVar": false,
  "showUnit": true,
  "important": false,
  "mappings": {}
}
```

## height

解析节点的高度

```json
"height": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "h-",
  "stylePrefix": "height",
  "getCssVar": false,
  "showUnit": true,
  "important": false,
  "mappings": {}
```

::: tip
Codify 有一个默认行为，即避免输出每个图层节点的宽度和高度属性。这是因为在许多情况下，这些尺寸在最终代码输出中不是必需的或可取的。
如果你将一个具有 `Auto layout` 属性的图层设置为 `Flexed`, Codify 仍将输出 `width` 和 `height` 属性，因为它们对于布局可能很重要。
:::

### forcedOutput <Badge type="danger"> v1.0.11</Badge>
如果你需要在解析组件时访问其 `width` 或 `height` 属性，以便设置组件的属性，则可以使用 `forcedOutput` 强制输出这些值。

让我们看一个案例：

```json
// component_parsers.json
 "icon": {
    "props": {},
    "iconName": {},
    "width": {
      "classAttr": "size",
      "styleAttr": "size",
      "stylePrefix": "",
      "forcedOutput": true // [!code highlight]
    }
 }

 // 渲染为
 <icon size="16px"></icon>
```

## minWidth

解析节点的最小宽度

```json
"minWidth": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "min-w-",
  "stylePrefix": "min-width",
  "getCssVar": false,
  "showUnit": true,
  "important": false,
  "mappings": {}
}
```

## maxWidth

解析节点的最大宽度

```json
"minWidth": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "max-w-",
  "stylePrefix": "max-width",
  "getCssVar": false,
  "showUnit": true,
  "important": false,
  "mappings": {}
}
```




## minHeight


解析节点的最小高度

```json
"minHeight": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "min-h-",
  "stylePrefix": "min-height",
  "getCssVar": false,
  "showUnit": true,
  "important": false,
  "mappings": {}
}
```
## maxHeight

解析节点的最大高度

```json
"maxHeight": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "max-h-",
  "stylePrefix": "max-height",
  "getCssVar": false,
  "showUnit": true,
  "important": false,
  "mappings": {}
}
```

## display

根据自动布局信息，解析为 display 样式，如 `display: flex`

```json
"display": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "",
  "stylePrefix": "display",
  "getCssVar": false,
  "mappings": {}
}
```

## flex

用于控制弹性布局下的元素如何增大和缩小。

```json
"flex": {
  "nodeName": "",
  "classAttr": "class",
  "styleAttr": "style",
  "mappings": {}
}
```
Mappings 是根据 Figma 布局特性进行样式映射的。虽然它不包含所有的 flex 样式，但它可以完整地用代码还原设计意图。


## direction

适用于弹性布局 的 `flex-direction:` 属性。

```json
"direction": {
  "nodeName": "",
  "filter": "row",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "flex-",
  "stylePrefix": "flex-direction",
  "getCssVar": false,
  "mappings": {}
}
```

## justifyContent

适用于弹性布局 的 `justify-content:` 属性。

```json
"justifyContent": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "justify-",
  "stylePrefix": "justify-content",
  "getCssVar": false,
  "mappings": {}
}
```

## alignItems

适用于弹性布局 的 `align-items:` 属性

```json
"alignItems": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "items-",
  "stylePrefix": "align-items",
  "getCssVar": false,
  "mappings": {}
}
```

## gap

适用于弹性布局和网格布局 的 `gap:` 属性

```json{6-10}
"gap": {
  "nodeName": "",
  "filter": "0",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": {
    "gap": "gap-",
    "column-gap": "gap-x-",
    "row-gap": "gap-y-"
  },
  "stylePrefix": "gap",
  "getCssVar": false,
  "mappings": {}
}
```

`classPrefix` [渲染器选项](/guide/render-options.html#classprefix)支持对象，你可以为每个方向设置不同的前缀。

## padding

除了输出不同方向的属性以外还能输出合并属性，如 `padding: 10px`，从而提高代码质量。

```json{6-14}
"padding": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": {
    "padding": "p-",
    "padding-top": "p-t-",
    "padding-left": "p-l-",
    "padding-right": "p-r-",
    "padding-bottom": "p-b-",
    "padding-x": "p-x-",
    "padding-y": "p-y-"
  },
  "stylePrefix": "padding",
  "getCssVar": false,
  "getDirection": "",
  "mappings": {
    "direction": {},
    "size": {}
  }
}
```


## radius

除了不同方向的属性以外，还能输出合并属性，例如 `radius: 10px`

```json
"radius": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": {
    "radius": "rounded-",
    "radius-top-left": "rounded-tl-",
    "radius-top-right": "rounded-tr-",
    "radius-bottom-left": "rounded-bl-",
    "radius-bottom-right": "rounded-br-"
  },
  "stylePrefix": "border-radius",
  "getCssVar": false,
  "mappings": {}
}
```

## background

background 解析程序除了能渲染颜色以外，还能解析渐变、背景图片（包括图片填充方式）。并且能够自动输出不同的类型，如：`background-color:` 或者 `background-image:`

```json
"background": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "bg-",
  "stylePrefix": "background-color",
  "getCssVar": false,
  "mappings": {}
}
```

## borderColor

解析 `borderColor:` 样式。

```json
"border-color": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "border-",
  "stylePrefix": "border-color",
  "getCssVar": false,
  "mappings": {}
}
```

::: warning 
目前，Figma 还不支持分别为边框的四个边定义不同的颜色，因此无法实现边框颜色的分别渲染。 
:::

## borderStyle

borderStyle 解析器支持 bordr style 的分别渲染，如 `border-l-solid`

```json
"borderStyle": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  // "classPrefix": "border-" // 如果不需要分别输出4个方向的边框样式，可以统一设置为 “border-”
  "classPrefix": {
    "border": "border-",
    "border-top": "border-t-",
    "border-left": "border-l-",
    "border-right": "border-r-",
    "border-bottom": "border-b-",
    "border-x": "border-x-",
    "border-y": "border-y-"
  },
  "stylePrefix": "border-style",
  "getCssVar": false,
  "mappings": {}
}
```

## borderWidth

borderWidth 解析器支持 bordr width 的分别渲染，如 `border-t-4`

```json
"borderWidth": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": {
    "border": "border-",
    "border-top": "border-t-",
    "border-left": "border-l-",
    "border-right": "border-r-",
    "border-bottom": "border-b-",
    "border-x": "border-x-",
    "border-y": "border-y-"
  },
  "stylePrefix": "border-width",
  "getCssVar": false,
  "mappings": {}
}
```

## text

渲染纯文本内容

```json
"text": {
  "nodeName": "",
  "filter": "",
  "textAttr": "",
}
```

适用于写入到已经定义好样式的组件元素，例如：

```html
<Button type="primry">Hello</Button>
<!-- or -->
<Badge value="Hello" />
```

## color

color 解析器，可以输出文本颜色。如：`color: #000000`

```json
"color": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "text-",
  "stylePrefix": "color",
  "getCssVar": false,
  "mappings": {}
}
```
当图层节点的文本填充应用了[样式](https://help.figma.com/hc/en-us/articles/360039238753-Styles-in-Figma)时，Color 解析器会优先读取样式名称，然后将其作为类名输出。如果你定义了渲染钩子，并配置了样式映射表，Color 解析器将根据映射表输出相应的类名。这样，你可以灵活地控制文本填充样式的输出结果。

```json {4}
"color": {
  ...
  "mappings": {
    "#FFFFFF": "text-white" // 这是一个无效的配置
  }
}
```

未设置样式的填充将以 style 方式输出，而不会将 `#FFFFFF` 这样的值映射到 `text-white` 的样式上。这样的设定是为了避免出现不符合预期的错误行为。

## fontFamily

解析 `font-family:` 属性。

```json
"fontFamily": {
  "nodeName": "",
  "filter": ["Poppins","Helvetica Neue"],
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "font-",
  "stylePrefix": "font-family",
  "getCssVar": false,
  "mappings": {}
}
```

建议你在解析文本字体的时候，先设置好过滤选项来排除那些你前端代码中的默认字体。这样就不会反复生成冗余的样式了。下面是一个案例：

```css

- 你 css 文件中的 font-family 声明
body {
  .....
  font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  .....
}

- 样式解析程序的设置
"fontFamily": {
  ......
  "filter": ["IBM Plex Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"],
  ......
}
```


## fontSize

解析 `font-size:` 属性。

```json
"fontSize": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "text-",
  "stylePrefix": "font-size",
  "getCssVar": false,
  "mappings": {}
}
```

## fontWeight

解析 `font-weight:` 属性。

```json
"fontWeight": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "font-",
  "stylePrefix": "font-weight",
  "getCssVar": false,
  "mappings": {}
}
```

## letterSpacing

解析 `letter-spacing:` 属性。

```json
"letterSpacing": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "tracking-",
  "stylePrefix": "letter-spacing",
  "getCssVar": false,
  "mappings": {}
}
```

## lineHeight

解析 `line-height:` 属性。

```json
"lineHeight": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "leading-",
  "stylePrefix": "line-height",
  "getCssVar": false,
  "mappings": {}
}
```

## textAlign

解析 `text-align:` 属性。

```json
"textAlign": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "text-",
  "stylePrefix": "text-align",
  "getCssVar": false,
  "mappings": {}
}
```

## image

渲染 image 属性。

- 如果图层节点是一个图片，侧以 `<img src="url" />` 属性输出。
- 如果图层节点上带有其它的节点信息，则以 `background-image: url()` 样式输出

```json
"image": {
  "nodeName": "",
  "filter": "",
  "attrName": "src"
}
```

## opacity

渲染 `opacity:` 属性。

```json
"opacity": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "opacity-",
  "stylePrefix": "opacity",
  "getCssVar": false,
  "mappings": {}
}
```

## overflow

如果你的图层设置了「Clip content」则渲染 `overflow: hidden` 属性。

```json
"overflow": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "",
  "stylePrefix": "overflow",
  "getCssVar": false,
  "mappings": {}
}
```

## boxShadow

渲染 `box-shadow:` 属性。

```json
"boxShadow": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "shadow-",
  "stylePrefix": "box-shadow",
  "getCssVar": false,
  "mappings": {}
}
```

## position

渲染 `position:` 属性。

- 如果解析程序未检索到图层的 "Auto Layout" 属性，则以 `position: absolute` 属性输出。
- 如果你的 "Auto Layout" 节点中含有 "absolute position" 信息，则以 `position: absolute` 属性输出。并且会根据你设置的 "Constraints" 方向来输出 `left:` 、`top:`、`right:`和`bottom:` 属性。

```json
"position": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "",
  "stylePrefix": "position",
  "getCssVar": false,
  "mappings": {}
}
```
