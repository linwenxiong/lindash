import type { DrewRowFonts, DrewPath, CustomFont } from "../interface";
class Ctxs {
  constructor() {}
  /**
   * @description 绘制横向文字
   */
  fnDrewRowFonts(option: DrewRowFonts) {
    const { ctx, text, fontSize } = option;
    ctx.textBaseline = "top";
    ctx.font = `${fontSize}px Arial`;
    for (let i = 0; i < text.length; i++) {
      var metrics = ctx.measureText(text[i]);
      // this.fnDrewPath({x: +option.x, y: +option.y, width: metrics.width, height: 90, ctx}) //开启测试
      ctx.fillText(text[i], +option.x, +option.y);
      option.x = +option.x + metrics.width;
    }
  }

    /**
   * @description 加载自定义字体，自定义字体加载完毕，可以直接通过自定义的字体名称来使用
   */
    async fnCustomFont(option: CustomFont) {
      try {
        const { fontName, fontUrl} = option
          const font = new FontFace(fontName, fontUrl, { style: 'normal', weight: '100' });
          await font.load();
          document.fonts.add(font);
          await document.fonts.ready;
      } catch(err) {
          console.warn("加载自定义字体出错", err)
          return Promise.reject()
      }
    }

  /**
   * @description 绘制矩形
   */
  fnDrewPath(option: DrewPath) {
    const { ctx, x, y, width, height } = option;
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1; // 设置描边宽度
    ctx.moveTo(x, y); // 起点 (x1, y1)
    ctx.lineTo(x + width, y); // 第二个点 (x2, y2)
    ctx.lineTo(x + width, y + height); // 第三个点 (x3, y3)
    ctx.lineTo(x, y + height); // 第四个点 (x4, y4)
    ctx.closePath(); // 闭合路径
    // 填充四边形
    // ctx.fill();
    ctx.stroke();
  }
}

export default Ctxs;
