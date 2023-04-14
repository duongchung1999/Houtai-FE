<template>
  <el-container>
    <el-header height="60px" class="df-h-center">
      <label class="radio-label">用户</label>
      <el-select v-model="selectedUser" value-key="nickname" placeholder="请选择用户" clearable filterable>
        <el-option v-for="item in users" :key="item.nickanme" :label="item.nickname" :value="item">
        </el-option>
      </el-select>

      <el-button type="success" id="add-btn" @click="showAddModel">添加用户</el-button>

    </el-header>
    <el-main>
      <el-table :data="users">
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="permissionRole" label="角色">
          <template #default="{row}">
            {{ row.permissionRole ? row.permissionRole.name : '无' }}
          </template>
        </el-table-column>
        <el-table-column width="180px">
          <template #default="{row}">
            <el-button size="mini" plain @click="showEditModel(row)">编辑</el-button>
            <el-button size="mini" type="danger" plain @click="deleteUser(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!-- 添加 / 编辑 测试项目模态框 -->
    <v-modal-box ref="user-modal-box" @add="addUser" @edit="updateUser" :addMode="userModal.addMode" :title="userModal.title" :visible.sync="userModal.visible" v-model="userModal.formData" :rules="rules">
      <template #default="{ formData }">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入昵称" clearable></el-input>
        </el-form-item>

        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入新密码" clearable></el-input>
        </el-form-item>

        <el-form-item label="权限角色" prop="permissionRole">
          <el-select value-key="name" v-model="formData.permissionRole" placeholder="请选择角色" filterable>
            <el-option v-for="(role, i) in permissionRoles" :key="i" :value="role" :label="role.name">
              <div class="role-option">
                <span>{{role.name}}</span>
                <span>{{role.level}}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
      </template>
    </v-modal-box>

  </el-container>
</template>
<script src="./index.vue.ts" />
<style src="./index.vue.scss" scoped lang="scss" />