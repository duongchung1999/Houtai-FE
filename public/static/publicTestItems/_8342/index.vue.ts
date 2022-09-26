import { Component, Vue, Watch } from "vue-property-decorator";
import BasePublicTest, { Column, Method } from "../BasePublicTest.vue";

const dllname = "_8342";

// 标签名称必须以字母开头
@Component({ name: 'c' + dllname + 'PublicTestItems' })
export default class _8342PublicTestItems extends BasePublicTest {
    dllname = dllname;


    methods = [
        { name: 'A_DC', label: '电流直流电' },
        { name: 'A_AC', label: '电流交流电' },
        { name: 'V_DC', label: '电压直流电' },
        { name: 'V_AC', label: '交流电压' },
        { name: 'RES', label: '电阻' },
    ]

    columns: Column[] = [
        { key: '量程', label: '量程' }
    ]

    form: {
        量程: ''
    }

    /** 量程选项 */
    rangeOptions = [
        { value: 15, label: '15V（15伏）' },
        { value: 5, label: 'v（伏）' },
        { value: 0.5, label: 'mv（毫伏）' },
        { value: 0.0005, label: 'μV（微伏）' },
        { value: 5000, label: '' }
    ]

}