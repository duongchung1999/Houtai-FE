<template>
  <el-container>
    <el-header height="60px" class="df-h-center">
      <span class="large-title-font bold">角色管理</span>
      <el-button type="success" id="add-btn" @click="showAddModel">添加角色</el-button>
    </el-header>  

    <el-main>
      <el-table :data="roles">
        <el-table-column prop="name" label="角色"> </el-table-column>
        <el-table-column prop="level" label="权限等级"> </el-table-column>
        <el-table-column width="180px">
          <template #default="{row}">
            <el-button size="mini" plain @click="showEditModel(row)">编辑</el-button>
            <el-button size="mini" type="danger" plain @click="deleteRole(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
        
    <!-- 添加/编辑 模态框 -->
    <v-modal-box @add="addRole" @edit="updateRole" :addMode="modal.addMode" :title="modal.title" :visible.sync="modal.visible" v-model="modal.formData" :rules="rules">
      <template #default="{ formData }">
        <el-form-item label="角色" prop="name">
          <el-input v-model="formData.name" placeholder="角色" clearable />
        </el-form-item>
        <el-form-item label="权限等级" prop="level">
          <el-slider v-model="formData.level" :min="1" :max="8" :step="1" />
        </el-form-item>

      </template>
    </v-modal-box>

  </el-container>
</template>
<script src="./index.vue.ts" />
<style src="./index.vue.scss" scoped lang="scss" />