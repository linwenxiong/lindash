import lin from './index'
// import { setupCounter } from './utils/counter.ts'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<div id="box">
  <button id="cachebtn">cacheProxy方法</button>
  <button id="getcache">getcache方法</button>
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


document.querySelector<HTMLDivElement>('#cachebtn')!.onclick = async ()=>{
  var rand =  Math.floor( Math.random() *100 )
  const res = await $lin.cache(apiGetdatas, {name:rand})
  console.log('res', res)
}

document.querySelector<HTMLDivElement>('#getcache')!.onclick = ()=>{
  console.log( $lin.getCache())

}