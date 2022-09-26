<template>
  <el-form :model="form" ref="form" label-width="100px">
    <el-form-item  label="方法名称" prop="method">
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
    <el-form-item v-show="checkShowThisField('装置名称')" label="装置名称" prop="装置名称">
      <el-input v-model="form.装置名称" />
    </el-form-item>
    <el-form-item v-show="checkShowThisField('选择音频')" label="播放音频" prop="选择音频">
      <el-input
        v-model="form.选择音频"
        placeholder="请在左侧选择音频文件，或自定义输入"
        clearable
      >
        <el-select
          style="width: 150px"
          slot="prepend"
          v-model="currentMusic"
          placeholder="音频文件"
          clearable
          filterable
          @change="onSelectMusic"
        >
          <el-option
            v-for="item in musics"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item v-show="checkShowThisField('显示内容信息')" label="提示内容" prop="显示内容信息">
      <el-input v-model="form.显示内容信息" />
    </el-form-item>
    <el-form-item v-show="checkShowThisField('音量值')" label="音量值" prop="音量值">
      <el-slider v-model="form.音量值" :min="0" :max="100"> </el-slider>
    </el-form-item>
    <el-form-item v-show="checkShowThisField('音频文件名字')" label="音频文件名字" prop="音频文件名字">
      <el-input
        v-model="form.音频文件名字"
        placeholder="请选择音频文件名称"
        clearable
      />
    </el-form-item>
    <el-form-item  label="预览"> {{ cmd }}</el-form-item>
  </el-form>
</template>

<script lang="ts" src="./index.vue.ts"></script>

<style>
</style>