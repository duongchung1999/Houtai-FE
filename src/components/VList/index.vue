<template>
  <el-scrollbar class="v-list">
    <slot></slot>
  </el-scrollbar>
</template>

<script lang="ts">
export default {
  name: 'VList',
  props: {
    height: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style lang="scss" scoped >
.v-list {
  background: #fff;
  width: 100%;
  height: 100%; // 建议设置父级元素的高度，这样div.el-scrollbar就可以通过%来设置高度
  overflow: hidden;

  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
    .el-scrollbar__view {
      overflow: hidden;
    }
  }

  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
</style>
