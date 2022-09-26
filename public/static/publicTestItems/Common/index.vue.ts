import { Component, Vue, Watch } from "vue-property-decorator";
import BasePublicTest, { Column, Method } from "../BasePublicTest.vue";

const dllname = "Common";

@Component({ name: dllname + 'PublicTestItems' })
export default class CommonPublicTestItems extends BasePublicTest {
    dllname = dllname;

    methods = [
        { name: 'Forms', label: '弹窗' },
        { name: 'Sleep', label: '延时' },
        { name: 'send_read', label: '串口调试' },
        { name: 'powerfrequency', label: '控制电频' },
    ]

    columns: Column[] = [
        { key: '显示信息', label: '显示信息' },
        { key: '时间', label: '时间' },
        { key: '串口', label: '串口' },
        { key: '写入字符串', label: '写入字符串' },
        { key: '电频脚位', label: '电频脚位' },
        { key: '高低电频', label: '高低电频' },
    ]

    form = {
        显示信息: '',
        时间: null,
        串口: 'COM',
        写入字符串: '',
        电频脚位: 'DtrEnable',
        高低电频: 'False',
    }

    showFieldMap = {
        Forms: ['显示信息'],
        Sleep: ['时间'],
        send_read: ['串口', '写入字符串'],
        powerfrequency: ['串口', '电频脚位', '高低电频'],
    }
}