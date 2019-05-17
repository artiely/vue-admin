<template>
<div>
    <div class="logo"></div>
      <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['sub1']"
      :mode="mode"
      :theme="theme"
    >
      <a-menu-item key="1">
        <a-icon type="pie-chart" />
        <span>Option 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="desktop" />
        <span>Option 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="inbox" />
        <span>Option 3</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
</div>

</template>

<script>
export default {
  name: 'solo-menu',
  props: {
    mode: {
      type: String,
      default: 'inline'
    },
    theme: {
      type: String,
      default: 'dark'
    }
  }
}
</script>

<style>
.logo {
   height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
.ant-menu-horizontal > .ant-menu-item, .ant-menu-horizontal > .ant-menu-submenu{
  top: 16px;
}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item, .ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu{
  top: 10px;
}
</style>
