# 预览窗口

预览窗口是用于展示并运行你项目的前端代码。Codify 本身是不知道你项目的运行方式。所以需要你自己配置预览窗口，来确定生成的代码是否能够正确的运行在你的项目中。

<video width="100%" loop autoplay style="border-radius: 12px;"> 
  <source src="/images/playground-view.mp4" type="video/mp4"> 
</video>

## 制作预览窗口

制作预览窗口的方式非常简单，你只需要监听 Codify 插件发送过来的事件，然后根据事件中的数据，来展示代码。

![](/images/playground-process.png)

```javascript
// Listener for Codify plugin events
window.addEventListener('message', (event) => {
  // ......
})
```

### 完整代码示例
以下是一个基于 vue3 的预览窗口代码示例
```vue
<template>
  <div class="zoom-area">
    <component :is="codeComponent" class="demo" :style="getSize" />
  </div>
</template>
<script setup lang="ts">
import { compile, computed, h, ref } from 'vue'

const size = ref({
  width: '100%',
  height: '100%'
})
const code = ref(
  '<p class="text-center" style="color: rgba(255,255,255,0.3)">Please selection canvas node <br>Use auto layout to generates better results</p>'
)

// Listener for Codify plugin events
window.addEventListener('message', (event) => {
  if (event.data.length < 0) return
  switch (event.data.type) {
    case 'zoom':
      document.body.style.setProperty('zoom', event.data.content)
      break
    case 'code':
      code.value = event.data.content
      try {
        size.value = JSON.parse(event.data.size)
      } catch (error) {
        console.error(error)
      }
  }
})

// Set preview size
const getSize = computed(() => {
  const styleObject: any = {}
  if (size.value.width) {
    styleObject.minWidth = size.value.width
  }
  if (size.value.height) {
    styleObject.minHeight = size.value.height
  }
  return styleObject
})

const codeComponent = {
  render() {
    try {
      return h(compile(code.value))
    } catch (error) {
      // When an error occurs, provide alternative code or handling logic.
      return h('span', { class: 'text-danger text-center' }, 'Error: Failed to render component')
    }
  }
}
</script>

<style scoped>
.zoom-area {
  position: absolute;
  align-items: safe center;
  justify-content: safe center;
  min-width: 100%;
  min-height: 100%;
  padding: 20px;
}
.demo {
  align-self: center !important;
}
</style>

```

你可以直接下载 [demo](https://github.com/uetop/codify-preview-vue)

## 在特征配置填写预览地址
```json
{
  "playground_url": "https://your.playground_url.com",
}
```
详情请参考 [特征设置](/guide/feature-setting)
::: tip
预览地址是允许使用本地Url的。例如 http://localhost:3000 , 只要是你的网络可以访问即可。
:::
