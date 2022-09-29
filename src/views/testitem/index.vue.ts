import { PublicTestItemAPI } from '@/api/publicTestItem/publicTestItemAPI';
import { PublicTestItemGroupAPI } from '@/api/publicTestItem/publicTestItemGroupAPI';
import { TestItemAPI } from '@/api/testItemAPI';
import PublicTestItemForm from '@/components/PublicTestItemForm/index.vue';
import VModalBox from '@/components/VModalBox/index.vue';
import { Model } from "@/entity/model";
import { PublicTestItem } from '@/entity/publicTestItem/publicTestItem';
import { PublicTestItemGroup } from '@/entity/publicTestItem/publicTestItemGroup';
import { Station } from '@/entity/station';
import { TestItem } from "@/entity/testItem";
import { modelModule, stationModule, testItemModule, userModule } from '@/store/modules';
import { removeEle } from '@/utils/index';
import Vue from "vue";
import { Component, Ref } from 'vue-property-decorator';

const defaultTestItemFormData = {
    name: '',
    cmd: '',
    lowerValue: '',
    upperValue: '',
    unitL: '',
    isHidden: false,
    isAlwaysRun: false
}

interface TableRow {
    id: number;
    name: string;
    cmd: string;
    isAlwaysRun: boolean;
    isHidden: boolean;
}

@Component({ components: { VModalBox, PublicTestItemForm } })
export default class TestItemPage extends Vue {
    currentPublicTestItemGroupSummary: String = null;
    get currentPublicTestItemGroup() {
        let summary = this.currentPublicTestItemGroupSummary;
        if (!summary) return null;
        return this.publicTestItemGroups.find(e => e.summary == summary);
    }
    publicTestItems: PublicTestItem[] = []
    publicTestItemGroups: PublicTestItemGroup[] = []
    publicTestItemPanelVisible = false;

    NoList = [
        {
            groupName: '机型Dll',
            items: [
                { value: 1, label: '1 比对定值' },
                { value: 2, label: '2 比对范围' },
                { value: 3, label: '3 不比对' },
            ]
        },
        {
            groupName: '公共Dll',
            items: [
                { value: 4, label: '4 比对定值' },
                { value: 5, label: '5 比对范围' },
                { value: 6, label: '6 不比对' },
            ]
        }
    ]

    defaultTestItemFormData = defaultTestItemFormData

    searchKw = "";
    currentStation: Station = new Station();

    columns = [
        { key: "name", label: "名称", width: '230px' },
        { key: "cmd", label: "调用命令" },
        { key: "upperValue", label: "上限", width: "150px" },
        { key: "lowerValue", label: "下限", width: "150px" },
        { key: "no", label: "比对编号", width: '100' },
        { key: "isHidden", label: "隐藏此项", width: "80px" },
        { key: "isAlwaysRun", label: "始终执行", width: "80px" },
    ]

