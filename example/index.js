const opentype = require('opentype.js');

const { createCanvas } = require('canvas');
var buffer = require('fs').readFileSync('./70a7503aea044b54.ttf')

const font = opentype.parse(buffer.buffer)
const obj = {}
for (let key in font.glyphs.glyphs) {
  let item = font.glyphs.glyphs[key]
  if (!item.unicode) {
  } else {
    const glyphPath = font.glyphs.glyphs[key].getPath(10, 65)
    const canvas = createCanvas(80, 80)
    const ctx = canvas.getContext("2d");
    glyphPath.fill = "black";
    glyphPath.draw(ctx);
    obj[item.name] = {
      value: [],
      base64: canvas.toDataURL("image/png")
    }
    item.unicodes.forEach(unicode => {
      const target = Number(unicode).toString(16).toUpperCase()
      obj[item.name].value.push(target)
    })

    console.log('obj', obj)
  }
}
