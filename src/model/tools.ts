
import { UrlParams, LoadScripts } from '../interface'

// 对象转成url参数
function setUrlParams(params: UrlParams) {
  const pstr = new URLSearchParams(params);
  return "?" + pstr.toString();
}

function getUrlValue(str: string, key: string) {
  const urlParam = new URLSearchParams(str);
  return urlParam.get(key)
}

var strs = setUrlParams({
  "name": 'value1'
})

getUrlValue(strs, 'name')


export function fontAnimte(text: string) {
  var el = document.createElement('span');
  var t = document.createTextNode(text);
  el.style.display = "inline-block";
  el.className = "fontFlsh caption_text";
  el.appendChild(t);
  const parent = document.querySelector('.captions')
  parent?.appendChild(el);
}
export function delFont() {
  const parent = document.querySelector('.captions')
  parent!.innerHTML = ''
}

export function loadScript(params: LoadScripts): Promise<void> {
  return new Promise((resolve, reject) => {
    const existingScripts = document.querySelectorAll('script');
    for (const script of existingScripts) {
      if (script.src === params.url) {
        console.warn('脚本已存在，无需重复加载');
        return;
      }
    }
    const script = document.createElement('script');
    script.src = params.url;
    script.async = true; // 设置为异步加载
    script.onload = () => {
      // params.success && params.success()
      // 在这里可以调用脚本中定义的全局函数或变量
      resolve()
    };
    script.onerror = () => {
      reject()
    };
    document.head.appendChild(script);
  });

}