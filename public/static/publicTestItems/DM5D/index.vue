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
    <el-form-item label="串口" prop="串口">
      <el-input
        v-model="form.串口"
        placeholder="请输入串口"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="表" prop="表">
      <el-select v-model="form.表" value-key="name" clearable filterable>
        <el-option
          v-for="item in options"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        >
          <div class="option">
            <span>{{ item.name }}</span>
            <span>{{ item.label }}</span>
          </div>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="预览"> {{ cmd }}</el-form-item>
  </el-form>
</template>

<script lang="ts" src="./index.vue.ts"></script>
<style lang="scss" scpoed>
.option {
  display: flex;
  justify-content: space-between;
}
</style>