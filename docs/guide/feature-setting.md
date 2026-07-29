# 特征设置

Codify 在开始生成代码之前，会先解析特征配置中的设置，以便生成符合用户预期的代码。

以下是一个完整的示例：

```json
{
  "playground_url": "http://your.playground_url.com",
  "framework_type": "vue",
  "enable_ignore_node": true,
  "enable_skip_node": true,
  "enable_ignore_style": true,
  "enable_ignore_name": true,
  "enable_slot_render": true,
  "enable_token_render": true,
  "enable_export_setting_to_image": false,
  "enable_instance_realname": true,
  "enable_aggregate_styles": true,
  "resource_path": {
    "svg": "./svg/",
    "image": "./image/"
  },
  "component_prefix": "el-",
  "auto_layout_tag": "div",
  "slot_prefix": "#",
  "ignore_prefixes": ["_"],
  "skip_prefixes": ["#skip"],
  "icon_prefix": [
    "@"
  ],
  "ignore_component": [],
  "unit_conversion": {
    "unit_type": "px",
    "root_font_size": "14",
    "dpi": "96"
  },
  "color_format": "hex",
  "svg_optimizing": {
    "remove_useless_defs": true,
    "remove_unneeded_groups": true
  }
}
```

本章节将逐个介绍这些属性的作用以及设置方法。

## playground_url

- Type: `string`

预览窗口是用于展示并运行你项目的前端代码。这需要你自己来开发这个页面。我们提供了详细的教程和代码示例。请查看 [预览窗口设置](/guide/playground-setting)。

```json
"playground_url": "http://your.playground_url.com",
```


## enable_ignore_node

- Type: `boolean`
- Default: `false`

