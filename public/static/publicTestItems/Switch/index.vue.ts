import { Component, Vue, Watch } from "vue-property-decorator";
import BasePublicTest, { Column, Method } from "../BasePublicTest.vue";

const dllname = "Switch";

@Component({ name: dllname + 'PublicTestItems' })
export default class SwitchPublicTestItems extends BasePublicTest {
    dllname = dllname;

    methods = [
        { name: '继电器跳转', label: '继电器跳转' },
    ]

    columns: Column[] = [
        { key: "继电器跳转", label: "继电器跳转" },
    ];

    form = {
        继电器跳转: '',
    }

    /** 继电器所闭合的开关 */
    closedSwitches = []

    resetForm() {
        // 因为@Component的原因，不能直接调用super.xx();
        // 主动改变原型链调用父类方法.
        let proto = function <T>() { }
        const temp = Object.setPrototypeOf(proto.prototype, BasePublicTest);
        Object.getPrototypeOf(temp).extendOptions.methods.resetForm.call(this)
        this.closedSwitches = []
    }

    /** 全部可闭合的开关 */
    get allSwitches() {
        let result: number[] = [];
        for (let i = 0; i < 33; i++) {
            result.push(i);
        }
        return result;
    }

    onSelectedSwitch() {
        if (this.closedSwitches.includes(0)) {
            this.closedSwitches = [0]
        }
        let paramValue = '';
        this.closedSwitches.sort((a, b) => a > b ? 1 : -1);
        this.closedSwitches.forEach(s => {
            paramValue += `${s}.`
        })
        this.form.继电器跳转 = paramValue.substring(0, paramValue.length - 1);
    }
}