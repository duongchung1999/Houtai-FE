import { Component, Vue, Watch } from "vue-property-decorator";
import BasePublicTest, { Column, Method } from "../BasePublicTest.vue";

const dllname = "RT550";

@Component({ name: dllname + 'PublicTestItems' })
export default class RT550PublicTestItems extends BasePublicTest {
    dllname = dllname;

    methods = [
        { name: 'Connect', label: '连接' },
        { name: 'StartTest', label: '开始测试' },
        { name: 'output_power_low', label: '2401低功率' },
        { name: 'output_power_mid', label: '2441中功率' },
        { name: 'output_power_high', label: '2480高功率' },
        { name: 's_slot_sensitivitv', label: '灵敏度' },
        { name: 'carrier_drift_low', label: '2401低载波' },
        { name: 'carrier_drift_mid', label: '2441中载波' },
        { name: 'carrier_drift_high', label: '2480中载波' },
    ]
}