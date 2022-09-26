<template>
  <el-container>
    <el-main>
      <el-form :model="form" ref="form" :rules="rules" label-width="80px">
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword"></el-input>
        </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">更新密码</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </el-main>

  </el-container>
</template>
<script src="./index.vue.ts" />
<style src="./index.vue.scss" scoped lang="scss" />