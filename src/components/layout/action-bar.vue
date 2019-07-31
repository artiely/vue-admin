<template>
  <div class="artiely-action-bar">
    <slot></slot>
    <div class="action-search"></div>
    <div class="action-action"><a-button type="primary" class="action-btn" >新增</a-button></div>
    <div class="action-default">
      <a-tooltip>
        <template slot="title">设置</template>
        <div class="action-icon">
          <v-icon name="icon-decoration_fill"></v-icon>
        </div>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">截屏</template>
        <div class="action-icon">
          <v-icon name="icon-tailor"></v-icon>
        </div>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">下载</template>
        <div class="action-icon">
          <v-icon name="icon-download-fill"></v-icon>
        </div>
      </a-tooltip>
       <a-tooltip>
        <template slot="title">打印</template>
        <div class="action-icon">
          <v-icon name="icon-weibiaoti526"></v-icon>
        </div>
      </a-tooltip>
       <a-tooltip>
        <template slot="title">导出</template>
        <div class="action-icon">
          <v-icon name="icon-send"></v-icon>
        </div>
      </a-tooltip>
       <a-tooltip>
        <template slot="title">导入</template>
        <div class="action-icon">
          <v-icon name="icon-inport"></v-icon>
        </div>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.artiely-action-bar {
  height: 50px;
  padding-left:10px;
  // background: #fff;
  width: 100%;
  display: flex;
  .action-search {
    width: 200px;
    height: 30px;
    background: #e1e3ec;
    border-radius: 4px;
    margin: 10px;
  }
  .action-action {
    flex: 1;
    margin: 9px;
    display: flex;
  }
  .action-default {
    margin: 5px;
    display: flex;
  }
  .action-icon {
    height: 30px;
    width: 30px;
    background: #e1e3ec;
    line-height: 30px;
    text-align: center;
    margin: 5px;
    cursor: pointer;
    user-select: none;
    border-radius: 4px;
    &:hover{
      color: #fff;
      background: #1DA57A;
      .iconfont{
        color: #fff;
      }
    }
    .iconfont{
      color: #959cb6
    }
  }
}
</style>
