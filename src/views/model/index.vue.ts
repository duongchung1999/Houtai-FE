import { formConf } from '@/components/formGenerator/generator/config'
import Parser from '@/components/formGenerator/parser'
import { Model } from '@/entity/model'
import { Station } from '@/entity/station'
import { backstageConfigModule, modelModule, stationModule, userModule } from '@/store/modules'
import { INIString2Obj, Obj2INIString, parseTime } from '@/utils/index'
import { debounce } from 'throttle-debounce'
import Vue from 'vue'
import * as MonacoEditor from 'monaco-editor'
import { Component, Watch } from 'vue-property-decorator'
import BackstageManagePage, { BackstageConfigKeys } from '../backstageManage/index.vue'
import { DynamicCode } from '@/entity/dynamicCode'
import { DynamicCodeAPI } from '@/api/dynamicCodeAPI'
import { getTranslationDate } from '@/multi-language/multi-language'

formConf.fields = []
function limitExpireDate(rule, value: Date, callback) {
  const time = value.getTime()
  const now = Date.now()
  if (time < now) {
    callback(new Error('不能选择过去的日期'))
  } else if (time > now + 1000 * 60 * 60 * 24 * 30) {
    callback(new Error('有效期不能超过30天'))
  } else {
    callback()
  }
}

@Component({ name: 'ModelPage', components: { Parser } })
export default class ModelPage extends Vue {
  // 显示动态密码对话框
  showDynamicCodeDialog = {
    visible: false,
    dynamicCode: new DynamicCode()
  }

  // 删除机型对话框
  deleteModeDialog = {
    visible: false,
    model: {
      name: ''
    },
    userInput: ''
  }

  modelModal = {
    visible: false,
    title: '',
    formData: {
      name: ''
    },
    addMode: false,
    columns: [
      {
        key: 'name',
        label: '机型名称',
        rules: [{ required: true, message: '请输入机型名称' }]
      }
    ],
    onSubmit(formData: any) {}
  }

  stationModal = {
    visible: false,
    title: '',
    formData: {
      name: ''
    },
    columns: [{ key: 'name', label: '站别名称' }],
    addMode: false,
    rules: {
      name: [{ required: true, message: '请输入站别名称' }]
    },
    onSubmit(formData: any) {}
  }

  code = ''
  drawerVisible = false
  editor: any = null
  defaultConfigForm: any = formConf
  toAddedStationName = ''
  isFormConfigModel = true 

  editorOptions: any = {
    readOnly: true
  }

  get model(): Model {
    return modelModule.model
  }

  set model(v: Model) {
    if (v === modelModule.model) return
    this.$nextTick(async () => {
      modelModule.setModel(v)
      // this list must be cleared before fetching
      stationModule.stationList.length = 0
      await stationModule.setStation(new Station())
      if (!(v && v.id)) return
      await stationModule.getList(this.model.id)
    })
  }

  get station(): Station {
    return stationModule.station
  }

  set station(v: Station) {
    this.$nextTick(async () => {
      await stationModule.setStation(v)
    })
  }

  get filteredModelList(): Model[] {
    if (this.model && this.model.id) {
      return [this.model]
    }
    return modelModule.modelList
  }

  get modelList() {
    return modelModule.modelList
  }

  get stationList() {
    return stationModule.stationList
  }

  get nowUserLang() {
    return userModule.nowUser.lang
  }

  formParserKey = Date.now()

  /** 设置动态密码框 */
  dynamicCodeModal = {
    visible: false,
    formData: new DynamicCode()
  }

  /** 表单的过期时间的验证规则 */
  expiredRules = [
    { required: true, message: '请选择过期时间', trigger: 'blur' },
    { validator: limitExpireDate, trigger: 'blur' }
  ]

  parseTime = parseTime

  onSubmitForm({ formData, formConf }) {
    this.editor.setValue((BackstageManagePage as any).builderINIStringFromForm({ formData, formConf }))
  }

