<template>
  <div>
    <el-header>
      <!-- 选择机型 -->
      <el-row :gutter="20" style="width:100%">
        <el-col :span="12">
          <label class="radio-label" for="model-select">机型</label>
          <el-select id="model-select" v-model="model" value-key="name" filterable placeholder="请选择机型">
            <el-option v-for="item in modelList" :key="item.id" :label="item.name" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <label class="radio-label" for="station-select">站别</label>
          <el-select id="station-select" v-model="station" value-key="name" filterable placeholder="请选择站别">
            <el-option v-for="item in stationList" :key="item.id" :label="item.name" :value="item"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-header>

    <el-main class="content">
      <el-row class="list-row">
        <el-col :span="12">
          <div class="list-header">
            <label for="" class="radio-label">测试项目</label>
            <el-input v-model="searchTestItemKw" placeholder="请输入测试项目名称或调用命令" size="small" clearable></el-input>
          </div>
          <el-scrollbar ref="testItemScrollbar">
            <draggable :group="{ name: 'abc', pull: canPull, put: 'false' }" :sort="false" class="v-list draggable-list" :list="fliteredTestItem" handle=".move-btn" animation="240" chosenClass="chosenClass" @choose="onTestItemDragListChoose()" @unchoose="onTestItemDragListUnchoose">
              <v-list-item v-for="(item, i) in fliteredTestItem" :key="i" :class="{
                  isHidden: item.isHidden,
                  isAlwaysRun: item.isAlwaysRun,
                }">
                <el-tooltip :content="item.cmd" placement="right" effect="dark">
                  <div>{{ getTestItemName(item) }}</div>
                </el-tooltip>
                <div class="config-tags">
                  <el-tag type="success" effect="dark" size="small" disable-transitions v-if="item.isAlwaysRun">始终执行</el-tag>
                  <el-tag type="info" effect="plain" size="small" disable-transitions v-if="item.isHidden">隐藏的</el-tag>
                </div>
                <el-button class="move-btn" type="text" icon="el-icon-rank"></el-button>
              </v-list-item>
              <el-empty description="无测试项目" v-if="!testItemList.length" :image-size="200"></el-empty>
            </draggable>
          </el-scrollbar>
        </el-col>
        <el-col :span="12">
          <div class="list-header">
            <label for="" class="radio-label">站别测试项目</label>
            <el-input v-model="searchStationTestItemKw" placeholder="请输入测试项目名称或调用命令" size="small" clearable></el-input>
            <div class="action-buttons">
              <el-upload action="#" :before-upload="() => false" :on-change="importTestItemFromTextFile" :limit="1" :file-list="fileList">
                <el-button class="import-btn" size="small">导入</el-button>
              </el-upload>

              <el-tooltip content="将此站的测试项目导出为txt" effect="dark">
                <el-button size="small" @click="exportTextItem2File">导出</el-button>
              </el-tooltip>

              <el-badge :is-dot="isChanged" type="danger">
                <el-button class="save-btn m-l-10px" type="success" size="small" @click="save" :disabled="!isChanged" :loading="isLoading">保存更改
                </el-button>
              </el-badge>
            </div>
          </div>
          <el-scrollbar ref="stationTestItemScrollbar">
            <draggable ref="stationTestItemDragList" group="abc" class="v-list draggable-list" :list="fliteredStationTestItem" handle=".move-btn" animation="240" chosenClass="chosenClass" @choose="onTestItemDragListChoose" @unchoose="onTestItemDragListUnchoose" @dragover.native="setDragingDirection">
              <v-list-item v-for="(item, i) in fliteredStationTestItem" :key="i" :class="{
                  isHidden: item.isHidden,
                  isAlwaysRun: item.isAlwaysRun,
                }"> 
                <div>
                  <span class="sort-index">{{ item.reallyIndex }}</span>
                  {{ getTestItemName(item) }}
                </div>
                <div class="config-tags">
                  <el-tag type="success" effect="dark" size="small" disable-transitions v-if="item.isAlwaysRun">始终执行</el-tag>
                  <el-tag type="info" effect="plain" size="small" disable-transitions v-if="item.isHidden">隐藏的</el-tag>
                </div>

                <div class="buttons">
                  <el-button class="move-btn" type="text" icon="el-icon-rank"></el-button>
                  <el-button type="text" class="danger delete-btn" icon="el-icon-delete" @click="onRemoveTestItem(i, item)"></el-button>
                </div>
              </v-list-item>
              <el-empty description="此站别还没有测试项目" v-if="!parsedStationTestItemList.length" :image-size="200"></el-empty>
            </draggable>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script src="./index.vue.ts" />
<style src="./index.vue.scss" scoped lang="scss" />