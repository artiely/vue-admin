<template functional>
  <a-sub-menu
    :key="props.menuInfo.path"
  >
    <span slot="title">
      <a-icon type="mail" /><span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <template v-if="!item.meta.hide">
      <a-menu-item
        v-if="!item.children"
        :key="item.path"
      >
        <a-icon type="pie-chart" />
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
  props: ['menuInfo'],
};
</script>