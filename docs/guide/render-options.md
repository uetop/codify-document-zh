# 渲染器选项

Render Options 是一个渲染钩子，它在 [样式解析程序](/guide/style-parsers) 解析图层样式时发挥作用。它可以帮助你将图层信息渲染为符合你预期的代码形式。


#### 一个标准的渲染器选项示例

```json
"padding": {
  "nodeName": "",
  "filter": ["0","padding-none"],
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": {
    "padding": "p-",
    "padding-top": "pt-",
    "padding-left": "pl-",
    "padding-right": "pr-",
    "padding-bottom": "pb-",
    "padding-x": "px-",
    "padding-y": "py-"
  },
  "stylePrefix": "",
  "getCssVar": false,
  "mappings": {
    "0": "none",
    "4": "sm",
    "8": "md",
    "12": "lg"
  }
}
```

## nodeName

- Type: `string`
- Default: `Currently selected node`

以当前选择的节点为起点，在其子节点中查找名为 `{nodeName}` 的节点。如果 nodeName 为空，则选择当前节点。因此，节点名称应尽可能保持唯一性。以下是一个示例：

```json
"text": {
  "nodeName": "_title" // 这里的 `_title` 指 Figma 的图层名称
}
```

:::tip
在查找节点时，会从当前节点开始，但如果遇到一个 实例节点，则会终止当前的查找程序。所以你要继续深度查询的话，需要使用 `deepFind` 的 Api，如下所示：
:::

### deepFind

- Type: `boolan`

深度查找可以帮助你无限向下查询 `nodeName`，实例也不例外。需要注意的是，这种查找方式会稍微增加渲染时间。并且需要注意重名的问题。

```json
"text": {
  "nodeName": {
    "name": "_title",
    "deepFind": true
  }
}
```

## filter

- Type: `string` | `string[]`

