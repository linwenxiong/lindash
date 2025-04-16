import type { DrewRowFonts, DrewPath, CustomFont, LimitWidthDrewRowFont, SymbolDrewRowFont } from "../interface";
class Ctxs {
  gfontlen: number; // 全局字体长度
  constructor() {
    this.gfontlen = 0
  }
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
      const { fontName, fontUrl } = option;
      const font = new FontFace(fontName, fontUrl, {
        style: "normal",
        weight: "100",
      });
      await font.load();
      document.fonts.add(font);
      await document.fonts.ready;
    } catch (err) {
      console.error("加载自定义字体出错", err);
      return Promise.reject();
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

    /**
    * @description 通过宽度进行换行绘制文本，支持关键字高亮
    * @param {maxWidth} 超出多少宽度换行
    * @param {keyWord} 关键字标红
    * @param {options} 包含绘制所需的各种参数，如上下文、文本、位置、字体等
    * @returns {Promise<number>} 返回绘制文本的总宽度
   */
    fnLimitWidthDrewRowFont(options: LimitWidthDrewRowFont) {
      return new Promise((resolve, reject) => {
        try {
          let { ctx, text, x, y, keyWord, maxWidth, keyColor, fontSize, fontFamily } = options;
          ctx.font = `${fontSize}px ${fontFamily || 'Arial'}`;
          let startx = x
          this.gfontlen = x
          for (let i = 0; i < text.length; i++) {
            var metrics = ctx.measureText(text[i]);
            ctx.fillStyle = keyWord.includes(text[i]) ? keyColor : "#222733";
            ctx.fillText(text[i], x, y);
            x = x + metrics.width;
            this.gfontlen = this.gfontlen + metrics.width
            const height = parseInt(ctx.font) * 1.2; // 通常使用字体大小的1.2倍作为行高
            if(x >= maxWidth) {
              x = startx
              y = y + height
            }
          }
          resolve(this.gfontlen)
        } catch (err) {
          console.warn("绘制横向文字出错", err);
          reject(err)
        }
      })
    }
    /**
   * @description 通过<br>换行符换行，需要提供换行符，换行符替换字符： 你好<br>啊 == 你好#啊
   * @param {sybol} 换行符号（自定义）
   * @param {replce} 换行符替换字符（自定义）
   */
    fnSymbolDrewRowFont (options: SymbolDrewRowFont) {
      return new Promise((resolve, reject) => {
        try {
          let { text, ctx, x, y, keyWord, keyColor = "#E41D1D", sybol = "<br>", replce = "#" } = options;
          let line = 1
          let startx = options.x
          var startIdx = options.text.indexOf(keyWord)
          var endIdx = keyWord.length + startIdx;
          if (text.indexOf(sybol)!== -1) {
              // 正则里面写变量未处理
              text = text.replace(/<br>/g, replce);
          }
          for (let i = 0; i < text.length; i++) {
              ctx.fillStyle = "#222733";
              if (startIdx !== -1 && i >= startIdx && i < endIdx) {
                  ctx.fillStyle = keyColor
              }
              var metrics = ctx.measureText(text[i]);
              text[i] !== replce && ctx.fillText(text[i], x, y);
              x = x + metrics.width;
              const height = parseInt(ctx.font) * 1.2; // 通常使用字体大小的1.2倍作为行高
              if (text[i] === replce) {
                  x = startx
                  y = y + height
                  line++
              }
          }
          resolve(line)
        } catch (err) {
          console.warn("fnSymbolDrewRowFont出错", err);
          reject(err)
        }
      })
  }

}

export default Ctxs;
