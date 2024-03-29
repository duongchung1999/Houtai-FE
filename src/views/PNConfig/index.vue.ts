import { ModelAPI } from '@/api/modelAPI'
import { PartNoAPI } from '@/api/partNoAPI'
import FormGenerator from '@/components/formGenerator/FormGenerator.vue'
import Parser from '@/components/formGenerator/parser'
import { Model } from '@/entity/model'
import { PartNo } from '@/entity/partNo'
import { PartNoConfig } from '@/entity/partNoConfig'
import { modelModule, userModule } from '@/store/modules'
import { INIString2Obj } from '@/utils/index'
import Vue from 'vue'
import JsonViewer from 'vue-json-viewer'
import 'vue-json-viewer/style.css'
import * as MonacoEditor from 'monaco-editor'
import { Component, Watch } from 'vue-property-decorator'

@Component({ name: 'PNConfigPage', components: { Parser, FormGenerator, JsonViewer } })
export default class PNConfigPage extends Vue {
  get model(): Model { return modelModule.model }
  set model(m: Model) {
    this.$nextTick(async() => {
      await modelModule.setModel(m)
      this.PNList = []
      this.priviewEditor?.setValue('')
      this.currentPNConfig = new PartNoConfig()
      this.PNConfigList = []

      this.PNConfigList = await PartNoAPI.getPartNoConfigList(this.model.id)

      if (this.PNConfigList[0]) {
        this.currentPNConfig = this.PNConfigList[0]
        this.onSelectConfig(this.currentPNConfig)
        this.PNList = await PartNoAPI.getList(this.currentPNConfig.id)
      }
    })
  }

  get modelList() { return modelModule.modelList }

    PNConfigSearchKeyWord = '';

    currentPNConfig = new PartNoConfig();
    PNConfigList: PartNoConfig[] = [];

    PNList: PartNo[] = [];
    PN: PartNo = new PartNo();

    PNConfigPanel = { visible: false }

    PNPanel = { visible: false }

    PNConfTemplate = { visible: false }

    addPartNoDialog = {
      visible: false,
      inputValue: ''
    }

    /** 编辑料号配置editor */
    pnConfigEditor: MonacoEditor.editor.IStandaloneCodeEditor = null;
    @Watch('PNConfigPanel.visible')
    async onPnConfigEditorMounted(v: boolean) {
      if (!v) return

      await this.$nextTick()
      const doc = document.querySelector('.pn-config-editor') as HTMLElement
      console.info(doc)
      if (!doc) return

      let value = this.currentPNConfig?.config
      value = value || ''
      this.pnConfigEditor = MonacoEditor.editor.create(
        doc,
        {
          value,
          language: 'ini',
          automaticLayout: true,
          theme: 'vs-dark'
        }
      )
    }

    /** 预览料号配置editor */
    priviewEditor: MonacoEditor.editor.IStandaloneCodeEditor = null;
    async onPriviewEditorMounted() {
      let value = this.currentPNConfig?.config
      value = value || ''
      this.priviewEditor = MonacoEditor.editor.create(
        document.querySelector('.config-editor'),
        {
          value,
          language: 'ini',
          automaticLayout: true,
          theme: 'vs-dark'
        }
      )
    }

    /** 机型的模板配置editor */
    templateConfigEditor: MonacoEditor.editor.IStandaloneCodeEditor = null;
    @Watch('PNConfTemplate.visible')
    async ontemplateConfigEditorMounted(v: boolean) {
      if (!v) return
      await this.$nextTick()

      const value = this.model?.pnConfigTemplate
      this.templateConfigEditor = MonacoEditor.editor.create(
        document.querySelector('.template-config-editor'),
        {
          value,
          language: 'ini',
          automaticLayout: true,
          theme: 'vs-dark'
        }
      )
    }

    /** 删除料号 */
    async deletePN(partNoId: number) {
      await PartNoAPI.del(partNoId)
      this.PNList = await PartNoAPI.getList(this.currentPNConfig.id)
      this.$message.success('删除成功')
    }

