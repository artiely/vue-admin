export default {
  bind: function (el, binding) {
    highlight(el, binding)
  },
  update: function (el, binding) {
    highlight(el, binding)
  }
}

function highlight (el, binding) {
  let keywords = binding.value.keyword
  let reg = new RegExp(keywords, 'ig')
  let regB = new RegExp(' ', 'ig')
  let value = binding.value.value
  let color = binding.value.color || 'red'

  if (keywords) {
    value = value.replace(regB, '')
    el.innerHTML = value.replace(reg, `<span style="color:${color}">${keywords}</span>`)
  } else {
    el.innerHTML = value
  }
}
