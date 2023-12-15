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
          <el-button type="success" class="m-l-10px" @click="
            setTestItemModal({
              visible: true,
              title: '添加测试项目',
              addMode: true,
              formData: defaultTestItemFormData
            })
          ">
            添加测试项目
          </el-button>
        </el-col>
        <el-col :span="12" class="right-action-bar">
          <div>
            <label class="radio-label" for="station-select">站别</label>
            <el-select id="station-select" v-model="station" value-key="name" filterable placeholder="请选择站别">
              <el-option v-for="item in stationList" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
          </div>
          <el-button
            id="export-STI-btn"
            size="medium"
            type="primary"
            @click="exportStationTestItemZipDialog.visible = true"
          >
            导出站别测试项目压缩包
          </el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-main class="content">
      <el-row class="list-row">
        <!-- Column Test Item Left -->
        <el-col :span="12">
          <div class="list-header">
            <label for="" class="radio-label">测试项目</label>
            <el-input
              v-model="searchTestItemKw"
              placeholder="请输入测试项目名称或调用命令"
              size="small"
              clearable
            ></el-input>
          </div>
          <el-scrollbar ref="testItemScrollbar">
            <draggable
              :group="{ name: 'abc', pull: canPull, put: 'false' }"
              :sort="false"
              class="v-list draggable-list"
              :list="fliteredTestItem"
              handle=".move-btn"
              animation="240"
              chosenClass="chosenClass"
              @choose="onTestItemDragListChoose()"
              @unchoose="onTestItemDragListUnchoose"
            >
              <v-list-item
                v-for="(item, i) in fliteredTestItem"
                :key="i"
                :class="{
                  isHidden: item.isHidden,
                  isAlwaysRun: item.isAlwaysRun
                }"
              >
                <el-tooltip :content="item.cmd" placement="right" effect="dark">
                  <div>{{ getTestItemName(item) }}</div>
                </el-tooltip>
                <div class="config-tags">
                  <el-tag type="success" effect="dark" size="small" disable-transitions v-if="item.isAlwaysRun">
                    始终执行
                  </el-tag>
                  <el-tag type="info" effect="plain" size="small" disable-transitions v-if="item.isHidden">
                    隐藏的
                  </el-tag>
                </div>
                <el-button class="move-btn" type="text" icon="el-icon-rank"></el-button>
              </v-list-item>
              <el-empty description="无测试项目" v-if="!testItemList.length" :image-size="200"></el-empty>
            </draggable>
          </el-scrollbar>
        </el-col>

        <!-- Column Test Item Right  -->
        <el-col :span="12">
          <div class="list-header">
            <label for="" class="radio-label">站别测试项目</label>
            <el-input
              v-model="searchStationTestItemKw"
              placeholder="请输入测试项目名称或调用命令"
              size="small"
              clearable
            ></el-input>
            <div class="action-buttons">
              <el-upload
                action="#"
                :before-upload="() => false"
                :on-change="importTestItemFromTextFile"
                :limit="1"
                :file-list="fileList"
              >
                <el-button class="import-btn" size="small">导入</el-button>
              </el-upload>

              <el-tooltip content="将此站的测试项目导出为txt" effect="dark">
                <el-button size="small" @click="exportTextItem2File">导出</el-button>
              </el-tooltip>

              <el-badge :is-dot="isChanged" type="danger">
                <el-button
                  class="save-btn m-l-10px"
                  type="success"
                  size="small"
                  @click="save"
                  :disabled="!isChanged"
                  :loading="isLoading"
                >
                  保存更改
                </el-button>
              </el-badge>
            </div>
          </div>
          <el-scrollbar ref="stationTestItemScrollbar">
            <draggable
              ref="stationTestItemDragList"
              group="abc"
              class="v-list draggable-list"
              :list="fliteredStationTestItem"
              handle=".move-btn"
              animation="240"
              chosenClass="chosenClass"
              @choose="onTestItemDragListChoose"
              @unchoose="onTestItemDragListUnchoose"
              @dragover.native="setDragingDirection"
            >
              <v-list-item
                v-for="(item, i) in fliteredStationTestItem"
                :key="i"
                :class="{
                  isHidden: item.isHidden,
                  isAlwaysRun: item.isAlwaysRun
                }"
              >
                <div class="display-flex flex-1">
                  <span class="sort-index">{{ item.reallyIndex }}</span>
                  <el-tooltip :content="item.cmd" placement="left" effect="dark" class="flex-1">
                    <div>{{ getTestItemName(item) }}</div>
                  </el-tooltip>
                </div>
                <div class="config-tags">
                  <el-tag type="success" effect="dark" size="small" disable-transitions v-if="item.isAlwaysRun">
                    始终执行
                  </el-tag>
                  <el-tag type="info" effect="plain" size="small" disable-transitions v-if="item.isHidden">
                    隐藏的
                  </el-tag>
                </div>

                <el-button plain size="mini" icon="el-icon-edit" class="m-r-10px" @click="
                    setTestItemModal({
                      visible: true,
                      addMode: false,
                      title: '编辑测试项目',
                      formData: getTestItemById(item.id)
                    })
                  ">
                  编辑
                </el-button>

                <div class="buttons">
                  <el-button class="move-btn" type="text" icon="el-icon-rank"></el-button>
                  <el-button
                    type="text"
                    class="danger delete-btn"
                    icon="el-icon-delete"
                    @click="onRemoveTestItem(i, item)"
                  ></el-button>
                </div>
              </v-list-item>
              <el-empty
                description="此站别还没有测试项目"
                v-if="!parsedStationTestItemList.length"
                :image-size="200"
              ></el-empty>
            </draggable>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-main>

    <el-dialog
      class="export-STI-diolag"
      title="选择要导出的站别"
      :visible.sync="exportStationTestItemZipDialog.visible"
      width="50%"
    >
      <div>
        <el-checkbox-group v-model="exportStationTestItemZipDialog.selectedStations">
          <el-checkbox v-for="s in stationList" :key="s.id" :label="s">
            {{ s.name }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer">
        <el-button @click="exportStationTestItemZipDialog = false">取消</el-button>
        <el-button type="primary" @click="exportStationTestItemZip()">导出</el-button>
      </span>
    </el-dialog>

     <!-- 添加 / 编辑 测试项目模态框 -->
     <v-modal-box ref="test-item-modal" :addMode="testItemModal.addMode" :title="testItemModal.title"
      :visible.sync="testItemModal.visible" v-model="testItemModal.formData" @submit="testItemModal.onSubmit"
      :rules="testItemModal.rules">
      <template #default="{formData}">
        <el-form-item :label="$t('名称')" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('调用命令')" prop="cmd">
          <el-input v-model="formData.cmd">
            <div slot="append">
              <el-button @click="publicTestItemPanelVisible = true">
                <el-tooltip :content="$t('点击选择通用测试项目')" placement="top">
                  <i class="el-icon-s-opportunity" />
                </el-tooltip>
              </el-button>
            </div>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="9">
            <el-form-item label="下限" prop="lowerValue">
              <el-input v-model="formData.lowerValue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="上限" prop="upperValue" label-width="50px">
              <el-input v-model="formData.upperValue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单位" prop="unit" label-width="50px">
              <el-input v-model="formData.unit"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="比对编号" size="normal">
              <el-select v-model="formData.no" value-key="no" placeholder="请选择比对编号">
                <el-option-group v-for="group in NoList" :key="group.groupName" :label="group.groupName">
                  <el-option v-for="item in group.items" :key="item.value" :label="item.label" :value="item.value">
                    {{ item.value }} {{ item.label }}
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="隐藏此项" prop="isHidden">
              <el-switch v-model="formData.isHidden" active-color="#13ce66">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="始终执行" prop="isAlwaysRun">
              <el-switch v-model="formData.isAlwaysRun" active-color="#13ce66">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </v-modal-box>

    <!-- 通用测试项目面板 -->
    <el-dialog title="通用测试项目" :visible.sync="publicTestItemPanelVisible" width="80%">
      
      <label class="radio-label padding-left-20" for="model-select">通用测试项目:</label>
      <el-select @change="onPTI_GroupSelected" id="model-select" v-model="currentPublicTestItemGroupSummary" value-key="summary" filterable placeholder="通用测试项目">
        <el-option v-for="item in publicTestItemGroups" :key="item.id" :label="item.summary" :value="item.summary"></el-option>
      </el-select>
      <PublicTestItemForm
          ref="publicTestItemForm"
          v-if="currentPublicTestItemGroup"
          :group="currentPublicTestItemGroup"
          :testItems="publicTestItems"
          :cmdOfTestItem="cmdInTestItem"
      />
      
      <!-- <el-tabs v-model="currentPublicTestItemGroupSummary" type="card" tab-position="top"
        @tab-click="onPTI_GroupSelected">
        <el-tab-pane v-for="item in publicTestItemGroups" :key="item.id" :label="item.summary" :name="item.summary">
        </el-tab-pane>
        <PublicTestItemForm ref="publicTestItemForm" v-if="currentPublicTestItemGroup" :group="currentPublicTestItemGroup"
          :testItems="publicTestItems" />

      </el-tabs> -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="publicTestItemPanelVisible = false">取 消</el-button>
        <el-button type="primary" @click="createCmd">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.vue.ts" />
<style src="./index.vue.scss" scoped lang="scss" />
