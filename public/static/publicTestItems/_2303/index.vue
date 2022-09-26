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
    <el-form-item label="电压" prop="电压">
      <el-input
        v-model="form.电压"
        placeholder="请输入电压"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="电流" prop="电流">
      <el-input
        v-model="form.电流"
        placeholder="请输入电流"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="通道" prop="通道">
      <el-input
        v-model="form.通道"
        placeholder="请输入通道"
        clearable
      ></el-input>
    </el-form-item>

    <el-form-item label="预览"> {{ cmd }}</el-form-item>
  </el-form>
</template>

<script lang="ts" src="./index.vue.ts"></script>