// 动态的将px转换成rem单位
let fontSize = parseFloat(document.querySelector('html').style.fontSize)
export function pxtorem (val) {
  console.log('TCL: pxtorem -> fontSize', fontSize)
  return parseFloat(val) / fontSize + 'rem'
};
