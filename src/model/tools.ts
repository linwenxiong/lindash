import { UrlParams, LoadScripts } from "../interface";

// 对象转成url参数
function setUrlParams(params: UrlParams) {
  const pstr = new URLSearchParams(params);
  return "?" + pstr.toString();
}

function getUrlValue(str: string, key: string) {
  const urlParam = new URLSearchParams(str);
  return urlParam.get(key);
}

var strs = setUrlParams({
  name: "value1",
});

getUrlValue(strs, "name");

export function fontAnimte(text: string) {
  var el = document.createElement("span");
  var t = document.createTextNode(text);
  el.style.display = "inline-block";
  el.className = "fontFlsh caption_text";
  el.appendChild(t);
  const parent = document.querySelector(".captions");
  parent?.appendChild(el);
}
export function delFont() {
  const parent = document.querySelector(".captions");
  parent!.innerHTML = "";
}

export function loadScript(params: LoadScripts): Promise<void> {
  return new Promise((resolve, reject) => {
    const existingScripts = document.querySelectorAll("script");
    for (const script of existingScripts) {
      if (script.src === params.url) {
        console.warn("脚本已存在，无需重复加载");
        return;
      }
    }
    const script = document.createElement("script");
    script.src = params.url;
    script.async = true; // 设置为异步加载
    script.onload = () => {
      // params.success && params.success()
      // 在这里可以调用脚本中定义的全局函数或变量
      resolve();
    };
    script.onerror = () => {
      reject();
    };
    document.head.appendChild(script);
  });
}
// 已经编码url，或者已经编码的文本
export function urlDecode(code: string) {
  // 解码
  return decodeURIComponent(code);
}

export function urlEnCode(code: string) {
  // 编码
  return encodeURIComponent(code);
}

// 对象深拷贝
export function deepCopy<T>(temp: T): T {
  const objs: Partial<T> = {} as Partial<T>;
  for (let key in temp) {
    var value = temp[key];
    if (value instanceof Object) {
      objs[key] = deepCopy(value);
    } else {
      objs[key] = value;
    }
  }
  return objs as T;
}

export function setStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("item:", e);
  }
}

export function getStorage<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error("item:", e);
    return null;
  }
}

/**
 * @description 接收一个Promise,并返回一个元组[error, data]
 * @param {Promise<T>} promise - 要处理的Promise
 * @returns {Promise<[Error | null, T | undefined]>}
 */
export function to<T>(
  promise: Promise<T>
): Promise<[Error | null, T | undefined]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[Error, undefined]>((err: Error) => [err, undefined]);
}

/**
 * 表格时间格式化
 */
export function formatDate(cellValue: null | string) {
  if (cellValue == null || cellValue == "") return "";
  var date = new Date(cellValue);
  var year = date.getFullYear();
  var month =
    date.getMonth() + 1 < 10 ?
      "0" + (date.getMonth() + 1)
    : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return (
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  );
}

/**
 * 导出流文件
 */
export function downloadFile(
  res: Blob,
  filename = "表格数据",
  type = "application/vnd.ms-excel",
  suffixName = ".xlsx"
) {
  const href = window.URL.createObjectURL(new Blob([res], { type }));
  const link = document.createElement("a");
  const fileName = filename + suffixName;
  link.style.display = "none";
  link.href = href;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(href);
}