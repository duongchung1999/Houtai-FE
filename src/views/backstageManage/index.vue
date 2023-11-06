<template>
  <div>
    <el-header class="df-h-center">
      <label for="" class="radio-label">配置项</label>
      <el-select v-model="currentConfigItem" value-key="key" placeholder="" filterable>
        <el-option v-for="item in keyList" :key="item.id" :label="item.label" :value="item">
        </el-option>
      </el-select>
    </el-header>

    <el-main>
      <el-scrollbar class="main-scrollbar">
        <form-generator @preview="onPreviewForm" :formConf="formConf" v-if="currentConfigItem.key == 'defaultTemplateProgramConfigForm'"></form-generator>
      </el-scrollbar>

      <el-drawer class="config-form-drawer" :with-header="false" :visible.sync="drawerVisible" direction="rtl" size="100%" destroy-on-close>
        <el-row class="priview-row">
          <el-col :span="12">
            <div class="config-editor" style="height: 100vh"></div>
          </el-col>
          <el-col :span="12">
            <div class="right-panel">
              <div class="action-bar">
                <el-button type="text" icon="el-icon-close" @click="drawerVisible = false"></el-button>
              </div>
              <div class="scrollbar-body">
                <el-scrollbar style="height: 100%">
                  <parser class="form-parser" v-if="drawerVisible" :form-conf="formConf" ref="parser" @submit="onSubmitForm" />
                  <div class="form-footer">
                    <el-button type="success" @click="saveFormConf">保存表单</el-button>
                    <el-button type="primary" @click="previewINIConfig">预览INI配置</el-button>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-drawer>
    </el-main>
  </div>
</template>

<!-- <script src="./index.vue.ts" lang="ts"></script> -->
<script lang="ts">
import FormGenerator from '@/components/formGenerator/FormGenerator.vue'
import { formConf } from '@/components/formGenerator/generator/config'
import Parser from '@/components/formGenerator/parser/Parser.vue'
import { BackstageConfig } from '@/entity/bakcstageConfig'
import { backstageConfigModule } from '@/store/modules'
import { Obj2INIString } from '@/utils/index'
import Vue from 'vue'
// import MonacoEditor from "vue-monaco-editor";
import * as MonacoEditor from 'monaco-editor'
import { Component, Watch } from 'vue-property-decorator'

formConf.fields = []

export enum BackstageConfigKeys {
  defaultTemplateProgramConfigForm = 'defaultTemplateProgramConfigForm',
}

@Component({
  name: 'backstageManagePage',
  components: { FormGenerator, Parser }
})
export default class BackstageManagePage extends Vue {
  code = '';
  drawerVisible = false;
  editor: any = null;
  formConf: object = formConf;

  editorOptions: any = {
    readOnly: true
  };

  get keyList(): Array<BackstageConfig> {
    return backstageConfigModule.keyList
  }

  get currentConfigItem(): BackstageConfig {
    return backstageConfigModule.configItem
  }

  set currentConfigItem(configItem: BackstageConfig) {
    if (this.currentConfigItem == configItem) return
    this.$nextTick(async() => {
      if (!configItem.value) {
        await backstageConfigModule.get(configItem.key)
      }
    })
  }

  @Watch('currentConfigItem.value', { immediate: true })
  updateFormConf(v: any) {
    if (!v) return
    if (
      this.currentConfigItem.key !=
      BackstageConfigKeys.defaultTemplateProgramConfigForm
    ) { return }

    this.formConf = typeof v === 'object' ? v : JSON.parse(v)
  }

  // on clicked preview button
  async onPreviewForm() {
    this.drawerVisible = true
    this.$nextTick(() => {
      this.onEditorMounted()
    })
  }

  onEditorMounted() {
    this.editor = MonacoEditor.editor.create(
      document.querySelector('.config-editor'),
      {
        value: '',
        language: 'ini',
        automaticLayout: true,
        readOnly: true,
        theme: 'vs-dark'
      }
    )
    // this.editor = editor;
    // this.editor.updateOptions(this.editorOptions);
    this.previewINIConfig()
  }

  previewINIConfig() {
    const formParser = this.$refs.parser as any
    formParser.submitForm()
  }

  public static builderINIStringFromForm({ formData, formConf }) {
    const configObj = {}
    const configItemList = []
    // 循环表单结构，构建初始配置
    const { fields } = formConf
    for (const field of fields) {
      const fieldName = field.__vModel__
      if (field.type === 'form-item-group') {
        configItemList.push({ key: fieldName, value: null, isGroup: true })
      } else {
        const fieldValue = formData[fieldName]
        const value =
          fieldValue === null || fieldValue === undefined ? null : fieldValue
        configItemList.push({ key: fieldName, value })
      }
    }
    let lastSection = null

    // 构建 config object
    configItemList.forEach((configItem) => {
      if (configItem.isGroup) {
        lastSection = configItem.key
        configObj[lastSection] = {}
        return
      }
      if (lastSection) {
        configObj[lastSection][configItem.key] = configItem.value
      } else {
        configObj[configItem.key] = configItem.value
      }
    })
    return Obj2INIString(configObj)
  }

  // 提交表单回调
  public onSubmitForm({ formData, formConf }) {
    this.editor.setValue(
      BackstageManagePage.builderINIStringFromForm({ formData, formConf })
    )
  }

  // 保存表单配置
  async saveFormConf() {
    this.currentConfigItem.value = JSON.stringify(this.formConf)
    const requestData = new BackstageConfig(this.currentConfigItem)
    await backstageConfigModule.update(requestData)
    this.$message.success('保存成功')
    this.drawerVisible = false
  }

  async mounted() {
    await backstageConfigModule.getKeyList()
    if (!this.currentConfigItem?.id) {
      this.currentConfigItem = this.keyList[0]
    }
  }
}
</script>
<style src="./index.vue.scss" lang="scss" scoped></style>
