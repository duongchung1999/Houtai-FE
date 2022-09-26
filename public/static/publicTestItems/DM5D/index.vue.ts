import { Component, Vue, Watch } from "vue-property-decorator";
import BasePublicTest, { Column, Method } from "../BasePublicTest.vue";

const dllname = "DM5D";

@Component({ name: dllname + 'PublicTestItems' })
export default class DM5DPublicTestItems extends BasePublicTest {
    dllname = dllname;

    methods: Method[] = [
        { name: '测试', label: '测试' },
    ]

    columns: Column[] = [
        { key: '串口', label: '串口' },
        { key: '表', label: '表' },
    ]

    form: {
        串口: '',
        表: ''
    }

    options = [
        { name: 'A', label: '01' },
        { name: 'mA', label: '02' },
    ];
}