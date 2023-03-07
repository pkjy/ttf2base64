const opentype = require('opentype.js');
const font = opentype.parse(require('fs').readFileSync('./Roboto-Black.ttf').buffer);


const { createCanvas, loadImage } = require('canvas');

const width = font.getAdvanceWidth('HELLO');
const canvas = createCanvas(width + 20, 80)
const ctx = canvas.getContext("2d");
const path = font.getPath('HELLO', 10, 65, 72);
            
path.fill = "black";
path.draw(ctx);
console.log(canvas.toDataURL("image/png"));