import { Component, Vue, Watch } from "vue-property-decorator";
import BasePublicTest, { Column, Method } from "../BasePublicTest.vue";

const dllname = "RSA3030_TG";

@Component({ name: dllname + 'PublicTestItems' })
export default class RSA3030_TGPublicTestItems extends BasePublicTest {
    dllname = dllname;

    methods = [
        { name: 'Peak', label: '读取峰值' },
        { name: 'Skewing', label: '读取频偏' },
    ]

    columns: Column[] = [
        { key: '读取频段', label: '频段' }
    ]

    form: {
        读取频段:''
    }
}