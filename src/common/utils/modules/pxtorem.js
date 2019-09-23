// 动态的将px转换成rem单位
export function pxtorem (val) {
  console.log('pxtorem', val)
  return parseFloat(val) / 16 + 'rem'
};
