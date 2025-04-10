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
   <h2>画布</h2>
   <canvas id="canvas" width="800" height="150" style="border:1px solid #cfcfcf"></canvas>
</div>
`
// 模拟数据请求
async function apiGetdatas(prams: Object) {
  console.log('发起请求了,参数是：', prams)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([prams])
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
// await lctx.fnCustomFont({ 
//   fontName: "myfont",
//   fontUrl: "url(http://172.20.10.6:8080/AlimamaDongFangDaKai-Regular.woff2)"
// })
let prams = {
  text: "你好啊水水水水水三十六开发斯洛伐克撒娇",
  ctx: ctx,
  x: 0,
  y: 0,
  fontSize: 20
}
// lctx.fnDrewRowFonts(prams)
// lctx.fnDrewPath({
//   ctx: ctx,
//   x: 0,
//   y: 0,
//   width: 100,
//   height: 100
// })

lctx.fnLimitWidthDrewRowFont({
  fontFamily: "cursive",
  text: "斯柯达撒旦金克拉十分艰苦拉萨附近看了看是大家可怜见看来都是卡机撒大大分厘卡机设计费拉开放假啊士大夫就撒开的飞机喀什地方艰苦拉萨大家发生的深度交流看法的是连接",
  ctx: ctx,
  x: 6,
  y: 20,
  keyWord: "【播放】",
  maxWidth: 780,
  keyColor: "red",
  fontSize: 15
}).then((res) => {
  console.log(res)
})