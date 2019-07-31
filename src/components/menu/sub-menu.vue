<template functional>
  <a-sub-menu
    :key="props.menuInfo.path"
  >
    <span slot="title">
      <a-iconfont  :type="props.menuInfo.meta.icon" /><span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <template v-if="!item.meta.hide">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
        >
          <a-iconfont  :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu
          v-else
          :key="item.path"
          :menu-info="item"
        />
      </template>
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: {
    menuInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
