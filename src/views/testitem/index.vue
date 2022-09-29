<template>
  <div>
    <!-- 顶栏 -->
    <el-header>
      <!-- 选择机型 -->
      <el-row :gutter="26" style="width:100%">
        <el-col :span="12">
          <label class="radio-label" for="model-select">机型</label>
          <el-select @change="search" id="model-select" v-model="model" value-key="name" filterable placeholder="请选择机型">
            <el-option v-for="item in modelList" :key="item.id" :label="item.name" :value="item"></el-option>
          </el-select>
          <el-button type="success" class="m-l-10px" @click="
              setTestItemModal({
                visible: true,
                title: '添加测试项目',
                addMode: true,
                formData:defaultTestItemFormData  
              })
            ">
            添加测试项目
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-input v-model="searchKw" class="search-input right" placeholder="搜索测试项目" clearable prefix-icon="el-icon-search">
            <el-select @change="search" placeholder="请选择站别" slot="prepend" style="width: 150px" v-model="currentStation" value-key="name" clearable filterable>
              <el-option v-for="s in stationList" :key="s.id" :label="s.name" :value="s">
              </el-option>
            </el-select>
          </el-input>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-scrollbar v-loading="tableLoading" element-loading-text="加载测试项目中">
        <el-table :data="tableData">
          <el-table-column v-for="col in columns" :prop="col.key" :key="col.key" :label="col.label" :width="col.width">
            <template #default="{ row }">
              <el-switch @change="updateTestItemIsHidden(row.id, $event)" v-if="col.key == 'isHidden'" v-model="row[col.key]" active-color="#13ce66" />
              <el-switch @change="updateTestItemIsAlwaysRun(row.id, $event)" v-else-if="col.key == 'isAlwaysRun'" v-model="row[col.key]" active-color="#13ce66" />

              <span v-else-if="col.key == 'upperValue'">
                {{ row['testItem'][col.key] }}
              </span>
              <span v-else-if="col.key == 'lowerValue'">
                {{ row['testItem'][col.key] }}
              </span>
              <span v-else-if="col.key == 'no'">
                {{ row['testItem'][col.key] }}
              </span>
              <span v-else-if="col.key === 'name'">{{
                getTestItemName(row)
              }}</span>

              <span v-else> {{ row[col.key] }}</span>
            </template>
          </el-table-column>

          <!-- 操作栏 -->
          <el-table-column fixed="right" align="center" label="操作" width="200">
            <template #default="{ row }">
              <el-button plain size="mini" icon="el-icon-edit" class="m-r-10px" @click="
                  setTestItemModal({
                    visible: true,
                    addMode: false,
                    title: '编辑测试项目',
                    formData: getTestItemById(row.id),
                  })
                ">
                编辑
              </el-button>

              <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" @click="showDeleteTestItemDialog(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-main>

    <!-- 添加 / 编辑 测试项目模态框 -->
    <v-modal-box ref="test-item-modal" :addMode="testItemModal.addMode" :title="testItemModal.title" :visible.sync="testItemModal.visible" v-model="testItemModal.formData" @submit="testItemModal.onSubmit" :rules="testItemModal.rules">
      <template #default="{ formData }">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="调用命令" prop="cmd">
          <el-input v-model="formData.cmd">
            <div slot="append">
              <el-button @click="publicTestItemPanelVisible = true">
                <el-tooltip content="点击选择通用测试项目" placement="top">
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
                    {{item.value}} {{item.label}}
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

    <!-- 删除测试项目 -->
    <el-dialog class="delete-test-item-dialog" title="删除测试项目" :visible.sync="deleteTestItemDialog.visible" width="30%" destroy-on-close>
      <h4 v-show="!deleteTestItemContent">你确定要删除吗？</h4>
      <el-alert title="将一并从以下站别中删除" type="warning" show-icon :closable="false" v-show="deleteTestItemContent">
      </el-alert>
      <div v-show="deleteTestItemContent"></div>
      <ul class="where-used" v-html="deleteTestItemContent"></ul>
      <span slot="footer">
        <el-button @click="deleteTestItemDialog.visible = false">
          取消
        </el-button>
        <el-button type="primary" @click="deleteTestItem">确定</el-button>
      </span>
    </el-dialog>

    <!-- 通用测试项目面板 -->
    <el-dialog title="通用测试项目" :visible.sync="publicTestItemPanelVisible" width="80%">
      <el-tabs v-model="currentPublicTestItemGroupSummary" type="card" tab-position="top" @tab-click="onPTI_GroupSelected">
        <el-tab-pane v-for="item in publicTestItemGroups" :key="item.id" :label="item.summary" :name="item.summary">
        </el-tab-pane>
        <PublicTestItemForm ref="publicTestItemForm" v-if="currentPublicTestItemGroup" :group="currentPublicTestItemGroup" :testItems="publicTestItems" />

      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="publicTestItemPanelVisible = false">取 消</el-button>
        <el-button type="primary" @click="createCmd">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.vue.ts" />
<style src="./index.vue.scss" lang="scss" scoped />
