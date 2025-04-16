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
- **lds.loadScript**

```typescript
import lds from 'lindash'
document.querySelector<HTMLDivElement>('#jsload')!.onclick = async () => {
 await lds.loadScript({ url: "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js" })
  console.log('加载完成')
}
```

# 分词打字机
- 引入Print类。

```typescript
import lds from 'lindash'
const print = new lds.Print()
var str = ""
document.querySelector<HTMLDivElement>('#toCharacter')!.onclick = () => {
  print.lprint({
    animte: true,
    second: 10, // 多少秒输出完整个句子
    locale: 'en',
    text: "lindash is a powerful tool library designed to simplify common tasks in the development process. It provides a variety of practical functional modules to help developers improve work efficiency. lindash是一个功能强大的工具库，旨在简化开发过程中的常见任务。它提供了多种实用的功能模块，帮助开发者提高工作效率。",
    callback: (result: string) => {
      str += result
      document.querySelector<HTMLDivElement>('#toCharactertext')!.innerHTML = str
    },
    end: () => {
      console.log('打印完成')
    }
  })
}
```
# `Ctxs` 类
## 概述
`Ctxs` 是一个用于在 Canvas 上下文中进行图形和文本绘制的工具类。它提供了多种方法，包括绘制横向文字、加载自定义字体、绘制矩形路径以及基于宽度换行的文本绘制功能。这些方法可以满足开发者在 Canvas 中实现复杂图形和文本操作的需求。

- 引入Ctxs类。
```typescript
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
ctx.textBaseline = "top";
var lctx = new lds.Ctxs()
  lctx.fnLimitWidthDrewRowFont({
    fontFamily: "myfont",
    text: `谁来守护光明 至天荒地老
    忽有一位少年 映入众生眼帘
    一路无畏向前 气贯长虹之巅
    他的使命生来就与众不同
    他灵魂燃烧如火焰熊熊
    铸就了无与伦比的坚定
    他总期望风雨之后现彩虹
    在黑暗中等待黎明
    神选之子总绝地逢生
    日月在流年里变幻
    星辰在掌纹中旋转
    纵使风惊云涌气象万千
    受过的伤 都结痂
    成护身铠甲`,
    ctx: ctx,
    x: 6,
    y: 20,
    keyWord: "眼帘火焰熊熊铠甲",
    maxWidth: 780,
    keyColor: "red",
    fontSize: 15
  }).then((res) => {
    console.log(res)
  })
```


## 方法介绍

### 1. **`fnDrewRowFonts(option: DrewRowFonts)`**
#### 功能
绘制横向文字。
#### 参数
| 参数名 | 类型 | 描述 |
|--------|------|------|
| `ctx` | `CanvasRenderingContext2D` | 绘制上下文。 |
| `text` | `string` | 要绘制的文本内容。 |
| `fontSize` | `number` | 字体大小（单位：像素）。 |
| `x` | `number` | 文本起始位置的 x 坐标。 |
| `y` | `number` | 文本起始位置的 y 坐标。 |

#### 实现逻辑
- 设置字体样式为 `Arial`，并根据文本长度逐字符绘制。
- 更新 `option.x` 的值以准备绘制下一个字符。

---

### 2. **`async fnCustomFont(option: CustomFont)`**
#### 功能
加载自定义字体，加载完成后可以通过指定的字体名称使用。
#### 参数
| 参数名 | 类型 | 描述 |
|--------|------|------|
| `option` | `CustomFont` | 包含字体加载所需的信息。 |
| `option.fontName` | `string` | 自定义字体名称。 |
| `option.fontUrl` | `string` | 字体文件的 URL 地址。 |

#### 返回值
- 返回一个 Promise，如果加载失败则拒绝 Promise。

#### 实现逻辑
- 使用 `FontFace` 创建字体对象，并将其加载到文档中。
- 等待字体加载完成，并处理可能的错误。

---

### 3. **`fnDrewPath(option: DrewPath)`**
#### 功能
绘制矩形路径。
#### 参数
| 参数名 | 类型 | 描述 |
|--------|------|------|
| `option` | `DrewPath` | 包含绘制矩形所需的信息。 |
| `option.ctx` | `CanvasRenderingContext2D` | 绘制上下文。 |
| `option.x` | `number` | 矩形左上角的 x 坐标。 |
| `option.y` | `number` | 矩形左上角的 y 坐标。 |
| `option.width` | `number` | 矩形宽度。 |
| `option.height` | `number` | 矩形高度。 |

