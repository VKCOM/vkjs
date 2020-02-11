const fs = require('fs');
const path = require('path');
const palette = require('@vkontakte/appearance/main.valette/palette');

/**
 * @param {string} color ahex
 * @return {string} color цвет в браузерном представлении
 */
function resolveColor(color) {
  if (color.indexOf('#') === 0 && color.length === 9) { // ahex
    return ahex2rgba(color.replace('#', ''));
  }
  return color;
}

/**
 * @param {string} ahex цвет в формате ahex: 00ffffff
 * @param {number} multiplier
 * @return {string} цвет в формате rgba
 */
function ahex2rgba(ahex, multiplier = 1) {
  const opacity = parseInt(ahex.slice(0, 2), 16) / 255 * multiplier;
  const colorHex = ahex.slice(2);
  return opacify(colorHex, opacity);
}

/**
 * @param {string} hex цвет в формате hex: ffffff
 * @param {number} opacity прозрачность в диапазоне [0, 1]
 * @return {string} цвет в формате rgba
 */
function opacify(hex, opacity) {
  return `rgba(${parseInt(hex.slice(0, 2), 16)}, ${parseInt(hex.slice(2, 4), 16)}, ${parseInt(hex.slice(4), 16)}, ${opacity.toFixed(2)})`;
}

function generatePalette(options) {
    let css = '/* stylelint-disable */\n/*\n* Этот файл сгенерирован автоматически. Не надо править его руками.\n*/\n';
    css += ':root {\n';

    Object.keys(palette).forEach((colorName) => {
      css += `  --${colorName}: ${resolveColor(palette[colorName]).toLowerCase()};\n`;
    });
    css += '}\n/* stylelint-enable */';
    fs.writeFileSync(path.resolve(__dirname, options.dir, options.file || 'palette.css'), css);
}

module.exports = generatePalette;
