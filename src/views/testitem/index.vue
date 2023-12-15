<template>
  <div>
    <!-- [\u4e00-\u9fa5]+ 搜索中文， 替换原本的内容+格式 $t('$&') -->

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
              formData: defaultTestItemFormData
            })
          ">
            添加测试项目
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-input v-model="searchKw" class="search-input right" placeholder="搜索测试项目" clearable
            prefix-icon="el-icon-search">
            <el-select @change="search" placeholder="请选择站别" slot="prepend" style="width: 150px" v-model="currentStation"
              value-key="name" clearable filterable>
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
            <template #default="{row}">
              <!-- <el-switch @change="updateTestItemIsHidden(row.id, $event)" v-if="col.key == 'isHidden'"
                v-model="row[col.key]" active-color="#13ce66" />
              <el-switch @change="updateTestItemIsAlwaysRun(row.id, $event)" v-else-if="col.key == 'isAlwaysRun'"
                v-model="row[col.key]" active-color="#13ce66" /> -->

              <span v-if="col.key == 'upperValue'">
                {{ row['testItem'][col.key] }}
              </span>
              <span v-else-if="col.key == 'lowerValue'">
                {{ row['testItem'][col.key] }}
              </span>
              <span v-else-if="col.key == 'no'">
                {{ row['testItem'][col.key] }}
              </span>
              <span v-else-if="col.key == 'unit'">
                {{ row['testItem'][col.key] }}
              </span>
              <span v-else-if="col.key === 'name'">{{
                getTestItemName(row)
              }}</span>

              <span v-else> {{ row[col.key] }}</span>
            </template>
          </el-table-column>

          <el-table-column label="上下限" width="160px">
            <template #default="{row}">
              {{ getTestItemLimitText(row.testItem.lowerValue, row.testItem.upperValue, row.testItem.no,
                row.testItem.unit) }}
            </template>
          </el-table-column>

          <el-table-column label="测试站" align="center" width="200px">
            <template #default="{row}">
              {{ row.whereUsed }}
            </template>
          </el-table-column>

          <el-table-column label="状态" align="center" width="100px">
            <template #default="{row}">
              <div class="status-bar">
                <el-popover placement="top-start" content="测试项目在每次测试始终运行" v-if="row.isAlwaysRun">
                  <span slot="reference" class="status-item always-run">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12 4C9.25144 4 6.82508 5.38626 5.38443 7.5H8V9.5H2V3.5H4V5.99936C5.82381 3.57166 8.72764 2 12 2C17.5228 2 22 6.47715 22 12H20C20 7.58172 16.4183 4 12 4ZM4 12C4 16.4183 7.58172 20 12 20C14.7486 20 17.1749 18.6137 18.6156 16.5H16V14.5H22V20.5H20V18.0006C18.1762 20.4283 15.2724 22 12 22C6.47715 22 2 17.5228 2 12H4Z">
                      </path>
                    </svg>
                  </span>
                </el-popover>

                <el-popover placement="top-start" content="测试项目在模板程序中被隐藏" v-if="row.isHidden">
                  <span slot="reference" class="status-item hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M9.34268 18.7819L7.41083 18.2642L8.1983 15.3254C7.00919 14.8874 5.91661 14.2498 4.96116 13.4534L2.80783 15.6067L1.39362 14.1925L3.54695 12.0392C2.35581 10.6103 1.52014 8.87466 1.17578 6.96818L3.14386 6.61035C3.90289 10.8126 7.57931 14.0001 12.0002 14.0001C16.4211 14.0001 20.0976 10.8126 20.8566 6.61035L22.8247 6.96818C22.4803 8.87466 21.6446 10.6103 20.4535 12.0392L22.6068 14.1925L21.1926 15.6067L19.0393 13.4534C18.0838 14.2498 16.9912 14.8874 15.8021 15.3254L16.5896 18.2642L14.6578 18.7819L13.87 15.8418C13.2623 15.9459 12.6376 16.0001 12.0002 16.0001C11.3629 16.0001 10.7381 15.9459 10.1305 15.8418L9.34268 18.7819Z">
                      </path>
                    </svg>
                  </span>
                </el-popover>

                <el-popover placement="top-start" content="未被使用的测试项目" v-if="!row.whereUsed">
                  <span slot="reference" class="status-item un-used">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path
                        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z">
                      </path>
                    </svg>
                  </span>
                </el-popover>
              </div>
            </template>
          </el-table-column>

          <!-- 操作栏 -->
          <el-table-column fixed="right" align="center" label="操作" width="300">
            <template #default="{row}">
              <el-button plain size="mini" icon="" class="m-r-10px" @click="
                setTestItemModal({
                  visible: true,
                  addMode: true,
                  title: '添加测试项目',
                  formData: getTestItemCopyById(row.id)
                })
              ">
                复制
              </el-button>

              <el-button plain size="mini" icon="el-icon-edit" class="m-r-10px" @click="
                setTestItemModal({
                  visible: true,
                  addMode: false,
                  title: '编辑测试项目',
                  formData: getTestItemById(row.id)
                })
              ">
                编辑
              </el-button>

              <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete"
                @click="showDeleteTestItemDialog(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-main>

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

    <!-- 删除测试项目 -->
    <el-dialog class="delete-test-item-dialog" title="删除测试项目" :visible.sync="deleteTestItemDialog.visible" width="30%"
      destroy-on-close>
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
<style src="./index.vue.scss" lang="scss" scoped />
