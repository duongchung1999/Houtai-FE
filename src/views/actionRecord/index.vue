<template>
  <el-container>
    <el-header height="60px" class="df-h-center">
      <el-select v-model="conditions.operatorName" placeholder="选择操作者" clearable filterable>
        <el-option v-for="o in operators" :key="o" :label="o" :value="o" />
      </el-select>

      <el-select v-model="conditions.name" placeholder="选择操作" clearable filterable>
        <el-option v-for="a in actions" :key="a" :label="a" :value="a" />
      </el-select>

      <el-date-picker v-model="conditions.startDate" type="date" placeholder="起始时间" />
      <el-date-picker v-model="conditions.endDate" type="date" placeholder="结束时间" />

      <el-input class="search-input" v-model="conditions.keywords" placeholder="搜索操作记录" clearable prefix-icon="el-icon-search"></el-input>
    </el-header>
    <el-main>
      <div class="table-area">
        <el-table :data="actionRecords" height="100%">
          <el-table-column prop="operator" label="操作者" width="120px" />
          <el-table-column prop="name" label="操作" width="200px" />
          <el-table-column prop="message" label="记录">
            <template #default="{row}">
              <more-text :text="row['message']">
              </more-text>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="操作时间" width="80px">
            <template #default="{row}">
              {{ formatTime(row['createDate']) }}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-pagination :current-page.sync="conditions.pageIndex" :page-size="conditions.pageSize" :pager-count="7" layout="prev, pager, next" :page-count="totalPageCount" />

    </el-main>

  </el-container>
</template>
<script src="./index.vue.ts" />
<style src="./index.vue.scss" scoped lang="scss" />