当你为某个图层设置 [忽略解析](#) 属性时，Codify 将忽略该图层及其子图层。你可以使用此开关设置此规则是否生效。


```json
"enable_ignore_node": true,
```

## enable_skip_node

- Type: `boolean`
- Default: `false`

当你为图层设置了 [跳过解析](#) 的属性后，Codify 会跳过它并解析它的子级图层。你可以使用此开关设置该规则是否生效。

```json
"enable_skip_node": true,
```

## enable_ignore_style

- Type: `boolean`
- Default: `false`

当你为某个图层设置 [忽略样式](#) 属性时，Codify 将忽略该图层的样式。你可以使用此开关设置此规则是否生效。

```json
"enable_ignore_style": true,
```

## enable_ignore_name

- Type: `boolean`
- Default: `false`

当你为某个图层设置 [忽略名称](#) 属性时，Codify 将忽略解析该名称为前缀的图层。你可以使用此开关设置该规则是否生效。

```json
"enable_ignore_name": true,
```

## enable_slot_render

- Type: `boolean`
- Default: `false`

当你为某个图层设置 [插槽渲染](#) 属性时，Codify 将解析该图层时将其渲染为插槽。你可以使用此开关设置该规则是否生效。

```json
"enable_slot_render": true,
```

## enable_token_render

- Type: `boolean`
- Default: `false`

当你为某个图层使用了 [变量](#) 样式时，Codify 在解析该图层的样式时，会直接以 `css var` 的形式渲染。你可以使用此开关设置该规则是否生效。


```json
// 样式的代码语法: bg-body , 颜色为: #f4f4f4
"enable_token_render": true,
// 输出为：<div style="background-color: var(--bg-body)"></div>

"enable_token_render": false,
// 输出为：<div style="background-color: #f4f4f4"></div>

```

## enable_export_setting_to_image

- Type: `boolean`
- Default: `false`

当你启动此属性时，Codify 在解析过程中会将你添加了导出设置的图层，以图片格式导出。

```json
"enable_export_setting_to_image": true,
```

## enable_instance_realname

- Type: `boolean`
- Default: `true`

当你启动此属性时，无论你的组件实例改成了什么名称，Codify 都能够识别它的真实名称。

```json
"enable_instance_realname": true,
```


## enable_aggregate_styles

- Type: `boolean`
- Default: `true`

启用聚合样式后，所有内联样式都会合并到 class 中。缺点是无法指定语义化的类名，而且它比原子类要大得多。

```json
"enable_aggregate_styles": true,
```

## resource_path <Badge type="warning" text="1.0.5" />

- Type: `boolean` | `object`
- Default: `false`
- svg: `string`
- image: `string`

当你为 `svg`、`image`、`shape` 这三个属性设置了路径时，Codify 在解析过程中会将它们提取出来，作为一个单独的文件。

```json
"resource_path": {
  "svg": "svg/",
  "image": "image/"
},
```
只有设置了路径才能够启动 AI Generate 功能。以节省 AI 模型的 Token 资源。

::: details 为什么需要？
**冗长的路径数据：**

路径数据通常非常长且密集，由大量的坐标点和命令组成。对人类来说是不可读的“乱码”，但对模型来说，每一个字符、逗号、小数点都是一个需要处理的Token。


**低信息密度：**

从 “理解代码逻辑” 的角度看，一大段SVG路径数据所承载的有效信息量很低。它只是描述了具体的像素点位置，而不是程序的逻辑、算法或架构。


**总结**

使用 `resource_path` 将资源渲染为路径，本质上是一种信息提纯。是帮助AI聚焦于问题的核心（代码逻辑），同时为自己节省宝贵的Token资源（金钱和时间），这是一种高效且经济的做法。
:::

同时推荐你使用 [图标解析器](/guide/component-parsers.html#图标解析-icon) 来将图标渲染为一个组件。



## component_prefix

- Type: `string`

我们可以在 [DSM] 为组件设置别名。这样在识别组件时会使用别名来替代组件名称。

Codify 还会将使用 `<>` 尖括号包裹的图层名称识别为一个前端组件。如果需要在组件名称前增加前缀，可以设置这个属性。


```json
// 图层名称: <button> 或 别名: button
"component_prefix": "el-",
// 输出为：<el-button>
```

## slot_prefix

- Type: `string`

如果你为容器名称设置了 `#` 号为前缀的名称，如`#header`，即可渲染成一个 [插槽](/guide/component-parsers.html#插槽) 标签。这个属性对于当前热门的前端框架项目来说尤为重要。
当然，你可以自定义它的前缀：

```json
"slot_prefix": "#",
```
### Vue
```vue
<template #header>
  <div>content</div>
</template>
```
### React
```vue
<component header={
  <div>content</div>
}>
```

::: warning
但要注意的是，Codify 不会解析插槽的样式。如果你的设计稿中的插槽带了一些布局样式。我们建议你对他进行手动调整，以保持与前端组件的视觉效果一致。
:::

## icon_prefix

- Type: `string | array`

你可以为图标图层设置一个前缀，这样在解析时就会将该图层解析为一个图标组件。

```json
"icon_prefix": [
  "@"
],

// 图层名称: @edit
// 输出为：<edit />
```

## ignore_prefixes

- Type: `string | array`

忽略掉一些前缀，让这些带有特定前缀的图层不被 Codify 默认识别。


```json
"ignore_prefixes": ["_"],

// _name
```

如果你将一个图层的属性设置为 [忽略]()， 这样会阻止 Codify 的 [遍历解析器](/guide/style-parsers#遍历解析器-traverse) 来解析这个图层。

你也可以将图层命名为 `_` 开头的名称，如： `_title` 来达到相同的效果

如果你的组件属性也使用了忽略前缀，也会在解析时忽略掉这个属性


### 为什么要忽略图层？

以常用的前端组件为例。有些内容是写在标签上的，例如：

```html
<input value="please enter" type="text">
<el-input placehoder="please enter">

<!-- 如果不忽略 本文节点，可能会解析为 -->
<input value="" type="text">please enter</input>
<el-input placehoder="">please enter</el-input>

```

这显然是不符合预期的，所以我们要忽略这个节点。然后通过组件解析的方式将它的文本内容写入到标签中。详情请查看 [组件解析](/guide/component-parsers)


## skip_prefixes

- Type: `string | array`

我们可以为图层设置跳过解析属性，这样在解析时就会跳过这个图层，直接解析子集节点内容。

同时你也可以为将属性写到图层的名称上，如： `#skip` 来达到相同的效果。

```json
"skip_prefixes": ["#skip"],

//图层名称: #skip_title
```

## ignore_component

- Type: `string | array` 

如果你想忽略一些组件，你可以在配置中添加 `ignore_component`。它将不会被解析。

```json
"ignore_component": ["step", "tab-pane", "timeline-item", "list-item"],
```

通常情况下，一些组件由父组件和子组件组成。子组件通常无法独立运行。因此，当你选择的一级节点是一个子组件，你可以通过 `ignore_component` 忽略它们。


## framework_type

- Type: `string`
- Default: `html`
- 可选值: `react` | `vue` | `vue2` | `angular` | `html` | `wxml` | `json`

你可以提前为你当前的配置预设前端框架的类型，例如 `react` 或者 `vue`，这样在解析时会默认生成对应的代码。

::: warning
注意：如果你的设计组件中使用了 `vue` 或者 `angular` 等框架的特殊语法，你需要提前为你的配置设置 `framework_type`。否则，Codify 会默认将其解析为 `html` 代码。
:::


```json
{
  "framework_type": "react"
}
```

当前支持的框架类型：`react`, `vue`, `angular`, `html`, `wxml`,`json`。

## auto_layout_tag

- Type: `string`
- Default: `div`


你可以为具有自动布局的 `div` 标签重新命名，例如 `Space`

```json
{
  "auto_layout_tag": "Space"
}

// 之前：
// <div>content</div>

// 之后：
// <Space>content</Space>
```

## unit_conversion

- Type: `object`
- Default: `false`
- unit_type: `px` | `rem` | `pt` | `mm` | `cm` | `rpx`
- root_font_size: `number` | `string`
- dpi: `number` | `string`
- scaling: `number`

单位转换。你可以为一些单位设置转换规则，例如 `px` 转换为 `rem`。

```json
{
  "unit_conversion": {
    "unit_type": "px", // 单位类型
    "root_font_size": "14", // 根字体大小
    "dpi": "96" // dpi
  }
}
```

如果你只需要缩放尺寸，而不需要将 `px` 转换为其它单位，你可以做如下设置：
```json
{
  "unit_conversion": {
    "unit_type": "px", // 单位类型
    "scaling": 2, // 缩放倍数
  }
}
```

## color_format

- Type: `string`
- Default: `false`
- 可选值: `hex` | `rgb` | `rgba` | `hsl` | `oklch`

颜色格式。你可以为颜色设置转换规则，例如 `hex` 转换为 `rgb`。

```json
{
  "color_format": "rgb"
}
```

## svg_optimizing

- Type: `boolean` ｜ `object`
- Default: `false`

是否开启 svg 优化。开启后会对svg代码进行压缩，会略微降低代码生成的速度。

```json