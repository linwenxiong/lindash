/**
 * @file print.ts
 * @author liwnenxiong <943979843@qq.com>
 * @description 这个文件包含了一个 Print 类，用于以指定的时间间隔逐字打印文本。
 *              类中的 lprint 方法接受 ToWordOptions 类型的参数，包括文本、时间间隔、语言和地区化设置，
 *              以及一个回调函数，用于在每个时间间隔后处理当前打印的文本。
 */

type CallbackFunction = (result: string) => void;

interface ToWordOptions {
    min: number, // 秒
    text: string; // 文本
    locale?: 'en' | 'zh';
    callback: CallbackFunction;
}

class Print {
    public timer: number | undefined
    constructor() {
    }
    lprint(options: ToWordOptions) {
        clearInterval(this.timer)
        let arr = this.toArray(options)
        let index = 0
        let interval =  options.min * 1000 / arr.length //每个字需要多少毫秒
        this.timer = setInterval(() => {
            ++index
            if (index > arr.length) {
                clearInterval(this.timer)
                return
            }
            options.callback( arr.slice(0, index).join('') )
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
}
export default Print