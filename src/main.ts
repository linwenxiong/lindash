import lds from './index'
// import { setupCounter } from './utils/counter.ts'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<div id="box">
  <button id="cachebtn">cacheProxy方法</button>
  <button id="getcache">getcache方法</button>
   <button id="toCharacter">取词器</button>
   <div id="toCharactertext"></div>
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

// ------------------------------------- 取词器-----------------
document.querySelector<HTMLDivElement>('#toCharacter')!.onclick = () => {
  print.lprint({
    animte: true,
    second: 10,
    locale: 'en',
    text: "根据题干关键词“the most important festival”，可在原文中找到关键句“It's the most important(最重要的)festival in China.”。",
 
    callback: (result: string) => { 
      document.querySelector<HTMLDivElement>('#toCharactertext')!.innerHTML = result
    }
  })
}



