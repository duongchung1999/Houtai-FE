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
      label="显示信息"
      prop="显示信息"
      v-show="checkShowThisField('显示信息')"
    >
      <el-input
        v-model="form.显示信息"
        placeholder="请输入显示信息"
        clearable
      />
    </el-form-item>
    <el-form-item label="时间" prop="时间" v-show="checkShowThisField('时间')">
      <el-radio-group v-model="form.时间">
        <el-radio :label="1000" />
        <el-radio :label="2000" />
        <el-radio :label="3000" />
        <el-radio :label="4000" />
        <el-radio :label="5000" />
      </el-radio-group>

      <el-input
        v-model.number="form.时间"
        placeholder="请输入延时时间，或在上方快捷选择"
        clearable
      >
        <span slot="append"> 毫秒 </span>
      </el-input>
    </el-form-item>

    <el-form-item label="串口" prop="串口" v-show="checkShowThisField('串口')">
      <el-input v-model="form.串口" placeholder="请输入串口" clearable />
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
      <el-select v-model="form.电频脚位" placeholder="请选择电频脚位">
        <el-option
          v-for="item in ['DtrEnable', 'RtsEnable']"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      label="高低电频"
      prop="高低电频"
      v-show="checkShowThisField('高低电频')"
    >
      <el-switch
        v-model="form.高低电频"
        active-value="True"
        inactive-value="False"
        active-text="高"
        inactive-text="低"
        active-color="#13ce66"
      />
    </el-form-item>

    <el-form-item label="预览"> {{ cmd }}</el-form-item>
  </el-form>
</template>

<script lang="ts" src="./index.vue.ts"></script>