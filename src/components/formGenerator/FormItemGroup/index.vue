<template>
  <div class="form-item-group">
    <span v-show="value" class="group-prop">{{ value }}</span>
  </div>
</template>

<script src="./index.vue.ts" />

<style lang="scss" scoped>
.form-item-group {
  .group-prop {
    background-color: #f2f6fc;
    color: #c0c4cc;
    border-radius: 4px;
    padding: 2px 4px;
    font-size: 12px;
  }
}
</style>