  async onEditorMounted() {
    this.isFormConfigModel = false;
    this.editor = MonacoEditor.editor.create(document.querySelector('.config-editor'), {
      value: '',
      language: 'ini',
      automaticLayout: true,
      readOnly: true,
      theme: 'vs-dark'
    })

    // Get form config module
    await backstageConfigModule.get(BackstageConfigKeys.defaultTemplateProgramConfigForm)
    this.defaultConfigForm = JSON.parse(backstageConfigModule.configItem.value)
    
    // Add value of config station in form config
    if (this.station.config) {
      this.initDefaultConfigForm(this.station.config)
    }

    // Add value of config station in screen code config
    this.formParserKey = Date.now()
    const code = this.station?.config ? this.station.config : ''
    this.editor.setValue(code)
  }

  async onEditorMountedModel() {    
    this.isFormConfigModel = true;
    this.editor = MonacoEditor.editor.create(document.querySelector('.config-editor'), {
      value: '',
      language: 'ini',
      automaticLayout: true,
      readOnly: true,
      theme: 'vs-dark'
    })

    // Get form config module
    await backstageConfigModule.get(BackstageConfigKeys.defaultTemplateProgramConfigForm)
    this.defaultConfigForm = JSON.parse(backstageConfigModule.configItem.value)
  }

  /** 用ini配置字符串初始化默认配置表单 */
  initDefaultConfigForm(INIConfigStr: string) {
    const configObj = INIString2Obj(INIConfigStr)
    let lastSection = null
    for (const field of this.defaultConfigForm.fields) {
      let configValue = null
      if (field.type === 'form-item-group') {
        lastSection = field.__vModel__
        continue
      }
      if (!lastSection) {
        configValue = configObj[field.__vModel__]
      } else if (configObj[lastSection]) {
        configValue = configObj[lastSection][field.__vModel__]
      }
      if (configValue !== null || configValue !== undefined) {
        // 使用默认值来间接初始化表单
        field.__config__.defaultValue = configValue
      }
    }
    this.formParserKey = Date.now()
  }

  async saveConfig() {
    const parser = this.$refs.parser as any
      parser.submitForm()
    if(this.isFormConfigModel) {
       stationModule.stationList.forEach(async stationInList => {
        if(!!stationInList.config) {
          let objConfigModel = INIString2Obj(this.editor.getValue());
          let objConfigStation = INIString2Obj(stationInList.config);
          stationInList.config = Obj2INIString(this.mergeNestedObjects(objConfigModel, objConfigStation));
        } else {
          stationInList.config = this.editor.getValue();
        }
        await stationModule.update({ modelId: this.model.id, station: stationInList });
      })
    } else {
      this.station.config = this.editor.getValue()
      await stationModule.update({ modelId: this.model.id, station: this.station })
    }
    this.$message.success('更新成功')
    this.drawerVisible = false
  }

   mergeNestedObjects(objA, objB) {
    const result = {};
    // Loop through keys of object B
    Object.keys(objB).forEach(keyB => {
      // Check if the key exists in object A
      if (objA[keyB] !== null) {
        // If it's an object, recursively merge the nested objects
        if (typeof objB[keyB] === 'object' && objB[keyB] !== null) {
          result[keyB] = this.mergeNestedObjects(objA[keyB], objB[keyB]);
        } else {
          // If it's a leaf node, use the value from object A
          result[keyB] = objA[keyB];
        }
      } else {
        // If the key doesn't exist in object A, use the value from object B
        result[keyB] = objB[keyB];
      }
    });
    return result;
  }

  initEditorValue = debounce(250, false, (editor, { formData, formConf }) => {
    editor?.setValue((BackstageManagePage as any).builderINIStringFromForm({ formData, formConf }))
  })

  onFormDataChange({ formData, formConf }) {
    this.initEditorValue(this.editor, { formData, formConf })
  }

  setModelModal(data: any) {
    this.modelModal = { ...this.modelModal, ...data }
    if (data.formData) {
      const copyFormData = { ...data.formData }
      this.modelModal.formData = copyFormData
    }
  }

  setStationModal(data: any) {
    this.stationModal = { ...this.stationModal, ...data }
    if (data.formData) {
      const copyFormData = { ...data.formData }
      this.stationModal.formData = copyFormData
    }
  }

  async updateModelName(model: Model, newName: string) {
    const newEntity = new Model(model)
    newEntity.name = newName
    await modelModule.update(newEntity)
    this.$message.success('更新成功')
  }

  async addModel(modelName: string) {
    const model: Model = {
      name: modelName
    }
    await modelModule.add(model)
    this.$message.success('添加成功')
  }

