import lds from './index'
// import { setupCounter } from './utils/counter.ts'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<div id="box">
  <button id="cachebtn">cacheProxy方法</button>
  <button id="getcache">getcache方法</button>
  <button id="jsload">js延迟加载</button>
   <button id="toCharacter">分词打字机</button>
   <button id="toOneCharacter">逐个字打印</button>
   <div id="toCharactertext"></div>
   <button id="deepclone">deepclone</button>
   <button id="deepclone2">deepclone2</button>
   <button id="catchtry">捕获异常</button>
   <h2>画布</h2>
   <button id="fnLimitWidthDrewRowFont">根据宽度大小自动换行</button>
   <canvas id="canvas" width="800" height="150" style="border:1px solid #cfcfcf"></canvas>
</div>
`
// 模拟数据请求
async function apiGetdatas(prams: Object) {
  console.log('发起请求了,参数是：', prams)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null)
      // reject("错误了")
    }, 2000)
  })
}


// 使用缓存代理需要先new一下
var cache = new lds.Cacheproxy()
var print = new lds.Print()
// 使用缓存代理
document.querySelector<HTMLDivElement>('#cachebtn')!.onclick = async () => {
  var rand = Math.floor(Math.random() * 100)
  const res = await cache.cache(apiGetdatas, { name: rand })
  console.log('res', res)
}


// 获取缓存的数据列表
document.querySelector<HTMLDivElement>('#getcache')!.onclick = () => {
  console.log(cache.getCache())
}

// -------------------------------------打字机-----------------
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
// -------------------------------------逐字打字机-----------------
var str = ""
document.querySelector<HTMLDivElement>('#toOneCharacter')!.onclick = () => {
  print.printChars({
    second: 10, // 多少秒输出完整个句子
    text: "lindash is a powerful tool library designed to simplify common tasks in the development process. It provides a variety of practical functional modules to help developers improve work efficiency. lindash是一个功能强大的工具库，旨在简化开发过程中的常见任务。它提供了多种实用的功能模块，帮助开发者提高工作效率。",
    callback: (result: string) => {
      str += result
      document.querySelector<HTMLDivElement>('#toCharactertext')!.innerHTML = str
    }
  })
}
// js懒加载的使用方法
document.querySelector<HTMLDivElement>('#jsload')!.onclick = async () => {
 await lds.loadScript({ url: "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js" })
  console.log('加载完成')
}

  var obj = [{ a: 1, b: 2, c: { d: 3 } },{name:32432}]
// js懒加载的使用方法
document.querySelector<HTMLDivElement>('#deepclone')!.onclick = async () => {
  const res = lds.deepCopy(obj)
 
   console.log(res)
 }
 // js懒加载的使用方法
document.querySelector<HTMLDivElement>('#deepclone2')!.onclick = async () => {
   console.log(obj)
 }
 
//  ctxs的使用方法
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
ctx.textBaseline = "top";
var lctx = new lds.Ctxs()

// #region 自定义字体
// await lctx.fnCustomFont({ 
//   fontName: "myfont",
//   fontUrl: "url(http://localhost:3000/assets/AlimamaDongFangDaKai-Regular.woff2)"
// })
// #endregion

// let prams = {
//   text: "你好啊水水水娇士",
//   ctx: ctx,
//   x: 0,
//   y: 0,
//   fontSize: 50
// }
// lctx.fnDrewRowFonts(prams)

// #region 画布绘制路径
// lctx.fnDrewPath({
//   ctx: ctx,
//   x: 0,
//   y: 0,
//   width: 100,
//   height: 100
// })
// #endregion

// #region 通过宽度控制字体自动换行
document.querySelector<HTMLDivElement>('#fnLimitWidthDrewRowFont')!.onclick = async () => {
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
}
// #endregion


// #region 捕获异常函数
document.querySelector<HTMLDivElement>('#catchtry')!.onclick = async () => {
 const [err, res] =  await lds.to(apiGetdatas({name:12}))
 if(err) {
  console.log("错误了", err)
  return
}
var data = res || []
console.log(err, res)
}
// #endregion