# lindash

## 简介
lindash 是一个功能强大的工具库，旨在简化开发过程中的常见任务。它提供了多种实用的功能模块，帮助开发者提高工作效率。

## 安装
你可以通过 npm 或 yarn 安装 lindash

```bash
npm install lindash
```

# 使用缓存代理
- 引入模块
- 首先，你需要引入 lindash 模块中的 Cacheproxy 类。

```typescript
import lds from 'lindash'
const _cache = new lds.Cacheproxy()

// 模拟数据请求
async function apiGetdatas(prams: Object) {
  console.log('发起请求了,参数是：', prams)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([prams])
    }, 2000)
  })
}
const res = await _cache.cache(apiGetdatas, { name: 'rand' })  // 第二次请求会直接返回缓存数据

```



# js延迟加载
- lds.loadScript

```typescript
document.querySelector<HTMLDivElement>('#jsload')!.onclick = async () => {
 await lds.loadScript({ url: "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js" })
  console.log('加载完成')
}
```