# 快速开始

在本文中，我们会以 Figma 为例来演示如何使用 Codify。

## 启动 Codify 插件
先登录 Figma，点击顶部的 `Resources` 或者 `Shift + I` 打开插件窗口，搜索 Codify 插件，点击 `Run` 即可。

## 注册 Codify 账户

![注册界面截图](/images/page-signin.png)

::: details 为什么要注册 Codify 账户？
你可以在 Codify 账户上配置你的项目映射文件和解析程序，然后通过 Codify 插件来使用这些配置。同时，你还可以创建协作团队，让团队成员共享你的映射文件和解析程序。然而这一切都需要一套账户体系来完成。更加关键的是，你的 Codify 账户可以在多个平台上使用。
:::

## 创建团队

无论是否为订阅用户，你都可以不受数量限制地创建团队，并邀请成员加入你的团队。

![创建团队界面](/images/create-team.png)

## 解析和映射

Codify 后台提供了4个配置文件的代码编辑工具。你可以根据你的需求来决定编写哪种配置，它们都是json格式的。

![配置文件界面](/images/config-view.png)

1. [feature.json](/guide/feature-setting)
2. [mappings.json](/guide/mappings)
3. [style_parsers.json](/guide/style-parsers)
4. [component_parsers.json](/guide/component-parsers)

如果你是一名设计师，我们建议邀请你团队的 `前端开发者` 来编写配置文件，从而获得他们需要的代码格式。如果你是一名开发者，请继续阅读下面的 [配置文件编写指南](#编写配置文件) 。


## 编写配置文件

了解你的要求并根据这些要求创建配置文件，这可以帮助你节省时间。

![flow chart](/images/flow-chart.png)

- 只生成 HTML 代码和内联样式：无需编写任何配置，直接[在 Figma 中使用](#在-figma-中使用)
- 配置整体代码特征：[特征设置](#特征设置-feature)
- 自定义 class 类名： [样式映射](#样式映射-mappings)
- 从设计稿自定义解析某些样式：[样式解析程序](#样式解析程序-style-parsers)
- 将设计组件映射为前端组件：[组件解析程序](#组件解析程序-component-parsers)


### 特征设置 feature

你可以先粘贴这些内容到对应的文件中，以便你快速开始。详细的说明请参考 左侧菜单的 `配置` 分类里的内容。

``` json
{
  "playground_url": "http://your.playground_url.com",
  "component_prefix": "",
  "ignore_prefixes": [
    "$config"
  ]
}
```
特征库用于定义项目特征，如预览界面、组件前缀、忽略前缀等。
<!-- 
`playground_url` 是你自定义的代码预览界面。它用于执行并且预览你的项目编码。而不是由 Codify 插件来运行。如果你不需要预览，你可以删除它。并且 Codify 插件会自动生成一个预览截图，以方便你了解当前生成的代码块是什么内容。 -->


### 样式映射 Mappings
将 Figma API 输出的样式映射到 Class name。如下：
``` json
{
  // "css属性": {
  //   "读取设计稿的样式": "输出你要的 Class name",
  // },

  "display": {
    "flex": "flex",
  },
  "justify-content": {
    "flex-start": "items-left",
    "center": "items-center",
    "flex-end": "items-right",
    "space-between": "items-between"
  },
  "align-items": {
    "flex-start": "items-top",
    "center": "items-middle",
    "flex-end": "items-bottom"
  }
}
```


### 样式解析程序 Style parsers
由于受到 Figma 提供的 API 限制，Codify 默认支持以下样式解析。不过这些样式已经足够生成一个完整的布局代码了。

``` json
{
  width: {},
  height: {},
  display: {},
  flex: {},
  justifyContent: {},
  alignItems: {},
  direction: {},
  gap: {},
  text: {},
  color: {},
  fontSize: {},
  fontFamily: {},
  textAlign: {},
  fontWeight: {},
  lineHeight: {},
  letterSpacing: {},
  padding: {},
  background: {},
  borderStyle: {},
  borderColor: {},
  borderWidth: {},
  radius: {},
  opacity: {},
  boxshadow: {},
  position: {}
}
```


### 组件解析程序 Component parsers
以下的配置演示了如何输出一个前端组件的代码。
``` json
{
  "button": {
    "props": {},
    "type": {
      "valueFrom": "background"
    },
    "text": {
      "nodeName": "_text"
    },
    "disabled": {},
    "flex": {},
    "traverse": {}
  }
}
```

具体的配置方式请参考 [组件解析程序](/guide/component-parsers)。


## 在 Figma 中使用
![使用](/images/codify-main-plugin.png)

现在开始，你可以在 Figma 或 MasterGo中使用 Codify 来生成高保真代码了。