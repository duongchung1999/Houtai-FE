import { RequestLogAPI } from '@/api/RequestLogAPI';
import { RequestLog } from '@/entity/requestLog';
import { User } from '@/entity/user';
import { formatTime } from '@/utils/index';
import { throttle } from 'throttle-debounce';
import Vue from "vue";
import { Component, Watch } from 'vue-property-decorator';

const DEFAULT_CONDITIONS = {
    method: '',
    startdate: null,
    enddate: null,
    requestUserId: null,
    path: '',
    page: 1,
    pagesize: 20,
}

// todo 添加分页

@Component({ name: "RequestLogPage" })
export default class RequestLogPage extends Vue {
    //表格列
    columns = [
        { label: '请求用户', key: 'userId' },
        { label: '请求时间', key: 'requestDate' },
        { label: '请求方法', key: 'method' },
        { label: '路由', key: 'path' },
        { label: '来源', key: 'referUrl' },
        { label: '请求地址', key: 'requestUrl' },
        { label: 'ip', key: 'IP' },
        { label: '请求参数', key: 'parameters' },
    ]

    // 过滤条件
    conditions = { keyword: '', ...DEFAULT_CONDITIONS }

    // 过滤选项
    options: any = {
        user:[],
        path:[],

    }

    /** 记录列表 */
    logs: RequestLog[] = [];

    filterVisible = false;

    /** 重置过滤 */
    reset() {
        this.conditions = { keyword: this.conditions.keyword, ...DEFAULT_CONDITIONS }
        this.search()
    }

    async _search() {
        let result = await RequestLogAPI.getList(this.conditions);
        this.logs = result.items;
        this.filterVisible = false;
    }

    search = throttle(500, false, this._search);
    formatTime = formatTime

    async getOptions() {
        // todo 占用user repository会导致获取不到user选项
        let options = await RequestLogAPI.getOptions();

        let paths: string[] = [];
        options.path.forEach(e => {
            paths.push(e.replace('api/v2/', ''));
        });
        this.options = { ...options, path: paths }

    }

    async mounted() {
        await this.getOptions()
        this.createCascadePathOptions();
    }

    addRowStatus({ row, rowIndex }) {
        switch (row.operate) {
            case 'Addtion':
                return 'addtion-record';
            case 'Modification':
                return 'modification-record';
            case 'Deletion':
                return 'deletion-record';
            default:
                return '';
        }
    }

    getNickname(userId: number) {
        let users = this.options.user as User[];
        let user = users.find(e => e.id == userId);
        if (!user) return '';
        return user.nickname;
    }

    // 创建联级路由选项
    createCascadePathOptions() {
        let paths: string[] = this.options.path;

        let options = [];

        paths.forEach(path => {
            path = path.replace('api/v2/', '');
            let path_segments = path.split('/');
            options.push({
                value: path_segments[0],
                label: path_segments[0],
                children: []
            })
        });

    }

    @Watch('conditions.keyword', { immediate: true })
    runSearch() {
        this.search()
    }
};