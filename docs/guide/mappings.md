# 样式映射

Codify 插件可以将 Figma 的样式信息映射为 Class name。这样你在生成代码时，会生成对应的原子级样式。

例如非常热门的 CSS 框架 `Tailwind`，和你自定义的 Class 工具类。同时我们也极力推荐你的项目使用原子级 Class 来构建 UI界面。

::: details 为什么推荐使用原子级 Class 类来构建 UI 界面

原子级 Class 类的使用方法通常被称为原子化设计或功能类 CSS（Functional CSS）。其理念是将样式属性拆分为最小的单元，并为每个单元创建一个独立的 Class 类。这些 Class 类只包含一个特定的样式属性，比如 color-red、font-size-large 或 margin-top-20。它具有以下优点：

**灵活性：**

原子级 Class 类可以轻松地组合和重用，使得界面构建更加灵活。通过组合不同的 Class 类，可以快速创建各种不同的样式组合，而无需编写大量自定义样式。

**可维护：**

由于原子级 Class 类具有单一职责，它们更易于理解和维护。当需要修改样式时，只需针对具体的 Class 类进行修改，而不需要修改整个样式表。

**性能优化：**

原子级 Class 类通常生成较小的样式表，有助于减少页面加载时间。此外，由于只应用所需的样式属性，减少了不必要的样式计算，提高了渲染性能。

**一致性：**

原子级 Class 类遵循统一的命名规则，使开发人员能够更容易理解和预测样式行为。这有助于保持界面一致性，减少样式冲突和意外行为。

_以上来自 Chatgpt 的回答。_

> 当前没有一个更好的手段来生成语义化的 Class name。同时我们也不希望每个项目都让设计师去写元素的 Class name。所以当前大部分的 Design to Code 的工具都选择使用原子级 Class 类来构建界面。如果每次生成都产生新的 Class name，这会对代码的组织和项目的维护带来很大影响。
所以 Codify 在 1.0.0 版本时重构了样式的解析程序，让插件在解析设计稿样式的时候，先去检索它们是否有被映射到一个定义好的 Class name 上。同时我们也在继续探索更多的方式，来优化样式的生成。

:::

