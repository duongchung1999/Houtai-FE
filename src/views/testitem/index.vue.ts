import { PublicTestItemAPI } from '@/api/publicTestItem/publicTestItemAPI'
import { PublicTestItemGroupAPI } from '@/api/publicTestItem/publicTestItemGroupAPI'
import { TestItemAPI } from '@/api/testItemAPI'
import PublicTestItemForm from '@/components/PublicTestItemForm/index.vue'
import VModalBox from '@/components/VModalBox/index.vue'
import { Model } from '@/entity/model'
import { PublicTestItem } from '@/entity/publicTestItem/publicTestItem'
import { PublicTestItemGroup } from '@/entity/publicTestItem/publicTestItemGroup'
import { Station } from '@/entity/station'
import { TestItem } from '@/entity/testItem'
import { modelModule, stationModule, testItemModule, userModule } from '@/store/modules'
import { removeEle } from '@/utils/index'
import Vue from 'vue'
import { Component, Ref } from 'vue-property-decorator'

const defaultTestItemFormData = {
  name: '',
  cmd: '',
  lowerValue: '',
  upperValue: '',
  unitL: '',
  isHidden: false,
  isAlwaysRun: false
}

class TableRow {
    id: number;
    name: string;
    cmd: string;
    isAlwaysRun: boolean;
    isHidden: boolean;
    testItem: TestItem;

    // 这个测试项目在哪些站别使用
    whereUsed: string;

    constructor() {
      // 让页面刷新时处于隐藏状态
      this.whereUsed = '123'
    }
}

@Component({ components: { VModalBox, PublicTestItemForm } })
export default class TestItemPage extends Vue {
    currentPublicTestItemGroupSummary: String = null;
    get currentPublicTestItemGroup() {
      const summary = this.currentPublicTestItemGroupSummary
      if (!summary) return null
      return this.publicTestItemGroups.find(e => e.summary == summary)
    }

    publicTestItems: PublicTestItem[] = [];
    publicTestItemGroups: PublicTestItemGroup[] = [];
    publicTestItemPanelVisible = false;
    cmdInTestItem = null;

    NoList = [
      {
        groupName: '机型Dll',
        items: [
          { value: 1, label: '1 比对定值' },
          { value: 2, label: '2 比对范围' },
          { value: 3, label: '3 不比对' }
        ]
      },
      {
        groupName: '公共Dll',
        items: [
          { value: 4, label: '4 比对定值' },
          { value: 5, label: '5 比对范围' },
          { value: 6, label: '6 不比对' }
        ]
      }
    ]

    defaultTestItemFormData = defaultTestItemFormData

    searchKw = '';
    currentStation: Station = new Station();

    columns = [
      { key: 'name', label: '名称', width: '230px' },
      { key: 'cmd', label: '指令' }
      // { key: "lowerValue", label: "下限", width: "150px" },
      // { key: "upperValue", label: "上限", width: "150px" },
      // { key: "unit", label: "单位", width: "100px" },
      // { key: "no", label: "比对编号", width: '100px' },
      // { key: "isHidden", label: "隐藏此项", width: "80px" },
      // { key: "isAlwaysRun", label: "始终执行", width: "80px" },
    ]

    deleteTestItemContent = '';

    deleteTestItemDialog = {
      visible: false,
      toDeleteTestItem: new TestItem()
    }

    testItemModal = {
      visible: false,
      title: '',
      formData: defaultTestItemFormData,
      addMode: false,
      rules: {
        name: [{ required: true, message: '请输入测试项目名称', trigger: 'click' }],
        cmd: [{ required: true, message: '请输入调用命令', trigger: 'click' }]
      },
      onSubmit(formData: any) { }
    }

    tableLoading = false;

    get tableData() {
      const result = []
      const kw = this.searchKw.toLowerCase()
      this.testItemList.forEach(e => {
        if (e.cmd.toLowerCase().includes(kw) || e.name.toLowerCase().includes(kw)) {
          const tableRow = new TableRow()
          tableRow.id = e.id
          tableRow.name = this.getTestItemName(e)
          tableRow.cmd = e.cmd
          tableRow.isAlwaysRun = e.isAlwaysRun
          tableRow.isHidden = e.isHidden
          tableRow.testItem = e
          this.getWhereUsedTestItem(tableRow)
          result.push(tableRow)
        }
      })
      return result
    }

