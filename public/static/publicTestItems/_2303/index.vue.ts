import { Component, Vue, Watch } from "vue-property-decorator";
import BasePublicTest, { Column, Method } from "../BasePublicTest.vue";

const dllname = "_2303";

// 标签名称必须以字母开头
@Component({ name: 'c' + dllname + 'PublicTestItems' })
export default class _2303PublicTestItems extends BasePublicTest {
    dllname = dllname;

    methods = [
        { name: '测试', label: '测试' },
    ]

    columns: Column[] = [
        { key: '电压', label: '电压' },
        { key: '电流', label: '电流' },
        { key: '通道', label: '通道' }
    ]

    form: {
        电压: '',
        电流: '',
        通道: '',
    }
}