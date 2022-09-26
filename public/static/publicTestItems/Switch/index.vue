<template>
  <el-form :model="form" ref="form" label-width="100px">
    <el-form-item label="方法名称" prop="method">
      <el-select
        v-model="currentMethod"
        value-key="name"
        placeholder="请选择调用方法"
        filterable
      >
        <el-option
          v-for="item in methods"
          :key="item.name"
          :label="item.label"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="闭合开关">
      <el-checkbox-group v-model="closedSwitches" @change="onSelectedSwitch">
        <el-checkbox-button v-for="s in allSwitches" :key="s" :label="s">
          {{ s }}
        </el-checkbox-button>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="预览"> {{ cmd }}</el-form-item>
  </el-form>
</template>

<script lang="ts" src="./index.vue.ts"></script>

<style lang="scss" scoped>
.el-checkbox-group {
  max-width: 800px;
}

.el-checkbox-button {
  ::v-deep .el-checkbox-button__inner {
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 40px;
  }
}
</style>