:::tip 小提示
阅读此文件时，建议你先打开 [mappings.json](https://codify.fun) 一边阅读一边尝试。
:::


## 格式说明

通过下面的文档来看，你可能很快的发现，这其实就是规范的 CSS 属性。我们为了解析设计稿的样式并将其转化为 CSS 属性。所以要按照 Codify 提供的格式来编写映射程序。

![alt text](/images/mapping-demo.png)

上面这段 Json 的 `key` 为 Figma 输出的属性。 `value` 映射后的 Class name。如果映射表里没有找到你设计稿的属性，则以 `style` 输出如：`style="width: 100px;"`。

Codify 已经将 Figma 等原型设计工具的提供的样式属性映射成了 CSS 属性，使其更加易读。所以，你无需去了解 Figma Api。仅需要按照本文档的格式去编写即可。甚至直接粘贴到 [mappings.json](https://codify.fun/) 中即可使用。


## 关于类名的前缀设置
类名可以在 样式解析程序 中通过 [渲染器选项](/guide/render-options.html#classprefix) 来统一设置前缀。如果在样式解析程序中设置了前缀，当前样式映射就不需要加上前缀了。例如：
```json {7,15,22}
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

以下的示例将以 `Tailwind` 为基础来配置样式映射。这并不代表你只能使用 Tailwind 的工具类。如果刚好你想配置一个 Tailwind 的工具类，你可以直接将下面的代码复制，然后添加到 [mappings.json](https://codify.fun/) 中。



## width

- key: `width 的值`

```json
"width": {
  "0": "0",
  "1": "px"
  //.....
}
```
## min-width

- key: `min-width 的值`

```json
"min-width": {
  "0": "0",
  "1": "px"
  //.....
}
```
## max-width

- key: `max-width 的值`

```json
"max-width": {
  "0": "0",
  "1": "px"
  //.....
}
```

## height

- key: `height 的值`

```json
"height": {
  "0": "0",
  "1": "px"
  //.....
}
```

## min-height

- key: `min-height 的值`

```json
"min-height": {
  "0": "0",
  "1": "px"
  //.....
}
```
## max-height

- key: `max-height 的值`

```json
"max-height": {
  "0": "0",
  "1": "px"
  //.....
}
```

## display

- key: `flex`

当前只支持将设计稿的 Auto layout 转化为 flex layout

```json
"display": {
  "flex": "flex"
}
```

## flex

- key: `none | auto | fill-x | fill-y | wrap`

| Figma 属性                | Codify 属性 |
| ------------------------- | ----------- |
| Fixed width               | none        |
| Hub contents              | auto        |
| Horizontal Fill container | fill-x      |
| Vertical Fill container   | fill-y      |
| Wrap                      | wrap        |

```json
"flex": {
  "none": "flex-none",
  "auto": "flex-auto",
  "fill-x": "flex-1",
  "fill-y": "self-stretch",
  "wrap": "flex-wrap"
}
```

## justify-content

- key: `flex-start | center | flex-end | space-between`

| Figma 属性       | Codify 属性   |
| ---------------- | ------------- |
| Align top left   | flex-start    |
| Align top center | center        |
| Align top right  | flex-end      |
| Auto             | space-between |

```json
"justify-content": {
  "flex-start": "start",
  "center": "center",
  "flex-end": "end",
  "space-between": "between"
}
```

## align-items

- key: `flex-start | center | flex-end`

| Figma 属性        | Codify 属性 |
| ----------------- | ----------- |
| Align top left    | flex-start  |
| Align left        | center      |
| Align bottom left | flex-end    |

```json
"align-items": {
  "flex-start": "start",
  "center": "center",
  "flex-end": "end"
}
```

:::tip
如果你的设计稿使用的是 `Align center` 属性， 解析工具会自动帮你写上 `justify-content` 和 `align-items` 中 `center` 所映射的样式名称。如：`class="justify-center items-center"`
:::

## flex-direction

- key: `row | column`

| Figma 属性        | Codify 属性 |
| ----------------- | ----------- |
| Vertical layout   | row         |
| Horizontal layout | column      |

```json
"flex-direction": {
  "row": "row",
  "column": "col"
}
```

## gap

- key: `数值`

| Figma 属性     | Codify 属性 |
| -------------- | ----------- |
| gap            | gap         |
| Vertical gap   | row-gap     |
| Horizontal gap | column-gap  |

```json
"gap": {
  "0": "0",
  "1": "px",
  "2": "0.5",
  "4": "1",
  "6": "1.5",
  "8": "2",
  "10": "2.5",
  "12": "3",
  "14": "3.5",
  "16": "4",
  "20": "5",
  "24": "6",
  "28": "7",
  "32": "8",
  "36": "9",
  "40": "10",
  // ......
}
```

这将根据 `gap` 样式解析程序的前缀来输出如：`gap-0` `gap-x-0` `gap-y-0` 这样的样式名，依次类推。

## font-family

字体样式是否能正常显示，取决于用户设备是否安装了相应的字体。如果没有，浏览器会尝试使用备用字体或默认字体来显示文本。因此，为了确保字体样式的一致性和准确性，建议在使用特定字体样式时，在 CSS 文件中提前设置并引入相对应的字体，然后通过 mappings 选项来映射。

- key: `字体名称`

#### 你的CSS文件

```scss
@font-face {
  font-family: "poppins";
  src: url("yourPath/poppins.ttc");
}
.font-poppins {
  font-family: "poppins";
}
```
#### 映射表配置

```json
"font-family": {
  "Poppins": "font-poppins"
},
```

如果你的文字图层使用了字体映射表里的字体的话，会输出如 `class="font-poppins"` 这样的样式。

:::tip
系统默认的字体族不用在此定义。并且你还可以在 [font-family 解析程序](/guide/style-parsers#fontfamily) 中设置过滤系统默认字体。因为在通常情况下，我们不需要给每个文字节点都声明 `font-family` 样式。
:::

## color

同 css 属性一样，`color` 属性在这里仅作为文本属性来使用。color 属性在这里仅用于定义文本样式。它用于映射你在 Figma 设计稿中定义的文字样式。下面是一个示例：

![vars and local styles](/images/vars-localstyles.png)

- key: `变量名称` 或 `样式名称`

```json
"color": {
  "text-regular": "regular",
  "text-secondary": "secondary",
  "text-light": "light",
  "text-lightest": "lightest",
  "text-title": "title",
  "text-link": "link",
  "text-hover": "hover",
  "text-active": "active",
  "text-inverse": "inverse"
}
```

这样做的好处是，设计稿的样式和前端开发的样式名哪怕不一致，也会被关联映射。例如设计师们通常喜欢这样命名：

```json
"color": {
  "neutral-100": "text-regular",
  "neutral-200": "text-secondary",
  "neutral-300": "text-light",
  "neutral-400": "text-lightest"
}
```

尽管在调色板使用这样的命名方式是可行的，但它在前端中并不符合语义化命名的原则。因此，你可以选择将它们映射到相应的语义化类名上。

::: warning
所以在本文的配置中，所有有关颜色的样式，都没有按照 Tailwind 默认提供的命名格式。同时 Tailwind 也提出了命名修改建议，你可以参考 [Tailwind CSS 官方文档](https://tailwindcss.com/docs/customizing-colors#naming-your-colors)。
:::

## heading

我们建议你在你的设计系统中定义 `heading` 样式，这样它能够精准的被标识是否使用 `h1 - h6` 标签。以保障生成的代码更加符合 W3C 规范。

![heading](/images/heading.png)

- key: `变量名称` 或 `样式名称`

```json
"heading": {
  "h1": "h1",
  "h2": "h2",
  "h3": "h3",
  "h4": "h4",
  "h5": "h5",
  "h6": "h6"
}
```

## font-size

根据文字的尺寸来映射 Class name

- key: `文本尺寸`

```json
"font-size": {
  "12": "xs",
  "14": "sm",
  "16": "base",
  "18": "lg",
  "20": "xl",
  "24": "2xl",
  "30": "3xl",
  "36": "4xl",
  "48": "5xl",
  "60": "6xl",
  "72": "7xl",
  "96": "8xl",
  "128": "9xl",
}
```

## font-weight

根据文本的重量来映射 Class name

- key: `文本重量`

```json
"font-weight": {
  "100": "thin",
  "200": "extralight",
  "300": "light",
  "400": "normal",
  "500": "medium",
  "600": "semibold",
  "700": "bold",
  "800": "extrabold",
  "900": "black"
}
```

## text-align

根据文本对其的方式来映射 Class name

- key: `left | center | right | justify`

| Figma 属性           | Codify 属性 |
| -------------------- | ----------- |
| Text align left      | left        |
| Text align center    | center      |
| Text align right     | right       |
| Text align justified | justify     |

```json
"text-align": {
  "left": "left",
  "center": "center",
  "right": "right",
  "justify": "justify"
}
```

## letter-spacing

letter-spacing 属性 可以映射设计稿的 Letter spacing 样式。需要注意的是，Figma 的 Letter spacing 样式可以输入 `px` 或 `%`。所以在编写映射配置时，也要加上对应的单位。

- key: `数值`

```json {8}
"letter-spacing": {
  "0": "normal",
  "-5%": "tighter",
  "-2.5%": "tight",
  "2.5%": "wide",
  "5%": "wider",
  "10%": "widest"
}
```

## line-height

line-height 属性，通 letter-spacing 属性一样。在 Figma 中可以输入 `px` 或 `%`。所以在编写映射配置时，也要加上对应的单位。

- key: `数值`

```json
"line-height": {
  "12px": "3",
  "16px": "4",
  "20px": "5",
  "24px": "6",
  "28px": "7",
  "32px": "8",
  "36px": "9",
  "40px": "10",
  "100%": "none",
  "125%": "tight",
  "137.5%": "snug",
  "150%": "normal",
  "162.5%": "relaxed",
  "200%": "loose"
},
```

## padding

padding 对应 figma 中的 padding 样式. 你可以在 padding 的[样式解析程序](/guide/style-parsers.html#padding)中设置它的前缀。

- direction key: `p | pt | pl | pr | pb | px | py`
- size key: `数值`

```json
"padding": {
  "0": "0",
  "2": "0.5",
  "4": "1",
  "6": "1.5",
  "8": "2",
  "10": "2.5",
  "12": "3",
  "14": "3.5",
  "16": "4",
  // ......
}
```
如果你将一个图层节点的 `padding top` 设置为 16px 的话，它将输出 `pt-4`。 或者 如果你将一个图层节点的 `padding bottom` 也设置为 16px 的话，它将输出 `py-4`。

## background

Background 属性，对应 Figma 中的 Fill 样式。它和 [color](#color) 属性一样，是用于映射你在 Figma 设计稿中自定义的填充样式。

- key: `变量名称` 或 `样式名称`

```json
"background": {
  "bg-body": "body",
  "bg-content": "content",
  "bg-light": "light",
  "bg-popup": "popup",
  "bg-element": "element",
  "bg-hover": "hover",
  "bg-active": "active",
  "bg-header": "header",
  "bg-transparent": "transparent"
}
```

我们非常清楚，文本的样式是写在 `color:` 属性上的，而背景颜色是写在 `background-color:` 属性上，这两个属性并不通用。 假如你在 Figma 中，将 color 的样式填充到某个 `Frame` 或者 `Shape` 节点的话，它将输出 `background-color: var(--text-primary)`。所以你应该为你的前端项目，提前准备好 `Css Variable`。Codify 插件也可以帮你一键将 Figma 的样式导出为 `Css Variable`。

## border-color
- color key: `样式名称`

```json
"border": {
  "border-regular": "regular",
  "border-light": "light",
  "border-dark": "dark",
  "border-deepdark": "deepdark",
  "border-transparent": "transparent"
}
```

## border-width
- key: `数值`

```json
"border-width": {
  "0": "0",
  "1": "1",
  "2": "2",
  "4": "4",
  "8": "8"
}
```

## border-style
- key: `solid | dashed | dotted`

```json
"border-style": {
  "solid": "border-solid",
  "dashed": "border-dashed",
  "dotted": "border-dotted"
}
```

如果你要输出一个只有顶部为 4px 虚线边框的样式。则会得到 `class="border-t-4 border-dashed border-regular"`

border color 的属性如同 background color 一样，你需要在 Figma 的样式中提前准备好。当前，如果没有映射对应的样式，则输出 style 属性。就像 [格式说明](#格式说明) 中提到的一样.

## radius

radius 属性，对应 Figma 中的 Corner radius 样式。
- key: `数值`

```json{12}
"radius": {
  "0": "none",
  "2": "sm",
  "4": "default", // 如果它是默认值，设置为 default
  "6": "md",
  "8": "lg",
  "12": "xl",
  "16": "2xl",
  "24": "3xl",
  "9999": "full"
}
```
如上面代表高亮所示，如果你希望像 taiwind 那样，仅输出一个 `rounded` 的样式，而不是 `rounded-default`。你可以将它映射到 `default` 上。这样一来，设计稿中如果选择了 4px 的边框，则会直接输出 `rounded`。


## opacity

Opacity 属性，对应 Figma Layer 中的 Opacity 样式。而不是颜色的透明度。

- key: `数值`

```json
"opacity": {
  "0": "0",
  "0.05": "5",
  "0.1": "10",
  "0.15": "15",
  "0.2": "20",
  "0.25": "25",
  "0.3": "30",
  "0.35": "35",
  "0.4": "40",
  "0.45": "45",
  "0.5": "50",
  "0.55": "55",
  "0.6": "60",
  "0.65": "65",
  "0.7": "70",
  "0.75": "75",
  "0.8": "80",
  "0.85": "85",
  "0.9": "90",
  "0.95": "95",
  "1": "100"
},
```

## box-shadow
Box shadow 同 [color](#color) 一样，它用于映射你在 Figma 设计稿中定义的阴影样式。

```json
"box-shadow": {
  "shadow-none": "none",
  "shadow-sm": "sm",
  "shadow": "default",
  "shadow-md": "md",
  "shadow-lg": "lg",
  "shadow-xl": "xl",
  "shadow-2xl": "2xl"
}
```

## position

Position 属性能够映射 Figma 中的 `Constraints` 样式，

![position](/images/position.png)

```json
"position": {
  "fixed": "fixed",
  "relative": "relative",
  "absolute": "absolute",
  "sticky": "sticky"
}
```

还能够根据你设计稿选择的值，来决定 `top`, `right`, `bottom`, `left` 4个属性。请参考 [样式解析程序](/guide/style-parsers#position)

## overflow

Overflow 用于映射 Figma 中的 `Clip content` 属性。当你的容器选择裁切超出的部分的时候，会被加上 `hidden` 所映射的 Class name。

```json
"overflow": {
  "hidden": "overflow-hidden"
}
```
