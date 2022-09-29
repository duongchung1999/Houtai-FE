import { ActionRecordAPI, ActionRecordSearchOptions } from '@/api/ActionRecordAPI';
import { ActionRecord } from '@/entity/ActionRecord';
import { formatTime } from '@/utils/index';
import { throttle } from 'throttle-debounce';
import Vue from "vue";
import { Component, Watch } from 'vue-property-decorator';
import MoreText from '@/components/moreText/index.vue';

let DEFAULT_CONDITIONS = new ActionRecordSearchOptions()
DEFAULT_CONDITIONS.pageSize = 9;

@Component({ name: "ActionRecordPage", components: { MoreText } })
export default class ActionRecordPage extends Vue {
    /** 总页数 */
    totalPageCount = 0;

    // 过滤条件
    conditions: ActionRecordSearchOptions = { ...DEFAULT_CONDITIONS }

    /** 操作者选项 */
    operators: string[] = [];

    /** 操作选项 */
    actions: string[] = [];

    /** 操作记录列表 */
    actionRecords: ActionRecord[] = [];

    filterVisible = false;

    /** 重置过滤 */
    reset() {
        this.conditions = { ...DEFAULT_CONDITIONS }
        this.search()
    }

    async _search() {
        let result = await ActionRecordAPI.search(this.conditions);
        this.actionRecords = result.items;
        this.filterVisible = false;
        this.totalPageCount = result.totalPages;
    }

    search = throttle(500, false, this._search);
    formatTime = formatTime

    async mounted() {
        await this.search();
        this.operators = await ActionRecordAPI.getOperatorOptions();
        this.actions = await ActionRecordAPI.getActionOptions();
    }

    @Watch('conditions', { immediate: true, deep: true })
    runSearch() {
        this.search()
    }
};