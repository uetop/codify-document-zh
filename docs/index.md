---
layout: home

hero:
  name: Codify
  text: 将你的设计稿以代码的形式交付
  tagline: Codify 是一个优秀的代码生成插件，它允许自定义样式和组件映射并且支持团队协作。
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/intro
    - theme: alt
      text: 安装 Codify 插件
      link: /guide/install

features:
  - icon: 🖥️
    title: 多框架
    details: 可以将设计稿一键生成 HTML、Vue、React 和适用于低代码平台的代码格式

  - icon: 🚀
    title: 低修改
    details: 可以将设计稿的样式、组件映射为CSS工具类和前端组件。生成的代码粘贴到项目即可使用。

  - icon: 🏅
    title: 高品质
    details: 使用工具类构建样式，减少冗余代码。通过对插件的配置可以完全自定义代码生成规则。
  - icon: 🤝
    title: 可协同
    details: 支持团队协作，你的代码生成配置可以共享给团队的成员使用。以便同你生成一致的前端代码。
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.name {
  margin-bottom: 24px;
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
