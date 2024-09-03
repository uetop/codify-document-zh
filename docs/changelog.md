# Changelog

## v1.0.12
- 增加： 图标解析器, [`icon`](./guide/component-parsers.html#图标解析器-icon)


## v1.0.11
- 增加： `forcedOutput` 渲染器选项, 它仅适用于 [width](./guide/style-parsers.html#width) 和 [height](./guide/style-parsers.html#height) 解析程序
- 增加： 多用途属性解析器, [`attr`](./guide/component-parsers.html#多用途属性解析器-attr)

## v1.0.10
- 改进：重构 CSS 导出程序
- 改进：生成SVG图形时，检查是否为绝对位置，并添加div标签设置绝对定位属性。

## v1.0.9
- 修复：解析 React 的属性

## v1.0.8
- 修复：jsx 解析 img 标签时出现意外错误
- 改进：禁用属性的解析，现在你可以自定义它

## v1.0.7
- 改进：如果文本的父节点具有相同的 CSS 值，则它将不会包含在输出样式中。

## v1.0.6
- 添加： Grid 网格布局解析

## v1.0.5
- 改进：每次运行Codify时都会读取你之前选择的代码语法
- 改进：访客账户也可以解析 Tailwind 代码

## v1.0.4
- 添加：为 Tailwind 添加了任意值

## v1.0.3

- 移除：特征设置的 全局字体 设置，使用 [font-family](/guide/style-parsers#font-family) 样式解析程序来代替。
- 添加： [min-width | max-width](/guide/style-parsers#win-width) 样式解析程序

## v1.0.2

- 增加：预览窗口设置
- 修复：自定义属性读取的一些错误

## v1.0.1

- 增加： Type 属性解析程序 [类型解析器 type](/guide/style-parsers#类型解析器-type)

## v1.0.0

重构 Codify 插件。使原本的单框架支持升级为多框架支持。版本号从 v1.0.0 开始