<template>
  <el-container>
    <el-header height="60px" class="df-h-center">
      <span class="large-title-font bold">分配机型</span>
      <el-select v-model="selectedUser" value-key="nickname" placeholder="请选择用户" clearable filterable>
        <el-option v-for="item in users" :key="item.nickanme" :label="item.nickname" :value="item">
        </el-option>
      </el-select>

    </el-header>

    <el-main>
      <el-table :data="filteredList">
        <el-table-column label="用户" width="150px">
          <template #default="{row}">{{ row.user.nickname }}</template>
        </el-table-column>

        <el-table-column label="拥有的机型">
          <template #default="{row}">
            <span v-for="(model, i) in row.models" :key="i">
              {{ model.name }}<span v-if="i < row.models.length-1">、</span>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="70px">
          <template #default="{row}">
            <el-button type="text" @click="showDialog(row.user)">分配</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- <el-pagination :current-page.sync="filter.page" :page-size="filter.pageSize" :page-count="filter.pageCount" layout="prev, pager, next" background pager-count="20">
      </el-pagination> -->

    </el-main>

    <el-dialog title="分配机型" :visible.sync="dialogVisible" width="50%">
      <el-row :gutter="20" class="allocate-box">
        <el-col :span="12">
          <div class="title-area">
            <el-input v-model="allocateModelKeyWord" placeholder="搜索已经分配的机型" clearable>
              <template slot="prepend">
                <div class="body-font title">已分配</div>
              </template>
            </el-input>
          </div>
          <v-list>
            <v-list-item v-for="(m, i) in filteredUserMdoles" :key="i" @click="removeModel4User(m)">
              {{m.name}}
              <i class="el-icon-remove"></i>
            </v-list-item>
          </v-list>
        </el-col>
        <el-col :span="12">
          <div class="title-area">
            <el-input v-model="unallocateModelKeyWord" placeholder="搜索没有分配的的机型" clearable>
              <template slot="prepend">
                <div class="body-font title">未分配</div>
              </template>
            </el-input>
          </div>
          <v-list>
            <v-list-item v-for="(m, i) in filteredUnalloateModels" :key="i" @click="addModel2User(m)">
              {{m.name}}
              <i class="el-icon-circle-plus"></i>
            </v-list-item>
          </v-list>
        </el-col>
      </el-row>

      <div>

      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="assign">分配</el-button>
      </span>
    </el-dialog>

  </el-container>
</template>
<script src="./index.vue.ts" />
<style src="./index.vue.scss" scoped lang="scss" />
