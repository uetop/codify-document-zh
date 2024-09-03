# 组件解析

Codify 能将设计组件映射到前端组件上。这意味着你可以轻松地生成真实、可交互的前端代码。

### 如何使用

建议你在尝试编写时：

- 了解前端组件库的 Props 属性
- 至少完成了一个设计组件的结构设计，或使用我们为你提供的 [Figma 组件模版](https://www.figma.com/community/file/1362976228899599536/codify-uikit)
- 根据学习路径，顺便了解 [样式解析程序](/guide/style-parsers) 和 [渲染器选项](/guide/render-options) 的作用


## 起步

我们将从第一个组件开始，由浅入深的学习，让你轻松掌握整个过程。以确保你能轻松生成符合项目需求的代码。

![alt text](/images/create-component.png)

首选我们创建了一个 名为 `<button>` 的组件和它的各种变体。同时还选择了 `text` 图层作为组件的文本内容。下面我要做的是在 Codify 后台的  [component_parsers.json](https://codify.fun) 文件中编写解析这个 button 组件的配置。

### 最简单的组件解析配置

下面的代码，用于声明你要解析的组件名称。

```json
// component_parsers.json
{
  "button": {},
  "input": {},
  "select": {},
}
```
Codify 会将使用 `<>` 尖括号包裹的图层名称标记为一个前端组件，例如 `<button>` `<input>` `<select>`。此时，你在生成代码的时候会得到：

```html
<button></button>
<input />
<select></select>
<!-- 如果你在 特征设置 中设置了组件前缀将得到 -->
<el-button></el-button>
```
但是它并没有输出任何内容和属性。此时你需要通过 [渲染器选项](/guide/render-options) 来为组件添加它的渲染内容。

## 渲染器选项

通过 [渲染器选项](/guide/render-options) 可以为组件定制组件的解析方式。

<video controls autoplay loop muted src="/images/set-components.mp4" title="set components" style="border-radius: 12px;"></video>

```json
"button": {
  "props": {},
  "text": {
    "params": {
      "nodeName": "text"
    }
  },
  "type": {
    "params": {
      "valueFrom": "background"
    }
  },
  "disabled": {},
  "flex": {}
},
```

其它的组件配置方式与 `button` 配置方式类似。Codify 提供了一套演示组件和配置，你可以在 [资源社区](https://www.figma.com/community/file/1362976228899599536/codify-uikit) 中下载并演示。

## 使用样式解析器来解析多个图层
通常在组件制作时，我们会读取的多个图层的属性来作为组件的属性。例如：

```html
<Component title="Title text" subtitle="Description text" />
```
该组件需要读取一个文本层的内容来设置 `title`，并将另一文本层的内容设置为 `subtitle`。 
在这种情况下，你可以使用数组类型样式解析器来分别解析这两层。 这是一个例子：

![alt text](/public/images/multiple_parse.png)

:::warning
可能你会尝试下面的写法。但它是不能正常工作的，因为第二个text解析器会覆盖第一个text解析器。
:::
```json
// 错误示例
"Component": {
  "text": {
    "nodeName": "title",
    "textAttr": "title"
  },
  "text": {
    "nodeName": "content",
    "textAttr": "subtitle"
  }
}
```

正确的方法是使用数组

```json {5,9}
// 正确的示例
"Component": {
  "text": [
    {
      "nodeName": "title",
      "textAttr": "title"
    },
    {
      "nodeName": "content",
      "textAttr": "subtitle"
    }
  ]
}
```
你也可以在下面的配置中找到类似的使用示例

## 属性解析器 props

`props` 用于读取和解析设计文件中的组件属性。参考[设计组件制作规范](/guide/createing-components)

```json{2}
"props": {
  "filter": ["md", "default", "false"]
}
```
默认设置了3种过滤的属性，当你的设计组件实例使用了以上属性，它将不会被解析成代码。如果你不想过滤任何属性，请设置：

```json{2}
"props": {
  "filter": ""
}
```

### showTrueValue

- Type: `boolan`
- Default: `false`

是否显示 true 值。通常情况下，true 值会被忽略。例如：

```jsx
"props": {
  "showTrueValue": false // [!code highlight]
}
// 输出
<Button disabled />

"showTrueValue": true // [!code highlight]
// 输出
<Button disabled={true} />

```

## 遍历解析器 traverse

通常情况下，遍历解析器会在解析组件时检查组件解析程序提供的条件，然后决定是否继续渲染子节点。这样一来，你可以根据自己的需求来控制组件的解析结果。

```json
"traverse": {
  "filter": ""
  // 可以通过 filter 过滤选项来排除不用遍历的节点名称
}
```
如果你设置了特征库的 [ignore_prefixes](/guide/feature-setting#ignore-prefixes) ，系统将优先过滤配置里的节点名称。

## 类型解析器 type

`type` 用于获取组件的类型。使用了类型解析器时，Codify 会根据你设置的 [status_color](/guide/feature-setting#status-color) 颜色来输出对于的类型。例如：

```json{4}
"type": {
  "nodeName": "",
  "valueFrom": "background",
  "attrName": "type",
  "filter": "default"
}
```
当你选择了 `primary` 样式，此时会输出`<Button type="primary">Primary Button</Button>`，其它属性请参考[渲染器选项](/guide/render-options)

如果你希望将属性写入到其它名称，可以更改 `attrName` 属性的值。例如：`"attrName": "color"`, 此时会输出`<Button color="primary">Primary Button</Button>`

:::tip
`traverse` `attrs` 和 `type` 解析器是专门为组件解析器设计的。在阅读[组件解析器](/guide/component-parsers)文档时，你会经常遇到它们。
:::

## 多用途属性解析器 attr

`attr` 是一个多用途属性解析器，它支持 `background` `borderColor` `color` `radius` `borderStyle` `opacity` `gap` `padding` `boxShadow` 的样式解析

::: tip 它能做什么？
我们可以通过 attr 属性来获取节点的指定样式，从而给组件加上相应的属性，这可以帮助你大量的减少组件变体的制作。
:::

例如，当你希望给按钮输出一个 `outlined` 属性，你可以使用 mappings 来映射 `borderColor` 的样式:

```jsx{4-15}
"button": {
  "props": {},
  "flex": {},
  "attr": [
    {
      "valueFrom": "borderColor",
      "attrName": "variant",
      "mappings": {
        "primary": "outlined",
        "success": "outlined",
        "warning": "outlined",
        "danger": "outlined",
        "info": "outlined"
      }
    }
  ]
}
// output
<Button variant="outlined" color="error">
  Error
</Button>

```
#### 案例 2：

根据没填充背景色的按钮来输出 `text` 属性

```jsx {9-15}
"button": {
  "props": {},
  "flex": {},
  "attr": [
    {
      "valueFrom": "borderColor",
      // ......
    },
    {
      "valueFrom": "background",
      "attrName": "variant",
      "mappings": {
        "none": "text"
      }
    }
  ]
}
// 可以得到下面的结果
<Button variant="text">
  TEXT
</Button>

```

#### 案例 3：

根据Corner radius 来获得一个药丸形态的按钮

```jsx {13-19}
"button": {
  "props": {},
  "flex": {},
  "attr": [
    {
      "valueFrom": "borderColor",
      // ......
    },
    {
      "valueFrom": "background",
      // ......
    },
    {
      "valueFrom": "radius",
      "attrName": "shape",
      "mappings": {
        "9999px": "round"
      }
    }
  ]
}
// 可以得到下面的结果
<Button shape="round">
  Round Button
</Button>

```

## 图标解析器 icon

`icon` 用于解析的图标组件。你可以通过设置 [nodeName](/guide/render-options.html#nodename) 来获取指定的图标。例如我们为 `Button` 组件设置图标属性：

```jsx
"Button": {
  "props": {},
  "text": {
    "nodeName": "_text"
  },
  "flex": {},
  "icon": {
    "attrName": "icon",
    "nodeName": {
      "name": "icon",
      "deepFind": true
    }
  }
}

// 可以得到下面的结果
<Button type="primary" iconPosition="start" icon={<SearchOutlined />}>
  Search
</Button>
```

如果你希望单独解析图标，你可以在设计文件中，将图标放在名为 `@icons` 的容器下，即可自动解析为图标组件，并得到以下的结果：

```jsx
<SearchOutlined />
```

然而，这不需要你做任何设置。