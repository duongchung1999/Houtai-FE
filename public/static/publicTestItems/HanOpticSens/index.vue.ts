import { Component, Vue, Watch } from "vue-property-decorator";
import BasePublicTest, { Column, Method } from "../BasePublicTest.vue";

const dllname = "HanOpticSens";

@Component({ name: dllname + 'PublicTestItems' })
export default class HanOpticSensPublicTestItems extends BasePublicTest {
    dllname = dllname;

    methods = [
        { name: 'r_doWave', label: '弹窗判断' },
        { name: 'r_cd', label: 'r_cd' },
        { name: 'r_lux', label: '延时' },
        { name: 'ColorCoordinateX', label: '串口调试' },
        { name: 'ColorCoordinateY', label: '控制电频' },
    ]

    columns: Column[] = [
        { key: '串口', label: '串口' },
        { key: '读取的通道', label: '读取的通道' },
        { key: '写入字符串', label: '写入字符串' },
        { key: '电频脚位', label: '电频脚位' },
    ]

    form = {
        串口: '',
        读取的通道: '',
        写入字符串: '',
        电频脚位: '',
    }

    showFieldMap = {
        r_doWave: ['串口', '读取的通道'],
        r_cd: ['串口', '读取的通道'],
        r_lux: ['串口', '写入字符串'],
        ColorCoordinateX: ['串口', '写入字符串'],
        ColorCoordinateY: ['串口', '电频脚位'],
    }
}