    /** 添加料号配置 */
    async addPNConfig() {
      const PNConfig = new PartNoConfig({
        title: '配置' + Date.now(),
        config: '空配置',
        PartNoIdList: [],
        modelId: this.model.id
      })

      const addedPNConfig = await PartNoAPI.addPartNoConfig(PNConfig)
      this.PNConfigList = await PartNoAPI.getPartNoConfigList(this.model.id)
      // this.currentPNConfig = addedPNConfig;
      this.onSelectConfig(addedPNConfig)
      this.$message.success('添加料号配置')
    }

    /** 删除料号配置 */
    async deletePNConfig(id: number) {
      this.$confirm(this.$t('是否删除'), this.$t('删除配置'))
        .then(async _ => {
          await PartNoAPI.deletePartNoConfig(id)
          this.PNConfigList = await PartNoAPI.getPartNoConfigList(this.model.id)
          if (this.currentPNConfig.id == id) {
            this.PNList = []
            this.currentPNConfig = new PartNoConfig()
          }
          this.$message.success(this.$t('删除成功'))
        })
        .catch(e => console.info(e))
    }

    /** 点击料号配置项目时 */
    async onSelectConfig(PNConfig: PartNoConfig) {
      this.currentPNConfig = await PartNoAPI.getPartNoConfig(PNConfig.id)
      this.PNList = await PartNoAPI.getList(this.currentPNConfig.id)

      let value = this.currentPNConfig?.config
      value = value || ''

      this.pnConfigEditor?.setValue(value)
      this.priviewEditor?.setValue(value)
    }

    /** 更新料号配置 */
    async updatePNConfig() {
      this.currentPNConfig.config = this.pnConfigEditor.getValue()
      this.currentPNConfig.modelId = this.model.id

      // todo 检查料号格式是否与配置模板一致
      let currentConfigObj = null
      let configTemplateObj = null

      try {
        currentConfigObj = INIString2Obj(this.currentPNConfig.config)
        configTemplateObj = INIString2Obj(this.model.pnConfigTemplate)
      } catch (error) {
        this.$message.error('必须是Ini格式的配置')
        return
      }

      for (const key in currentConfigObj) {
        if (typeof (key) === 'object') {
          const section = key as any
          for (const sectionKey in section) {
            if (configTemplateObj[section][sectionKey] === undefined) {
              this.$message.error('与配置模板中的配置不一致')
              return
            }
          }
        }
        if (configTemplateObj[key] === undefined) {
          this.$message.error('与配置模板中的配置不一致')
          return
        }
      }

      await PartNoAPI.updatePartNoConfig(this.currentPNConfig)
      this.PNConfigList = await PartNoAPI.getPartNoConfigList(this.model.id)
      this.onSelectConfig(this.currentPNConfig)
      this.$message.success(this.$t('保存成功'))
    }

    async savePnConfigTemplate() {
      const configTemplate = this.templateConfigEditor.getValue()
      if (!this.checkIniFormat(configTemplate)) return
      this.model.pnConfigTemplate = configTemplate
      await ModelAPI.update(this.model)
      this.$message.success(this.$t('保存成功'))
      this.PNConfTemplate.visible = false
    }

    checkIniFormat(iniConfig: string) {
      try {
        console.info(INIString2Obj(iniConfig))
      } catch (error) {
        this.$message.error('配置格式错误：' + error)
        return false
      }
      return true
    }

    async addPartNo() {
      const partnoTexts = this.addPartNoDialog.inputValue.split('\n')

      // 迭代生成料号，通过接口添加
      for (const partnoText of partnoTexts) {
        const partNo = new PartNo()
        partNo.no = partnoText.trim()

        if (partNo.no == '') continue

        partNo.partNoConfigID = this.currentPNConfig.id
        partNo.modelId = this.model.id

        await PartNoAPI.add(partNo)
      }

      this.PNList = await PartNoAPI.getList(this.currentPNConfig.id)
      this.addPartNoDialog.visible = false
      this.$message.success('添加料号成功')
    }

    async mounted() {
      await modelModule.getList(userModule.nowUser.id)
      this.model = this.modelList[0]
      this.onPriviewEditorMounted()
    }
}