    deleteTestItemContent: string = '';

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
            name: [{ required: true, message: '请输入测试项目名称', trigger: 'click' },],
            cmd: [{ required: true, message: '请输入调用命令', trigger: 'click' },]
        },
        onSubmit(formData: any) { }
    }

    tableLoading = false;

    get tableData() {
        let result = [];
        let kw = this.searchKw.toLowerCase();
        this.testItemList.forEach(e => {
            if (e.cmd.toLowerCase().includes(kw) || e.name.toLowerCase().includes(kw)) {
                result.push({
                    id: e.id,
                    name: this.getTestItemName(e),
                    cmd: e.cmd,
                    isAlwaysRun: e.isAlwaysRun,
                    isHidden: e.isHidden,
                    testItem: e
                })
            }
        })
        return result;
    }

    get model(): Model { return modelModule.model; }
    set model(v: Model) {
        this.currentStation = null;
        this.$nextTick(async () => {
            await modelModule.setModel(v)
            // this list must be cleared before fetching
            await testItemModule.setList([])
            await testItemModule.setState({ testItem: {} })
            // await testItemModule.getList(this.model.id)
            await stationModule.getList(this.model.id);
        })
    };

    get stationList() { return stationModule.stationList; }

    get modelList() { return modelModule.modelList; }
    get testItemList() { return testItemModule.testItemList; }

    /** 当选择通用测试项目组时 */
    async onPTI_GroupSelected() {
        let groupSummary = this.currentPublicTestItemGroupSummary;
        let group = this.publicTestItemGroups.find(e => e.summary == groupSummary);
        if (!group) return;

        this.publicTestItems = await PublicTestItemAPI.getList(group.id);
    }

    async showDeleteTestItemDialog(tableRow: TableRow) {
        this.deleteTestItemContent = ''
        let testItem = new TestItem(tableRow);
        this.deleteTestItemDialog = {
            toDeleteTestItem: testItem,
            visible: true
        }

        // 哪一站，第几项
        var usedStationTestItems = await TestItemAPI.getWhereUsed(testItem.id);
        var tempData = {};

        usedStationTestItems.forEach(e => {
            if (!tempData[e.station.name]) {
                tempData[e.station.name] = []
            }

            tempData[e.station.name].push(e.sortIndex);
        })

        for (const stationName in tempData) {
            let sectionText = `<li>在 ${stationName}站，第`;
            let sortedList = tempData[stationName].sort((a, b) => a > b ? 1 : -1)
            sortedList.forEach(sortIndex => {
                sectionText += `${sortIndex}、`
            });
            this.deleteTestItemContent += (sectionText.substring(-0, sectionText.length - 1) + '项</li>');
        }

        await testItemModule.setState({ testItem })
    }

    async search() {
        await this.$nextTick();
        this.tableLoading = true;
        let stationId = this.currentStation?.id ? this.currentStation.id : 0;

        let result = await testItemModule.search({ modelUk: this.model.id, stationId })
        await testItemModule.setList(result);
        this.tableLoading = false;
    }

    async deleteTestItem() {
        let { toDeleteTestItem } = this.deleteTestItemDialog
        await testItemModule.del({ modelId: this.model.id, testItem: toDeleteTestItem })

        removeEle(this.tableData, (v => v.id == toDeleteTestItem.id))

        this.$message.success('删除成功');
        this.deleteTestItemDialog.visible = false;
    }

    async updateTestItem(testItem: TestItem) {
        await testItemModule.update({ modelId: this.model.id, testItem })
        this.$message.success('更新成功');
    }

    async addTestItem(testItem: TestItem) {
        await testItemModule.add({ modelId: this.model.id, testItem });
        this.$message.success('添加成功');
    }

    setTestItemModal(data: any) {
        this.testItemModal = { ...this.testItemModal, ...data, };
        if (data.formData) {
            let copyFormData = { ...data.formData };
            this.testItemModal.formData = copyFormData;
        }
    }

    getTestItemName(testItem: TestItem) {
        return testItem.name.replace('-', '').replace('+', '')
    }

    getTestItemById(id: number) {
        return this.testItemList.find(e => e.id == id);
    }

    async updateTestItemIsHidden(testItemId: number, isHidden: boolean) {
        let testItem = this.getTestItemById(testItemId);
        testItem.isHidden = isHidden;
        await testItemModule.update({ modelId: this.model.id, testItem: testItem })
        this.$message.success('保存成功');
    }

    async updateTestItemIsAlwaysRun(testItemId: number, isAlwaysRun: boolean) {
        let testItem = this.getTestItemById(testItemId);
        testItem.isAlwaysRun = isAlwaysRun;
        await testItemModule.update({ modelId: this.model.id, testItem: testItem })
        this.$message.success('保存成功');
    }

    @Ref('publicTestItemForm')
    publicTestItemForm: PublicTestItemForm;

    createCmd() {
        let cmd = this.publicTestItemForm.testCmd;
        this.publicTestItemPanelVisible = false;
        let testItemFormModal = this.$refs['test-item-modal'] as any;
        testItemFormModal.formDataCopy.cmd = cmd;
    }

    async mounted() {
        await modelModule.getList(userModule.nowUser.id);
        if (!this.model?.id) {
            await modelModule.setModel(this.modelList[0])
        }
        this.model = this.model;

        await this.search();
        this.testItemModal.onSubmit = async (formData: any) => {
            let testItem = new TestItem(formData);
            if (this.testItemModal.addMode) {
                await this.addTestItem(testItem);
            } else {
                await this.updateTestItem(testItem)
            }
            this.testItemModal.visible = false;
        }

        this.publicTestItemGroups = await PublicTestItemGroupAPI.getList();
    }
};