    get model(): Model { return modelModule.model }
    set model(v: Model) {
      this.currentStation = null
      this.$nextTick(async() => {
        await modelModule.setModel(v)
        // this list must be cleared before fetching
        await testItemModule.setList([])
        await testItemModule.setState({ testItem: {} })
        // await testItemModule.getList(this.model.id)
        await stationModule.getList(this.model.id)
      })
    }

    get stationList() { return stationModule.stationList }

    get modelList() { return modelModule.modelList }
    get testItemList() { return testItemModule.testItemList }

    /** 当选择通用测试项目组时 */
    async onPTI_GroupSelected() {
      const groupSummary = this.currentPublicTestItemGroupSummary
      const group = this.publicTestItemGroups.find(e => e.summary == groupSummary)
      if (!group) return

      this.publicTestItems = await PublicTestItemAPI.getList(group.id)
    }

    async showDeleteTestItemDialog(tableRow: TableRow) {
      this.deleteTestItemContent = ''
      const testItem = new TestItem(tableRow)
      this.deleteTestItemDialog = {
        toDeleteTestItem: testItem,
        visible: true
      }

      // 哪一站，第几项
      const usedStationTestItems = await TestItemAPI.getWhereUsed(testItem.id)
      const tempData = {}

      usedStationTestItems.forEach(e => {
        if (!tempData[e.station.name]) {
          tempData[e.station.name] = []
        }

        tempData[e.station.name].push(e.sortIndex)
      })

      for (const stationName in tempData) {
        let sectionText = `<li>在 ${stationName}站，第`
        const sortedList = tempData[stationName].sort((a, b) => a > b ? 1 : -1)
        sortedList.forEach(sortIndex => {
          sectionText += `${sortIndex}、`
        })
        this.deleteTestItemContent += (sectionText.substring(-0, sectionText.length - 1) + '项</li>')
      }

      await testItemModule.setState({ testItem })
    }

    // 获取测试在哪些站别使用过，赋值给tableRow的whereUsed属性
    async getWhereUsedTestItem(tableRow: TableRow) {
      let ret = ''
      const testItem = new TestItem(tableRow)

      // 哪一站，第几项
      const usedStationTestItems = await TestItemAPI.getWhereUsed(testItem.id)

      if (!usedStationTestItems.length) {
        tableRow.whereUsed = ''
        return
      }
      const tempData = {}

      usedStationTestItems.forEach(e => {
        if (!tempData[e.station.name]) {
          tempData[e.station.name] = []
        }

        tempData[e.station.name].push(e.sortIndex)
      })

      // ret = '在站别'

      for (const stationName in tempData) {
        const sectionText = `${stationName}、`
        ret += sectionText
      }
      // 去掉ret最后一个字符
      ret = ret.substring(0, ret.length - 1)

      // ret += '使用'

      tableRow.whereUsed = ret
    }

    async search() {
      await this.$nextTick()
      this.tableLoading = true
      const stationId = this.currentStation?.id ? this.currentStation.id : 0

      const result = await testItemModule.search({ modelUk: this.model.id, stationId })
      await testItemModule.setList(result)
      this.tableLoading = false
    }

    async deleteTestItem() {
      const { toDeleteTestItem } = this.deleteTestItemDialog
      await testItemModule.del({ modelId: this.model.id, testItem: toDeleteTestItem })

      removeEle(this.tableData, v => v.id == toDeleteTestItem.id)

      this.$message.success('删除成功')
      this.deleteTestItemDialog.visible = false
    }

    async updateTestItem(testItem: TestItem) {
      await testItemModule.update({ modelId: this.model.id, testItem })
      this.$message.success('更新成功')
    }

    async addTestItem(testItem: TestItem) {
      await testItemModule.add({ modelId: this.model.id, testItem })
      this.$message.success('添加成功')
    }

    setTestItemModal(data: any) {
      this.testItemModal = { ...this.testItemModal, ...data }
      if (data.formData) {
        const copyFormData = { ...data.formData }

        if (data.addMode) {
          copyFormData.no = 1
        }

        this.testItemModal.formData = copyFormData
        this.getSummaryFromCMD(copyFormData.cmd);
        
      }
    }

