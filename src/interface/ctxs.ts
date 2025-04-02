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
