<script>
const colorList = [
  {
    key: '薄暮',
    color: '#F5222D'
  },
  {
    key: '火山',
    color: '#FA541C'
  },
  {
    key: '日暮',
    color: '#FAAD14'
  },
  {
    key: '明青',
    color: '#13C2C2'
  },
  {
    key: '极光绿',
    color: '#52C41A'
  },
  {
    key: '拂晓蓝（默认）',
    color: '#1890FF'
  },
  {
    key: '极客蓝',
    color: '#2F54EB'
  },
  {
    key: '酱紫',
    color: '#722ED1'
  }
]
export default {
  methods: {
    colorFilter (color) {
      const c = colorList.filter(o => o.color === color)[0]
      return c && c.key
    },

    onChange (checked) {
    }
  },
  render () {
    return (
      <a-list itemLayout="horizontal">
        <a-list-item>
          <a-list-item-meta>
            <a slot="title">风格配色</a>
            <span slot="description">整体风格配色设置</span>
          </a-list-item-meta>
          <div slot="actions">
            <a-switch
              checkedChildren="暗色"
              unCheckedChildren="白色"
              defaultChecked={(this.navTheme === 'dark' && true) || false}
              onChange={this.onChange}
            />
          </div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta>
            <a slot="title">主题色</a>
            <span slot="description">
              页面风格配色： {this.colorFilter(this.primaryColor)}
            </span>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    )
  }
}
</script>
