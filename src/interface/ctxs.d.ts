export interface DrewRowFonts {
  // animte?: boolean,
  text: string;
  ctx: CanvasRenderingContext2D;
  x: string | number;
  y: string | number;
  fontSize: number;
}

export interface DrewPath {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CustomFont {
  fontName: string;
  fontUrl: string;
}
export interface LimitWidthDrewRowFont {
  fontFamily?: string; // 字体名称
  fontSize: number; // 字体大小
  text: string; // 文本内容
  ctx: CanvasRenderingContext2D; // canvas 
  x: number; // 起始x坐标
  y: number; // 起始y坐标
  maxWidth: number; // 最大宽度
  keyWord: string; // 高亮关键词
  keyColor: string; // 高亮颜色
}

export interface SymbolDrewRowFont {
  text: string; 
  ctx: CanvasRenderingContext2D; 
  x: number; 
  y: number; 
  keyWord: string;
  keyColor: string; 
  sybol: string; 
  replce: string;
}
