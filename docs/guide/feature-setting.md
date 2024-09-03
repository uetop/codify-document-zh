# 特征设置

Codify 在开始生成代码之前，会先解析特征库中的设置，以便生成符合用户预期的代码。

以下是一个完整的示例：

```json
{
  "playground_url": "http://your.playground_url.com",
  "component_prefix": "el-",
  "slot_prefix": "#",
  "ignore_prefixes": ["_", "$config"],
  "block_component": ["button", "input"],
  "ignore_component": ["step", "tab-pane", "timeline-item", "list-item"],
  "status_color": ["primary", "warning", "success", "danger", "info"]
}
```

本章节将逐个介绍这些属性的作用以及设置方法。

## playground_url

- Type: `string`

预览窗口是用于展示并运行你项目的前端代码。这需要你自己来开发这个页面。我们提供了详细的教程和代码示例。请查看 [预览窗口设置](/guide/playground-setting)。

```json
"playground_url": "http://your.playground_url.com",
```

## file_url

- Type: `string`

`file_url`属性用于设置当前配置所对应的设计文件的链接。这可以使团队成员快速导航到相关文件。 在 Codify 插件中，它是跳转到文件的便捷方式。例如：

```json
"file_url": "https://www.figma.com/community/file/1362976228899599536"
```

## component_prefix

- Type: `string`

Codify 会将使用`<>` 尖括号包裹的图层名称识别为一个前端组件。如果需要在组件名称前增加前缀，可以设置这个属性。

```json
// 图层名称: <button>
"component_prefix": "el-",
// 输出为：<el-button>
```

## slot_prefix

- Type: `string`

Codify 会将使用 `#` 开头的图层名称识别为一个插槽。这个属性对于使用 [Vue](https://vuejs.org/guide/components/slots#named-slots) 的前端项目来说尤为重要。

```json
"slot_prefix": "#",
// 图层名称: #header
// 输出为：<template #header>
```

下面是一个实际案例：

![slot](/images/slot-view.png)

## ignore_prefixes

- Type: `string | array`

忽略掉一些前缀，让这些带有特定前缀的图层不被 Codify 默认识别。

```json
"ignore_prefixes": ["_", "$config"],

// _name  $config_name
```

如果你将一个图层命名为 `_title` ，这样会阻止 Codify 的 [遍历解析器](/guide/style-parsers#遍历解析器-traverse) 来解析这个图层，如果你的组件属性也使用了忽略前缀，也会被 Codify 忽略。

> 注意：$config 是codify系统保留的关键词。它被用作自定义属性的图层前缀。

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

## block_component

- Type: `string | array` 

通过 `block_component` 来声明哪些是块级组件。这样在为组件设置 `Fill container` 时，就可以为当前组件加上 block 属性。这样就能得到更加规范的代码了。

```html
"block_component": ["button", "input"],

<button type="primary" block>button</button>
<input value="input" block />
```

<video width="100%" loop autoplay style="border-radius: 12px;"> 
  <source src="/images/block.mp4" type="video/mp4"> 
</video>

## ignore_component

- Type: `string | array` 

如果你想忽略一些组件，你可以在配置中添加 `ignore_component`。它将不会被 Codify 解析。

```json
"ignore_component": ["step", "tab-pane", "timeline-item", "list-item"],
```

通常情况下，一些组件由父组件和子组件组成。子组件通常无法独立运行。因此，当你选择的一级节点是一个子组件，你可以通过 `ignore_component` 让 Codify 忽略它们。

## status_color

- Type: `string | array`

如果你的设计系统有状态色，你可以通过 `status_color` 来标识出来。这样在某些组件选中这个颜色的时候，会将它的属性正确的放到它的类型属性中，而不是放在 class 里。

```json
"status_color": ["primary", "warning", "success", "danger", "info"]

// 输出为：
// <button type="primary">button</button>
// 而不是：
// <button class="primary">button</button>
```
或许你的状态类型名称不是 `type`，你可以在 [组件解析](/guide/component-parsers) 中定义。

下面是一个案例：

```json {5,15}
// Material ui case
{
  "button": {
    "type": {
      "attrName": "color",
    }
  }
}
// <Button variant="contained" color="primary">Primary</Button>

// Element plus or Ant design case
{
  "button": {
    "type": {
      "attrName": "type",
    }
  }
}
// <el-button type="primary">Primary</el-button>
// <Button type="primary">Primary</Button>
```
