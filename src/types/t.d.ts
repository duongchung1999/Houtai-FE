// 这行代码（或者其他export）不能少，不然其他挂载在vue实例上的属性会报错
import Vue, { VNode } from 'vue'
declare module 'vue/types/vue' {
    interface Vue {
        /**
         * 获取多语言选项
         * @param originalText 源文本
         * @param lang 语言选项
         */
        $t(originalText: string, lang?: string): string;
    }
}