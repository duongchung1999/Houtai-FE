
import { PublicTestItem } from "@/entity/publicTestItem/publicTestItem";
import { PublicTestItemGroup } from "@/entity/publicTestItem/publicTestItemGroup";
import { PublicTestItemParam } from "@/entity/publicTestItem/publicTestItemParam";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

/** 临时的类型，用于更好的生成调用命令 */
class Params {
  /** 参数概述 */
  summary?: string = undefined;

  /** 参数名称 */
  name?: string = undefined;

  /** 参数类型 */
  type?: string = undefined;

  /** 可选项 */
  options?: string;

  /** 当前参数值 */
  value?: string = '';
}

@Component({ name: "PublicTestItemForm" })
export default class PublicTestItemForm extends Vue {
  @Prop() group: PublicTestItemGroup;
  @Prop() testItems: PublicTestItem[];

  /** 当前选中的测试项目 */
  currentTestItem: PublicTestItem = new PublicTestItem();

  /** 当前测试项目的参数列表 */
  currentParams: Params[] = []

  @Watch('currentTestItem')
  flushCurrentParams() {
    let result: Params[] = [];
    if (!this.currentTestItem) {
      this.currentParams = []
      return;
    };

    this.currentTestItem.params.forEach(p => {
      result.push({
        summary: p.summary,
        name: p.name,
        type: p.type,
        options: p.options,
        value: ''
      })
    });

    this.currentParams = result;
  }

  @Watch('group')
  restetForm() {
    this.currentTestItem = new PublicTestItem();
  }

  /** 参数表单 */
  paramForm: any = new Object();

  /** 生成的命令 */
  get testCmd() {
    let { dllName } = this.group;
    let { methodName } = this.currentTestItem;
    if (!dllName) return "请选择模块类别";
    if (!methodName) return "请选择测试项目";

    let result = `dllname=${dllName}&method=${methodName}`;

    for (const p of this.currentParams) {
      result += `&${p.name}=${p.value}`;
    }
    return result;
  }

  /** 获取选项 */
  getOptions(options: string) {
    let result = [];
    if (!options) return result;
    result = options.replace(" ", "").split(",");
    return result;
  }
}