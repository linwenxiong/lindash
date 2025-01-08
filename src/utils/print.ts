export function Print() {
    // var stream = {
    //     value: "jdklsfjadkla斯洛伐克阿迪斯",
    //     index: 0
    // }
}

interface ToWordOptions {
    text: string;
    locale?: 'en' | 'zh';
    segment: (value: string) => Iterable<string>;
}

interface Strategy {
    (stream: AsyncIterable<any>): AsyncIterable<any>;
}
export function toCharacter() {
    return function* printsSegment(options:ToWordOptions) {
          const segmenter = new Intl.Segmenter(options.locale, {granularity: 'word'});
            var textSymbol =  segmenter.segment(options.text) // 返回symbol类型，迭代器
            for (const data of textSymbol) {
                yield data.segment;
            }

    }
}

