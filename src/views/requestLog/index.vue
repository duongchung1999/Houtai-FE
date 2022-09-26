<template>
  <el-container>
    <el-header height="60px" class="df-h-center">
      <el-input v-model="conditions.keyword" placeholder="要搜索的操作的内容" clearable prefix-icon="el-icon-search"></el-input>

      <el-button type="text" @click="filterVisible = true">
        <i class="el-icon-s-operation"></i>
      </el-button>
    </el-header>
    <el-main>
      <el-table :data="logs">

        <el-table-column prop="requestUserId" label="操作者" width="120px">
          <template #default="{row}">
            {{ getNickname(row['requestUserId']) }}
          </template>
        </el-table-column>

        <el-table-column prop="requestDate" label="时间" width="120px">
          <template #default="{row}">
            {{ formatTime(row['requestDate']) }}
          </template>
        </el-table-column>
        <el-table-column prop="method" label="请求方法" width="120px">
          <template #default="{row}">
            <el-tag effect="dark" v-if="row['method'] == 'POST'" type="success">添加</el-tag>
            <el-tag effect="dark" v-if="row['method'] == 'PUT'" type="warning">修改</el-tag>
            <el-tag effect="dark" v-if="row['method'] == 'DELETE'" type="danger">删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路由" width="400px">
          <template #default="{row}">
            {{ row['path'].replace('api/v2/', '') }}
          </template>
        </el-table-column>

        <el-table-column prop="parameters" label="请求参数" />
      </el-table>

    </el-main>

    <el-drawer title="筛选" :visible.sync="filterVisible" direction="rtl" size="30%" destroy-on-close show-close wrapperClosable>
      <div class="filter-item">
        <label class="radio-label">方法</label>
        <el-radio-group v-model="conditions.method" size="medium" class="filter">
          <el-radio-button label="POST">添加</el-radio-button>
          <el-radio-button label="DELETE">删除</el-radio-button>
          <el-radio-button label="PUT">修改</el-radio-button>
        </el-radio-group>

      </div>

      <div class="filter-item">
        <label class="radio-label">路由</label>
        <el-select class="filter" clearable v-model="conditions.path" filterable placeholder="选择操作的目标">
          <el-option v-for="(item, i) in options.path" :key="i" :label="item" :value="item"></el-option>
        </el-select>
      </div>

      <div class="filter-item">
        <label class="radio-label ">时间</label>
        <div class="date-filter">
          <el-date-picker v-model="conditions.startdate" type="date" placeholder="起始时间" />
          <div class="m-l-10px m-r-10px">-</div>
          <el-date-picker v-model="conditions.enddate" type="date" placeholder="结束时间" />
        </div>
      </div>

      <div class="filter-item">
        <label class="radio-label">用户</label>
        <el-select class="filter" clearable value-key="nickname" v-model="conditions.requestUserId" filterable placeholder="选择是谁请求的">
          <el-option v-for="(item, i) in options.user" :key="i" :label="item.nickname" :value="item.id"></el-option>
        </el-select>
      </div>

      <div class="buttons">
        <el-button plain @click="reset">重置</el-button>
        <el-button id="apply-button" type="primary" @click="search">过滤</el-button>
      </div>

    </el-drawer>

  </el-container>
</template>
<script src="./index.vue.ts" />
<style src="./index.vue.scss" scoped lang="scss" />