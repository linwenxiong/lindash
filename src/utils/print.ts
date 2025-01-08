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
export function toCharacter(options:ToWordOptions) {
    return function* segment() {
          const segmenter = new Intl.Segmenter(options.locale, {granularity: 'word'});
            var textSymbol =  segmenter.segment(options.text) // 返回symbol类型，迭代器
            for (const data of textSymbol) {
                yield data.segment;
            }
            
    }
  
    
    
    // return async function* toCharacterStrategy(stream: any) {
        
    //     for await (const data of stream) {
    //         const characters = data.value.split(' ');
    //         for (let i = 0; i < characters.length; i++) {
    //             yield { value: characters[i], index: data.index + i };
    //         }
    //     }
    // };
}



function* segment(value: string, options: ToWordOptions) {
    if ('locale' in options) { // 是否需要分词
        const segmenter = new Intl.Segmenter(options.locale, {granularity: 'word'});
        var textSymbol =  segmenter.segment(value) // 返回symbol类型，迭代器
        for (const data of textSymbol) {
            yield data.segment;
        }
    }
    // else {
    //     yield* options.segment(value);
    // }
}



function toWord(options: ToWordOptions): Strategy {
    return async function* toWordStrategy(stream) {
        for await (const data of stream) {
            const cursor = {current: data.index};
            const segments = segment(data.value, options);
            for (const word of segments) {
                yield {value: word, index: cursor.current, chunk: data.chunk, latency: data.latency};
                cursor.current += word.length;
            }
        }
    };
}