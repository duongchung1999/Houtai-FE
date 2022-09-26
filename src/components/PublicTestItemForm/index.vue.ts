
import { PublicTestItem } from "@/entity/publicTestItem/publicTestItem";
import { PublicTestItemGroup } from "@/entity/publicTestItem/publicTestItemGroup";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({ name: "PublicTestItemForm" })
export default class PublicTestItemForm extends Vue {
  @Prop() group: PublicTestItemGroup;

  @Prop() testItems: PublicTestItem[];

  /** 当前选中的通用测试项目 */
  get currentPublicTestItem(): PublicTestItem {
    let result = this.testItems.find(
      (e) => e.methodName == this.paramForm.method
    );
    return result;
  }

  /** 参数表单 */
  paramForm: any = new Object();

  /** 生成的命令 */
  get testCmd() {
    let { dllName } = this.group;
    let { method } = this.paramForm;
    if (!dllName) return "请选择模块类别";
    if (!method) return "请选择测试方法";

    let result = `dllname=${dllName}&method=${method}`;
    let tempParams = { ...this.paramForm };
    delete tempParams.method;

    for (const pName in tempParams) {
      const pValue = tempParams[pName];
      result += `&${pName}=${pValue}`;
    }

    return result;
  }

  /** 当选择测试项目后 */
  onSelectedTestItem() {
    this.paramForm = { method: this.paramForm.method }
  }

  /** 获取选项 */
  getOptions(options: string) {
    let result = [];
    if (!options) return result;
    result = options.replace(" ", "").split(",");
    return result;
  }

}