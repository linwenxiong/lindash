import lin from './index'
// import { setupCounter } from './utils/counter.ts'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<div id="box">
  <button id="cachebtn">cacheProxy方法</button>
  <button id="getcache">getcache方法</button>
   <button id="toCharacter">取词器</button>
   <div id="toCharactertext"></div>
</div>
`

var $lin = lin


// 模拟数据请求
async function apiGetdatas(prams: Object) {
  console.log('发起请求了,参数是：', prams)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([prams])
    }, 2000)
  })
}


document.querySelector<HTMLDivElement>('#cachebtn')!.onclick = async () => {
  var rand = Math.floor(Math.random() * 100)
  const res = await $lin.cache.cache(apiGetdatas, { name: rand })
  console.log('res', res)
}

document.querySelector<HTMLDivElement>('#getcache')!.onclick = () => {
  console.log($lin.cache.getCache())
}

// ------------------------------------- 取词器-----------------
var stream = [{
  value: "Spring Festival 名词，意为春节，是中国最重要的传统节日，如We celebrate the Spring Festival every year.（我们每年都庆祝春节。）",
  index: 1
},
{
  value: "根据题干关键词“the most important festival”，可在原文中找到关键句“It's the most important(最重要的)festival in China.”。",
  index: 2
}, {
  value: "It's the most important festival in Chin",
  index: 3
}
]

var segment = $lin.toCharacter()

const datalist = segment({
  text: "根据题干关键词“the most important festival”，可在原文中找到关键句“It's the most important(最重要的)festival in China.”。",
  locale: 'en',
  segment: (value: string) => { return value.split('') }
})
document.querySelector<HTMLDivElement>('#toCharacter')!.onclick = () => {
  var audio = 5*1000
  var arr = [...datalist]
  var index = 0
  var interval = audio / arr.length
  var timer = setInterval(() => {
    ++index
    if(index > arr.length) {
      clearInterval(timer)
      return
    }
    document.getElementById("toCharactertext")!.innerHTML = arr.slice(0, index).join('')
    // console.log( arr.slice(0, index).join(''))
  }, interval);
}



