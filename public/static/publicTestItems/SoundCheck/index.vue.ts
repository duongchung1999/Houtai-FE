import { Component, Vue, Watch } from "vue-property-decorator";
import BasePublicTest, { Column, Method } from "../BasePublicTest.vue";

const dllname = "SoundCheck";

@Component({ name: dllname + 'PublicTestItems' })
export default class SoundCheckPublicTestItems extends BasePublicTest {
    dllname = dllname;

    methods = [
        { name: 'Start', label: '运行测试' },
        { name: 'GetResult', label: '获取结果' },
        { name: 'OpenSoundCheck', label: '打开SC程序' },
        { name: 'ConnecttoServer', label: '建立连接，运行SQC' },
        { name: 'CheckForms', label: '检测弹窗' },
        { name: 'Forms', label: '点击弹窗' },
    ]

    columns: Column[] = [
        { key: '包含弹窗名字', label: '包含弹窗名字' },
        { key: '弹窗名字', label: '弹窗名字' },
        { key: '检测到弹窗后输入的按键', label: '检测到弹窗后输入的按键' },
    ]

    form = {
        包含弹窗名字: '',
        弹窗名字: '',
        检测到弹窗后输入的按键: ''
    }

    showFieldMap = {
        Start:[],
        GetResult:[],
        OpenSoundCheck:[],
        ConnecttoServer:[],
        CheckForms: ['包含弹窗名字'],
        Forms: ['弹窗名字', '检测到弹窗后输入的按键']
    }
}