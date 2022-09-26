import { Component, Vue, Watch } from "vue-property-decorator";
import BasePublicTest, { Column, Method } from "../BasePublicTest.vue";

const dllname = "N9320B";

// 标签名称必须以字母开头
@Component({ name: dllname + 'PublicTestItems' })
export default class _8342TGPublicTestItems extends BasePublicTest {
    dllname = dllname;

    methods = [
        { name: 'Peak', label: '读取峰值' },
        { name: 'Freq', label: '读取频段' },
        { name: 'SkewingSPAN', label: '读取频偏（SkewingSPAN）' },
        { name: 'Skewing', label: '读取频偏' },
    ]

    columns: Column[] = [
        { key: '读取频段', label: '读取频段' },
        { key: 'span', label: '量程' },
        { key: 'Rbw', label: '频带宽' },
    ]

    form: {
        读取频段: '',
        span: '',
        Rbw: ''
    }

    showFieldMap = {
        Peak: ['读取频段'],
        Freq: ['读取频段'],
        SkewingSPAN: ['读取频段', 'span', 'Rbw'],
        Skewing: ['读取频段'],
    }
}