  async deleteModel(model: Model) {
    const userInput = this.deleteModeDialog.userInput
    if (model.name !== userInput) {
      this.$message.error('请输入要删除的机型的名称')
      return
    }
    model = new Model(model)
    await modelModule.del(model)
    this.$message.success('删除成功')
    this.deleteModeDialog.visible = false
  }

  async updateStationName(station: Station, newName: string) {
    const newEntity = new Station(station)
    newEntity.name = newName
    await stationModule.update({ modelId: this.model.id, station: newEntity })
    this.$message.success('更新成功')
  }

  async addStation(stationName: string) {
    const station = new Station({
      name: stationName
    })
    await stationModule.add({ modelId: this.model.id, station })
    this.$message.success('添加成功')
  }

  async deleteStation(station: Station) {
    await this.$confirm(`你确定要删除 ${this.model.name} 下的 ${station.name} 站吗？`, '删除站别', { type: 'warning' })
      .then(async () => {
        station = new Station(station)
        await stationModule.del({ modelId: this.model.id, station })
        this.$message.success('删除成功')
      })
      .catch(e => console.info(e))
  }

  showConfigEditorModel() {
    this.drawerVisible = true
    this.$nextTick(() => {
      this.onEditorMountedModel()
    })
  }

  showConfigEditor() {
    this.drawerVisible = true
    this.$nextTick(() => {
      this.onEditorMounted()
    })
  }

  /** 设置动态码 */
  async setDynamicCode(code: DynamicCode) {
    code.modelId = this.model.id
    code.modelName = this.model.name
    code.createDate = new Date()
    code.expireDate = new Date(parseTime(code.expireDate, '{y}-{m}-{d}'))
    code = await DynamicCodeAPI.add(code)
    this.model.dynamicCode = code
    this.dynamicCodeModal.visible = false
    this.$message.success('设置密码成功')
  }

  /** 显示动态码 */
  showDynamicCode() {
    // <span class="dynamic-code">{{formData.code}}</span>
    const userRoleLevel = userModule.nowUser.permissionRole.level
    if (userRoleLevel < 5) {
      this.$message.error('权限不足')
      return
    }
    this.showDynamicCodeDialog = {
      visible: true,
      dynamicCode: this.model.dynamicCode
    }
  }

  /** 删除动态码 */
  async deleteDynamicCode() {
    await DynamicCodeAPI.del(this.model.dynamicCode.id)
    this.model.dynamicCode = null
    this.showDynamicCodeDialog.visible = false
    this.$message.success('删除密码成功')
  }

  refreshDynamicCode(formData: DynamicCode) {
    formData.code = this.createCode()
  }

  /** 创建随机4位数动态码 */
  createCode() {
    let result = ''
    for (let i = 0; i < 4; i++) {
      result += Math.floor(Math.random() * 10) + ''
    }
    return result
  }

  /** 显示动态码Modal */
  showDynamicCodeModal() {
    this.dynamicCodeModal = {
      visible: true,
      formData: new DynamicCode()
    }
    this.refreshDynamicCode(this.dynamicCodeModal.formData)
  }

  @Watch('stationModal.visible')
  clearForm(v: boolean) {
    if (!v) {
      this.$nextTick(() => {
        this.stationModal.formData = {
          name: ''
        }
        this.toAddedStationName = ''
      })
    }
  }

  async mounted() {
    console.log(getTranslationDate(Date.now(), 'CN'))
    console.log(getTranslationDate(Date.now(), 'EN'))
    console.log(getTranslationDate(Date.now(), 'VN'))

    await modelModule.getList(userModule.nowUser.id)
    if (!this.model?.id) {
      this.model = this.modelList[0]
    }
    if (this.model.id) {
      await stationModule.getList(this.model.id)
    }

    this.modelModal.onSubmit = async formData => {
      const modelName = formData.name
      if (this.modelModal.addMode) {
        await this.addModel(modelName)
      } else {
        await this.updateModelName(this.model, modelName)
      }
      this.modelModal.visible = false
    }

    this.stationModal.onSubmit = async formData => {
      const stationName = formData.name
      if (this.stationModal.addMode) {
        await this.addStation(stationName)
      } else {
        await this.updateStationName(this.station, stationName)
      }
      this.stationModal.visible = false
    }
  }
}
