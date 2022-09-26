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
    <el-form-item label="读取频段" prop="读取频段">
      <el-input v-model="form.读取频段" placeholder="请选择频段" clearable />
    </el-form-item>
    <el-form-item label="量程" prop="量程" v-show="checkShowThisField('span')">
      <el-input v-model="form.span" placeholder="请输入量程" clearable />
    </el-form-item>
    <el-form-item label="频带宽" prop="频带宽" v-show="checkShowThisField('Rbw')">
      <el-input v-model="form.Rbw" placeholder="请输入频带宽" clearable />
    </el-form-item>

    <el-form-item label="预览"> {{ cmd }}</el-form-item>
  </el-form>
</template>

<script lang="ts" src="./index.vue.ts"></script>