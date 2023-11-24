<template>
  <el-container>
    <!-- [\u4e00-\u9fa5]+ 搜索中文， 替换原本的内容+格式 $t('$&') -->
    <el-header height="60px">
      <el-row :gutter="26" style="width:100%">
        <el-col :span="12">
          <label class="radio-label" for="model-select">{{ $t('机型') }}</label>
          <el-select id="model-select" clearable v-model="model" value-key="name" filterable :placeholder="$t('请选择机型')">
            <el-option v-for="item in modelList" :key="item.id" :label="item.name" :value="item"></el-option>
          </el-select>
          <el-button type="success" class="right" @click="setModelModal({visible: true, addMode: true, title: $t('添加机型')})
            ">
            {{ $t('添加机型') }}
          </el-button>
        </el-col>

        <el-col :span="12">
          <el-button type="success" class="right" @click="setStationModal({
            visible: true,
            title: $t('添加站别'),
            addMode: true
          })
            ">{{ $t('添加站别') }}</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-row class="list-row" :gutter="10">
        <!-- 机型列表 -->
        <el-col :span="12">
          <v-list>
            <v-list-item v-for="(item, i) in filteredModelList" :key="i" @click="model = item">
              {{ item.name }}
              <div>
                <span class="locked" v-if="item.dynamicCode">
                  {{ parseTime(item.dynamicCode.expireDate, '{y}年{m}月{d}日') }}到期
                  <i class="el-icon-lock m-r-10px"></i>
                </span>

                <el-dropdown type="text">
                  <el-button type="text" icon="el-icon-s-operation"></el-button>

                  <el-dropdown-menu slot="dropdown" @click.native="model = item">
                    <el-dropdown-item icon="el-icon-edit" @click.native="setModelModal({
                      title: $t('编辑机型名称'),
                      visible: true,
                      addMode: false,
                      formData: item
                    })
                      ">
                      {{ $t('修改名称') }}</el-dropdown-item>

                    <el-dropdown-item v-if="!item.dynamicCode" icon="el-icon-key" @click.native="showDynamicCodeModal">{{
                      $t('设置密码') }}</el-dropdown-item>
                    <el-dropdown-item v-else icon="el-icon-view" @click.native="showDynamicCode">{{ $t('显示密码')
                    }}</el-dropdown-item>
                    <!-- Show Config Model  -->
                    <el-dropdown-item icon="el-icon-setting" @click.native="showConfigEditorModel()">
                    {{ $t('编辑配置') }}</el-dropdown-item>

                    <el-dropdown-item divided icon="el-icon-delete" class="danger"
                      @click.native="deleteModeDialog = {visible: true, model: item}">
                      {{ $t('删除') }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </v-list-item>
            <el-empty :description="$t('无机型')" v-if="!modelList.length" :image-size="200"></el-empty>
          </v-list>
        </el-col>

        <!-- 站别列表 -->
        <el-col :span="12">
          <v-list>
            <v-list-item v-for="(s, i) in stationList" :key="i" @click="station = s">
              {{ s.name }}
              <el-dropdown type="text" @click.native.stop>
                <el-button type="text" icon="el-icon-s-operation" class=""></el-button>

                <el-dropdown-menu slot="dropdown" @click.native="station = s">
                  <el-dropdown-item icon="el-icon-edit" @click.native="setStationModal({
                    visible: true,
                    title: $t('编辑站别名称'),
                    formData: s,
                    addMode: false
                  })
                    ">
                    {{ $t('修改名称') }}</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-setting" @click.native="showConfigEditor()">
                    {{ $t('编辑配置') }}</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteStation(s)" divided icon="el-icon-delete" class="danger">
                    {{ $t('删除') }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </v-list-item>
            <el-empty :description="$t('此机型没有站别')" v-if="!stationList.length" :image-size="200"></el-empty>
          </v-list>
        </el-col>
      </el-row>
    </el-main>

    <!-- 添加/编辑 机型模态框 -->
    <v-modal-box :addMode="modelModal.addMode" :title="$t(modelModal.title)" :visible.sync="modelModal.visible"
      :columns="modelModal.columns" v-model="modelModal.formData" @submit="modelModal.onSubmit"></v-modal-box>

    <!-- 添加/编辑 站别模态框 -->
    <v-modal-box :addMode="stationModal.addMode" :title="$t(stationModal.title)" :visible.sync="stationModal.visible"
      :columns="stationModal.columns" v-model="stationModal.formData" @submit="stationModal.onSubmit">
    </v-modal-box>

    <!-- 设置动态密码 -->
    <v-modal-box :addMode="false" :title="$t('设置动态密码')" :visible.sync="dynamicCodeModal.visible"
      v-model="dynamicCodeModal.formData" @edit="setDynamicCode">
      <template #default="{formData}">
        <el-form-item :label="$t('动态密码')" prop="code">
          <span class="dynamic-code m-r-10px">{{ formData.code }}</span>
          <el-button type="text" size="default" @click="refreshDynamicCode(formData)">{{ $t('刷新') }}</el-button>
        </el-form-item>
        <el-form-item :label="$t('过期时间')" prop="expireDate" :rules="expiredRules">
          <el-date-picker v-model="formData.expireDate" type="date" :placeholder="$t('到期时间')">
          </el-date-picker>
        </el-form-item>
      </template>
    </v-modal-box>

    <!-- 删除机型对话框，删除机型需要输入机型名称后才能删除，确保删除的重要性 -->
    <el-dialog :title="$t('删除机型')" :visible.sync="deleteModeDialog.visible" width="50%">
      <div class="delete-model-dialog-content">
        <span>此操作还会删除对应的站别和测试项目，要删除此机型请输入<span class="delete-model-text">{{
          deleteModeDialog.model.name }}</span></span>
        <el-input v-model="deleteModeDialog.userInput" placeholder="请输入要删除的机型的名称" clearable></el-input>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteModeDialog.visible = false">{{ $t('取消') }}</el-button>
        <el-button type="danger" @click="deleteModel(deleteModeDialog.model)">{{ $t('删除') }}</el-button>
      </div>
    </el-dialog>

    <!-- 显示动态密码对话框，显示动态密码，包含一个删除动态密码的按钮 -->
    <el-dialog :title="$t('动态密码')" :visible.sync="showDynamicCodeDialog.visible" width="50%">
      <div class="show-dynamic-code-dialog-content">
        <span>{{ $t('动态密码') }}：<span class="dynamic-code m-r-10px">{{ showDynamicCodeDialog.dynamicCode.code
        }}</span></span>
        <el-button type="danger" plain @click="deleteDynamicCode(showDynamicCodeDialog.dynamicCode)">{{ $t('删除')
        }}</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDynamicCodeDialog.visible = false">{{ $t('关闭') }}</el-button>
      </div>
    </el-dialog>

    <!-- Form config Station -->
    <el-drawer class="config-form-drawer" :with-header="false" :visible.sync="drawerVisible" direction="rtl" size="100%"
      destroy-on-close>
      <el-row class="priview-row">
        <el-col :span="12">
          <div class="config-editor" style="height: 100vh"></div>
        </el-col>
        <el-col :span="12">
          <div class="right-panel">
            <div class="action-bar">
              <div id="save-btn">
                <el-button type="success" size="small" @click="saveConfig">{{ $t('保存配置') }}</el-button>
              </div>
              <el-button type="text" icon="el-icon-close" @click="drawerVisible = false"></el-button>
            </div>
            <div class="scrollbar-body">
              <el-scrollbar style="height: 100%">
                <parser :key="formParserKey" class="form-parser" v-if="drawerVisible" :form-conf="defaultConfigForm"
                  ref="parser" @submit="onSubmitForm" @formDataChange="onFormDataChange" />
              </el-scrollbar>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-drawer>
  </el-container>
</template>
<script src="./index.vue.ts" />
<style src="./index.vue.scss" scoped lang="scss" />
