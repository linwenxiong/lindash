import type { DrewRowFonts } from '../interface'
class Ctxs {
  constructor() {
  }
   /**
   * @description 绘制横向文字
   */
   fnDrewRowFonts(option: DrewRowFonts) {
    for (let i = 0; i < option.text.length; i++) {
      var metrics = option.ctx.measureText(option.text[i]);
      // drewPath(x, y, metrics.width, 90) //开启测试
      option.ctx.fillText(option.text[i], +option.x, +option.y);
      option.x = +option.x + metrics.width;
    }
  }
}

export default Ctxs