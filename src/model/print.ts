/**
 * @file print.ts
 * @author liwnenxiong <943979843@qq.com>
 * @description 这个文件包含了一个 Print 类，用于以指定的时间间隔逐字打印文本。
 *              类中的 lprint 方法接受 ToWordOptions 类型的参数，包括文本、时间间隔、语言和地区化设置，
 *              以及一个回调函数，用于在每个时间间隔后处理当前打印的文本。
 */

import type { ToWordOptions, PrintOptions } from '../interface'
 
class Print {
    public isPause: boolean
    public timer: number | undefined
    constructor() {
        this.timer = undefined
        this.isPause = false
    }
    /**
      * @description: 分词打印
      */
    lprint(options: ToWordOptions) {
        clearInterval(this.timer)
        let arr = this.toArray(options)
        console.log(arr)
        let index = 0
        let interval = options.second * 1000 / (arr.length + 5)//每个字需要多少毫秒
        this.timer = setInterval(() => {
          if(index < arr.length) {
            let txt =  options.animte ? arr[index] : arr.slice(0, index).join('')
            ++index
            options.callback( txt )
          } else {
             clearInterval(this.timer)
             return
          } 
        }, interval);
    }

    toArray(options: ToWordOptions) {
        var strArr = this.printsSegment(options)
        return [...strArr]
    }

    * printsSegment(options: ToWordOptions) {
        const segmenter = new Intl.Segmenter(options.locale, { granularity: 'word' });
        var textSymbol = segmenter.segment(options.text) // 返回symbol类型，迭代器
        for (const data of textSymbol) {
            yield data.segment;
        }
    }



    
     /**
      * @description: 逐字打印
      */
    printChars(options: PrintOptions) {
      console.log(options.text)
        clearInterval(this.timer)
        let time = options.second * 1000
        let num = time / options.text.length
        let index = 0
        let txt = ''
        this.timer = setInterval(() => {
          if (!this.isPause) {
            if (index < options.text.length) {
              txt =  options.animte ?  options.text[index] : options.text.slice(0, index)
              ++index
              options.callback(txt)
              return
            }
           
            clearInterval(this.timer)
          }
        }, num)
      }

      clearPrint() {
        clearInterval(this.timer)
      }
      pausePrint() {
        this.isPause = true
      }
      continuePrint() {
        this.isPause = false
      }

}
export default Print