filter 选项，可以根据你的需求来过滤输出的样式。如果你需要同时过滤多个值，可以使用数组来列举你要过滤的内容。
大小写不敏感。
```json
"font-size": {
  "filter": "12" 
}
// 像素值不用写px
// or
"font-size": {
  "filter": ["12", "text-xs", "var(--text-xs)"]
}
```
> 在 [mappings](#mappings) 选项中，可以将Figma的样式名称映射为 class 名称，例如：`text-xs` 

<!-- ## filterInComponent <Badge type="tip" text="v1.0.11" />

- Type: `string` | `string[]`

filterInComponent 选项，可以禁止样式解析程序在组件中发挥作用。

我们在 figma 的画布里，制作一个 'primary' 状态的按钮(通常是蓝色的)。然后按钮的文本节点和图标节点通常要用 白色来填充。但是icon组件的样式解析程序会解析它的 background填充色，导致产生没必要的填充，例如`color="#FFFFFF"`

```html
<Button icon-position="left" type="primary">
  Pill Button
  <el-icon color="#FFFFFF"><SystemImage /></el-icon> // [!code highlight]
</Button>
```

这显然是不符合预期的结果。为了让样式解析更加可控，所以 `filterInComponent` 渲染器选项可以禁止样式解析程序在特定组件中发挥作用。我们可以这样设置：

```json {6-9}
// component_parsers.json
"icon": {
  "props": {},
  "iconName": {},
  "height": {
    "filterInComponent": [
      "button",
      "input"
    ]
  },
  "background": {
    "classAttr": "color",
    "styleAttr": "color",
    "filterInComponent": [
      "button", // 你的组件名称
      "input"
    ]
  }
}
``` -->


## classAttr

- Type: `string`
- Default: `class`

解析程序在渲染图层样式时，会根据 classAttr 渲染选项的设置，将样式输出到指定的属性里。类似：`className="bg-hover"`。

```json
"background": {
  "classAttr": "class" 
}
// output class="bg-hover"

"background": {
  "classAttr": "className"
}
// output className="bg-hover"
```


## styleAttr

- Type: `string`
- Default: `string`

解析程序在渲染图层样式时，会根据 styleAttr 渲染选项的设置，将样式输出到指定的属性里。类似：`panel-style="background-color: #000"`。

```json
"background": {
  "styleAttr": "style" 
}
// output style="background-color: #000"

"background": {
  "styleAttr": "panel-style"
}
// output panel-style="background-color: #000"
```

## classPrefix

- Type: `string`

在样式映射时，可以通过前缀名称来增加前缀。这样的功能在某些场景下非常有用。请继续阅读下面的示例：

```json{7,15,22}
// style-parsers
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

// mappings
"justify-content": {
  "flex-start": "start",
  "center": "center",
  "flex-end": "end",
  "space-between": "between"
}

// 输出为
justify-start
```

classPrefix 还支持对象格式，这样可以为某些有多个方向特性的属性分别设置前缀

```json{7-15}
// style-parsers
"padding": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": {
    "padding": "p-",
    "padding-top": "pt-",
    "padding-left": "pl-",
    "padding-right": "pr-",
    "padding-bottom": "pb-",
    "padding-x": "px-",
    "padding-y": "py-"
  },
  "stylePrefix": "padding",
  "getCssVar": false,
  "getDirection": "",
  "mappings": {}
}
```

## stylePrefix

- Type: `string`

style 前缀在严格意义上来说它应该名为 Css Property Name。为了方便记忆，我们还是决定同 classPrefix 一样也用前缀来命名。下面我们来看它的使用案例：

```json
"background": {
  "stylePrefix": "background-color",
}
// 输出 style="background-color: #000000"

"color": {
  "stylePrefix": "--bg"
}
// 输出 style="--bg: #000000"

"color": {
  "stylePrefix": ""
}
// 输出 style="#000000"

```

由此可见，stylePrefix 选项可以根据你的需要，配置出完全符合你预期的代码。

## textAttr

- Type: `string`

文本属性用于将纯文本内容输入到指定的属性名内。

```json
"textAttr": "value",
// 输出 value="text"
```

:::warning
它仅在 text 样式解析程序中起作用
:::

## getCssVar

- Type: `boolan`
- Default: `false`

如果你希望将映射的样式以 var 样式输出。可以使用 getCssVar 选项。

```json{3,14}
// 例如选中的节点填充为 `primary` 的样式
"background": {
  "getCssVar": true,
  "mappings": {
    "primary": "bg-primary",
    "danger": "bg-danger",
    "warning": "bg-warning"
  }
}
// 输出 background-color: var(--bg-primary)

// 如果你不需要 background-color 属性名称，并且将 var 值放到特定的属性中：
"background": {
  "styleAttr": "color",
  "stylePrefix": "",
  "getCssVar": true,
  "mappings": {
    "primary": "bg-primary",
    "danger": "bg-danger",
    "warning": "bg-warning"
  }
}
// 输出 color="var(--bg-primary)
```
:::tip
前提是需要在你的项目中提前预设好 `Css Variable` 样式，才能够被正确引用。Codify 插件也可以帮你一键将 Figma 的样式导出为 `Css Variable`
:::

## valueFrom

- Type: `border` | `background` | `color` 

获取图层的某个特定属性的值，例如 

在[type](./style-parsers.md/#类型解析器-type) 样式解析程序我们可以这样配置：

```json
// 我们需要获取图层的 border 颜色
"type": {
  "valueFrom": "border"
}
// 如果图层的 Stoke 为 "primary" 
type="primary" // [!code highlight]
```

在 [disabled](./style-parsers.md/#) 样式解析程序我们可以这样配置：

```json
// 我们需要获取图层的 border 颜色
"disabled": {
  "valueFrom": "background",
  "mappings": {
    "bg-disabled": "true"
  }
}
// 如果你当前图层填充了 "bg-disabled" 这个样式，则会输出
disabled="true" // [!code highlight]

// 如果你希望像大多数前端框架那样直接输出 dieabled 属性，而不需要 “true” 这个值的话，你可以：
"mappings": {
  "bg-disabled": "" // [!code highlight]
}
```
::: tip
`valueFrom` 仅支持 `type`, `disabled` 和 `attr` 这3个样式解析程序，其它的并没有实际的使用场景。
:::

## mappings

- Type: `string` | `object`
- Default: default hooks configuration

如果你不希望某个解析程序使用全局的[样式映射表](/guide/mappings)，你可以在解析程序中使用 `mappings` 单独定义映射。例如：

``` json{9-19}
"color": {
  "nodeName": "",
  "filter": "",
  "classAttr": "style", // 这里需要将classAttr 改为 style
  "styleAttr": "style",
  "classPrefix": "",
  "stylePrefix": "--title-color", // 自定义 CSS 属性名称
  "getCssVar": false,
  "mappings": {
    "text-regular": "var(--regular)",
    "text-secondary": "var(--secondary)",
    "text-light": "var(--light)",
    "text-lightest": "var(--lightest)",
    "text-title": "var(--title)",
    "text-link": "var(--link)",
    "text-hover": "var(--hover)",
    "text-active": "var(--active)",
    "text-inverse": "var(--inverse)"
  }
}

//输出
<span style="--title-color: var(--regular)">text</span>

```

需要注意的是这些被映射的Class name 在你的项目中应该已经预制了这些样式信息。如果你的项目样式使用 Tailwind 构建就更加方便。同时 Codify 也提供了 CSS Utils 生成。

## showUnit
- Type: `boolan`
- Default: `true`

如果你不需要输出单位值，可以使用此选项，例如：
```json{6,8,9}
// style-parsers
"width": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "w-",
  "stylePrefix": "width",
  "showUnit": true,
  "getCssVar": false,
  "getArbitraryVar": true,
  "mappings": {}
}
// 上面的配置则会输出
style="100px"

// 设置
"styleAttr": "width",
// 输出
width="width: 100px"

// 设置
"stylePrefix": "",
// 输出
width="100px"

// 设置
"showUnit": false,
// 输出
width="100"
```

这将得到你想要的代码格式。

## getArbitraryVar

- Type: `boolan`
- Default: `false`

这是一个仅适用于 `Tailwind` 的渲染器选项，用于解析任意值 [Arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#arbitrary-variants)的格式。

``` json{7,10}
// style-parsers
"width": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "w-",
  "stylePrefix": "width",
  "getCssVar": false,
  "getArbitraryVar": true,
  "mappings": {}
}

//输出
class="w-[100px]"

```

## forcedOutput

- Type: `boolan`
- Default: `false`

当您为 [height](/guide/style-parsers.html#height) 或 [width](/guide/style-parsers.html#width) 解析器设置 `forcedOutput` 选项时，它将始终输出高度或宽度样式，无论图层是否具有 `适应` 或 `充满` 属性。

``` json
// style-parsers
"width": {
  "forcedOutput": true
}

//输出
style="width: 100px"

```

## childComponent

- Type: `boolan`
- Default: `false`

是否以子组件的模式渲染。

```json
"icon": {
  "nodeName": {
    "name": "icon",
  },
  "childComponent": true
}
```

## getComponentName

- Type: `boolan`
- Default: `false`

是否仅输出组件的名称，而不是组件的代码。例如我们解析一个 React 的图标组件：

```jsx
"Icon": {
  "icon": {
    "nodeName": {
      "name": "icons",
      "deepFind": true
    },
    "attrName": "component",
    "getComponentName": false // [!code highlight]
  }
}

<Icon component={<SmileOutlined />} />


"getComponentName": true // [!code highlight]

<Icon component={SmileOutlined} />

```


