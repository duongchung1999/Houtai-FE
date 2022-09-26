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
    <el-form-item label="量程" prop="量程">
      <el-select
        v-model="form.量程"
        value-key="value"
        placeholder="请选择量程"
        filterable
      >
        <el-option
          v-for="o in rangeOptions"
          :key="o.value"
          :label="o.value"
          :value="o.value"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="预览"> {{ cmd }}</el-form-item>
  </el-form>
</template>

<script lang="ts" src="./index.vue.ts"></script>