<template>
  <span>
    <div class="text-area" :class="isFullyDisplayed ? '' : 'incomplete'" v-html="text"></div>
    <el-button type="text" @click="isFullyDisplayed = true" v-show="moreButtonVisible">展开</el-button>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'

@Component({ name: 'MoreText' })
export default class MoreText extends Vue {
  @Prop() text: string;

  /** 是否完整展示文本 */
  isFullyDisplayed = false;

  get moreButtonVisible() {
    let rows = 0
    // 统计行数
    rows += this.text.split('\r').length
    rows += this.text.split('<br>').length
    if (rows - 1 < 3) return false

    return !this.isFullyDisplayed
  }
}
</script>

<style lang="scss" scoped>
.incomplete {
  -webkit-line-clamp: 4; // 用来限制在一个块元素显示的文本的行数
  display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
  -webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
  text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
  word-break: break-all;
  overflow: hidden;
}
</style>
