import { Component, Vue, Watch } from "vue-property-decorator";
import BasePublicTest, { Column, Method } from "../BasePublicTest.vue";

const dllname = "Print";

// 标签名称必须以字母开头
@Component({ name: dllname + 'PublicTestItems' })
export default class _8342TGPublicTestItems extends BasePublicTest {
    dllname = dllname;

    methods = [
        { name: 'PrintBD', label: '打印BD号' },
        { name: 'PrintString', label: '打印指定字符串' },
    ]

    columns: Column[] = [

    ]

    form: {

    }
}