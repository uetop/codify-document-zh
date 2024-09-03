const base = '/codify-document-zh/'
export default {
  base,
  lang: 'en-US',
  title: 'Codify',
  description: 'Deliver your design draft as code',
  lastUpdated: true,
  ignoreDeadLinks: true,
  themeConfig: {
    logo: { src: '/images/logo.svg', width: 24, height: 24 },
    search: {
      provider: 'local',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '更新日志', link: '/changelog' },
      { text: '开发指南', link: '/guide/intro' },
      { text: 'Codify', link: 'https://codify.fun' },

      {
        text: '多语言',
        items: [
          { text: 'en', link: 'https://uetop.github.io/codify-document' },
          { text: '中文', link: 'https://uetop.github.io/codify-document-zh' },
        ],
      },
      // ...
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '什么是 Codify', link: '/guide/intro' },
          // ...
        ],
      },
      {
        text: '开始使用',
        items: [
          { text: '安装', link: '/guide/install' },
          { text: '快速上手', link: '/guide/getting-started' },
          { text: '预览窗口设置', link: '/guide/playground-setting' },
          { text: '自定义属性', link: '/guide/custom-properties' },
          // ...
        ],
      },
      {
        text: '配置',
        items: [
          { text: '特征设置', link: '/guide/feature-setting' },
          { text: '样式映射', link: '/guide/mappings' },
          { text: '样式解析程序', link: '/guide/style-parsers' },
          { text: '渲染器选项', link: '/guide/render-options' },
          { text: '组件解析程序', link: '/guide/component-parsers' },
        ],
      },
      {
        text: '帮助',
        items: [
          { text: '常见问题', link: '/guide/faq' },
          { text: '组件制作', link: '/guide/createing-components' },
          { text: '设计稿优化', link: '/guide/design-draft-adjustment' },
          // ...
        ],
      },
      {
        text: '资源',
        items: [
          { text: 'Uikit', link: '/guide/uikit' },
          { text: '演示项目', link: '/guide/demo-project' },
          // ...
        ],
      },
    ],
  },
}
