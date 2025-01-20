export type CallbackFunction = (result: string) => void;
export interface ToWordOptions {
    animte?: boolean,
    second: number, // 秒
    text: string; // 文本
    locale?: 'en' | 'zh';
    callback: CallbackFunction;
}

export interface PrintOptions {
    animte?: boolean,
    text: string,
    second: number,
    callback: Function
}

export interface UrlParams {
    [key: string]: string;
}


export interface LoadScripts {
    url: string;
    // success?: Function;
    // error?: Function;
}