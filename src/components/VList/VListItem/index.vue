<template>
  <li
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    @click="triggerClick"
    class="v-list-item"
  >
    <slot name="default" :active="active"></slot>
  </li>
</template>

<script lang="ts">
export default {
  name: 'VListItem',
  props: {},
  data() {
    return {
      active: false
    }
  },
  methods: {
    triggerClick() {
      this.$emit('click')
    },
    mouseenter() {
      this.active = true
    },
    mouseleave() {
      this.active = false
    }
  }
}
</script>

<style lang="scss" scpoed>
.v-list-item {
  cursor: pointer;
  display: flex;
  border-radius: 4px;
  &:not(.not-hover):hover {
    background: #f5f7fa;
    transition: all 200ms;
  }

  // TODO 增加激活样式
  &.active {
    &:hover {
    }
  }
}
</style>
