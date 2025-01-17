
interface UrlParams {
  [key: string]: string;
}
// 对象转成url参数
function setUrlParams(params: UrlParams) {
    const pstr = new URLSearchParams(params);
    return "?"+pstr.toString();
}

function getUrlValue(str: string, key: string) {
    const urlParam  = new URLSearchParams(str);
    return urlParam .get(key)
}

var strs = setUrlParams({
    "name": 'value1'
})

getUrlValue(strs,'name')


export function fontAnimte(text: string) {
    var el = document.createElement('span');
    var t = document.createTextNode(text);
    el.style.display="inline-block";
    el.className="fontFlsh caption_text";
    el.appendChild(t);
    const parent = document.querySelector('.captions')
    parent?.appendChild(el);
  }
export function delFont() {
    const parent = document.querySelector('.captions')
    parent!.innerHTML = ''
}