    async getSummaryFromCMD(cmd: string) {
      if(cmd.includes("dllname")) {
        const keyValuePairs = cmd.split('&');
        const dllNamePair = keyValuePairs.find(pair => pair.startsWith('dllname='));
        const dllNameInCMD = dllNamePair ? dllNamePair.split('=')[1] : null;
        const testItemGroup = this.publicTestItemGroups.find(e => e.dllName == dllNameInCMD)
        if(!!testItemGroup) {
          this.currentPublicTestItemGroupSummary = (testItemGroup.summary) ? testItemGroup.summary : null;
          this.publicTestItems = await PublicTestItemAPI.getList(testItemGroup.id);
          this.cmdInTestItem = keyValuePairs;
        } else {
          this.currentPublicTestItemGroupSummary = null;
          this.publicTestItems = [];
          this.cmdInTestItem = null;
        }
      } else {
        this.currentPublicTestItemGroupSummary = null;
        this.publicTestItems = [];
        this.cmdInTestItem = null;
      }
    }

    getTestItemName(testItem: TestItem) {
      return testItem.name.replace('-', '').replace('+', '')
    }

    getTestItemById(id: number) {
      return this.testItemList.find(e => e.id == id)
    }

    async updateTestItemIsHidden(testItemId: number, isHidden: boolean) {
      const testItem = this.getTestItemById(testItemId)
      testItem.isHidden = isHidden
      await testItemModule.update({ modelId: this.model.id, testItem: testItem })
      this.$message.success('保存成功')
    }

    async updateTestItemIsAlwaysRun(testItemId: number, isAlwaysRun: boolean) {
      const testItem = this.getTestItemById(testItemId)
      testItem.isAlwaysRun = isAlwaysRun
      await testItemModule.update({ modelId: this.model.id, testItem: testItem })
      this.$message.success('保存成功')
    }

    @Ref('publicTestItemForm')
    publicTestItemForm: PublicTestItemForm;

    createCmd() {
      const cmd = this.publicTestItemForm.testCmd
      this.publicTestItemPanelVisible = false
      const testItemFormModal = this.$refs['test-item-modal'] as any
      testItemFormModal.formDataCopy.cmd = cmd
    }

    // 获取测试项目的上限、下限、测试项目编号和单位（比对方式）生成上下限文本字符串
    getTestItemLimitText(lowerValue: string, upperValue: string, compareType: number, unit: string): string {
      // 如果下限、上限、单位等于'N/A'，把对应的值赋值空字符串，用三元表达式
      unit = unit == 'N/A' ? '' : unit
      lowerValue = lowerValue == 'N/A' ? '' : lowerValue
      upperValue = upperValue == 'N/A' ? '' : upperValue

      let ret = ''
      // 1. 如果compareType等于1或者4，返回 upperValue+unit字符串
      // 2. 如果compareType等于2或者5，返回 upperValue+unit ~ lowerValue+unit字符串
      // 2.1 如果上限等于>符号，返回  > lowerValue+unit
      // 2.2 如果下限等于<符号，返回  < upperValue+unit
      // 3. 如果compareType等于3或者6，返回 不比对

      if (compareType == 1 || compareType == 4) {
        ret = upperValue
      } else if (compareType == 2 || compareType == 5) {
        if (upperValue == '>') {
          ret = `> ${lowerValue}${unit}`
        } else if (lowerValue == '<') {
          ret = `${upperValue}${unit} <`
        } else {
          ret = `${lowerValue}${unit} ~ ${upperValue}${unit}`
        }
      } else if (compareType == 3 || compareType == 6) {
        ret = '不比对'
      }

      return ret
    }

    async mounted() {
      await modelModule.getList(userModule.nowUser.id)
      if (!this.model?.id) {
        await modelModule.setModel(this.modelList[0])
      }
      this.model = this.model

      await this.search()
      this.testItemModal.onSubmit = async(formData: any) => {
        const testItem = new TestItem(formData)
        if (this.testItemModal.addMode) {
          await this.addTestItem(testItem)
        } else {
          await this.updateTestItem(testItem)
        }
        this.testItemModal.visible = false
      }

      this.publicTestItemGroups = await PublicTestItemGroupAPI.getList()
    }
}