#### 实现逻辑
- 使用 `beginPath` 开始绘制路径。
- 设置描边颜色为红色，描边宽度为 1。
- 按照矩形的四个顶点依次绘制线条，并闭合路径。
- 使用 `stroke` 方法绘制矩形边框。

---

### 4. **`fnLimitWidthDrewRowFont(options: LimitWidthDrewRowFont)`**
#### 功能
通过宽度进行换行绘制文本，支持关键字高亮。
#### 参数
| 参数名 | 类型 | 描述 |
|--------|------|------|
| `options` | `LimitWidthDrewRowFont` | 包含绘制所需的各种参数。 |
| `options.ctx` | `CanvasRenderingContext2D` | 绘制上下文。 |
| `options.text` | `string` | 要绘制的文本内容。 |
| `options.x` | `number` | 文本起始位置的 x 坐标。 |
| `options.y` | `number` | 文本起始位置的 y 坐标。 |
| `options.keyWord` | `string[]` | 需要高亮的关键字数组。 |
| `options.maxWidth` | `number` | 换行的最大宽度。 |
| `options.keyColor` | `string` | 关键字高亮的颜色。 |
| `options.fontSize` | `number` | 字体大小（单位：像素）。 |
| `options.fontFamily` | `string` | 字体名称（默认为 Arial）。 |

#### 返回值
- 返回一个 Promise，解析为绘制文本的总宽度（单位：像素）。

#### 实现逻辑
- 设置字体样式，并逐字符绘制文本。
- 如果当前字符是关键字，则使用指定的颜色高亮显示。
- 当绘制宽度超出 `maxWidth` 时，自动换行。
- 计算行高为字体大小的 1.2 倍，并在换行时更新 y 坐标。

---

## 使用示例

### 示例 1：绘制横向文字
```typescript
import Ctxs from './ctx';

const ctx = document.createElement('canvas').getContext('2d');
const ctxs = new Ctxs();

ctxs.fnDrewRowFonts({
  ctx,
  text: 'Hello, World!',
  fontSize: 20,
  x: 50,
  y: 50,
});
```

### 示例 2：加载自定义字体
```typescript
import Ctxs from './ctx';

const ctxs = new Ctxs();

ctxs.fnCustomFont({
  fontName: 'MyFont',
  fontUrl: 'url(./myfont.ttf)',
}).then(() => {
  console.log('自定义字体加载成功');
}).catch((err) => {
  console.error('自定义字体加载失败', err);
});
```

### 示例 3：绘制矩形路径
```typescript
import Ctxs from './ctx';

const ctx = document.createElement('canvas').getContext('2d');
const ctxs = new Ctxs();

ctxs.fnDrewPath({
  ctx,
  x: 10,
  y: 10,
  width: 100,
  height: 50,
});
```

### 示例 4：基于宽度换行绘制文本
```typescript
import Ctxs from './ctx';

const ctx = document.createElement('canvas').getContext('2d');
const ctxs = new Ctxs();

ctxs.fnLimitWidthDrewRowFont({
  ctx,
  text: 'This is a test string with keyword.',
  x: 10,
  y: 10,
  keyWord: ['test', 'keyword'],
  maxWidth: 200,
  keyColor: 'red',
  fontSize: 16,
  fontFamily: 'Arial',
}).then((totalWidth) => {
  console.log('绘制文本的总宽度:', totalWidth);
}).catch((err) => {
  console.error('绘制文本出错', err);
});
```

---

## 注意事项
1. 在使用 `fnCustomFont` 方法时，确保字体文件的 URL 地址正确，并且浏览器支持加载该字体格式。
2. `fnLimitWidthDrewRowFont` 方法会根据 `maxWidth` 参数自动换行，开发者需要合理设置该值以避免不必要的换行。
3. 所有方法均依赖于 Canvas 上下文（`CanvasRenderingContext2D`），请确保在调用方法前已正确初始化 Canvas。