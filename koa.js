const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const opentype = require('opentype.js');
const { createCanvas } = require('canvas');
const app = new Koa();
const router = new Router();

app.use(koaBody());
router.post('/', async (ctx, next) => {
  const ttfArrayBuffer = Buffer.from(ctx.request.body.str, 'base64')
  const font = opentype.parse(ttfArrayBuffer.buffer);

  const obj = {};
  for (const key in font.glyphs.glyphs) {
    const item = font.glyphs.glyphs[key];
    if (item.unicode) {
      const glyphPath = font.glyphs.glyphs[key].getPath(10, 65);
      const canvas = createCanvas(80, 80);
      const ctx = canvas.getContext('2d');
      glyphPath.fill = 'black';
      glyphPath.draw(ctx);
      obj[item.name] = {
        value: [],
        base64: canvas.toDataURL('image/png'),
        ocr: '',
      };

      item.unicodes.forEach(unicode => {
        const target = Number(unicode).toString(16).toUpperCase();
        obj[item.name].value.push(target);
      });
    }
  }
  ctx.body = obj
});


app.on('error', err => {
  console.error('server error', err)
});

app.use(router.routes())
  .use(router.allowedMethods())
  .listen(3101);