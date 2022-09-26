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

    <el-form-item
      label="包含弹窗名字"
      prop="包含弹窗名字"
      v-show="checkShowThisField('包含弹窗名字')"
    >
      <el-input
        v-model="form.包含弹窗名字"
        placeholder="请输入弹窗名称"
        clearable
      />
    </el-form-item>
    <el-form-item
      label="弹窗名字"
      prop="弹窗名字"
      v-show="checkShowThisField('弹窗名字')"
    >
      <el-input
        v-model="form.弹窗名字"
        placeholder="请输入弹窗名称"
        clearable
      />
    </el-form-item>
    <el-form-item
      label="检测到弹窗后输入的按键"
      prop="检测到弹窗后输入的按键"
      v-show="checkShowThisField('检测到弹窗后输入的按键')"
    >
      <el-input
        v-model="form.检测到弹窗后输入的按键"
        placeholder="请输入弹窗名称"
        clearable
      />
    </el-form-item>

    <el-form-item label="预览"> {{ cmd }}</el-form-item>
  </el-form>
</template>

<script lang="ts" src="./index.vue.ts"></script>