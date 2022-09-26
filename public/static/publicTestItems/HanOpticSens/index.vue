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

    <el-form-item label="串口" prop="串口" v-show="checkShowThisField('串口')">
      <el-input v-model="form.串口" placeholder="请输入串口" clearable />
    </el-form-item>

    <el-form-item
      label="读取的通道"
      prop="读取的通道"
      v-show="checkShowThisField('读取的通道')"
    >
      <el-input
        v-model="form.读取的通道"
        placeholder="请输入读取的通道"
        clearable
      />
    </el-form-item>

    <el-form-item
      label="写入字符串"
      prop="写入字符串"
      v-show="checkShowThisField('写入字符串')"
    >
      <el-input
        v-model="form.写入字符串"
        placeholder="请输入写入字符串"
        clearable
      />
    </el-form-item>

    <el-form-item
      label="电频脚位"
      prop="电频脚位"
      v-show="checkShowThisField('电频脚位')"
    >
      <el-input
        v-model="form.电频脚位"
        placeholder="请输入电频脚位"
        clearable
      />
    </el-form-item>

    <el-form-item label="预览"> {{ cmd }}</el-form-item>
  </el-form>
</template>

<script lang="ts" src="./index.vue.ts"></script>