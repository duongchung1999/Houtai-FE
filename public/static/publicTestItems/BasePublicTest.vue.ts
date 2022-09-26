import { Form } from "element-ui";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import IBasePublicTest from './IBasePublicTest'

export interface Column {
  key: string,
  label: string
}
export interface Method {
  name: string,
  label: string
}

/** 基础通用测试项目组件，其他的通用测试项目组件应该基础它 */
@Component({ name: 'BasePublicTestItem' })
export default class BasePublicTest extends Vue implements IBasePublicTest {
  /** 调用命令中的dllname参数 */
  dllname = "";

  /** 选中的方法名称 */
  currentMethod: Method = {name:'', label:''};

  /** 此dll包含的方法 */
  methods: Method[] = []

  /** 给method传的自定义参数 */
  form: any = {};

  /** 自定义参数 */
  columns: Column[] = [];

  /** 每个method所用到的参数列表 */
  showFieldMap: any = {};

  /** 用于预览调用命令 */
  cmd = '';

  /** 检查是否显示这个field */
  checkShowThisField(field: string) {
    if (!this.currentMethod?.name) return false;
    var list = this.showFieldMap[this.currentMethod.name];
    if (list === undefined) return true;
    return list.some(e => e == field);
  }

  /** 创建cmd */
  createCmd() {
    let cmd = `dllname=${this.dllname}&method=${this.currentMethod?.name}`;
    this.columns.forEach((col) => {
      if (!this.checkShowThisField(col.key)) return;
      let value = this.form[col.key];
      value = value === undefined || value === null ? '' : value;
      cmd += `&${col.key}=${value}`;
    });
    return cmd;
  }

  /** 重置表单 */
  resetForm() {
    let form = this.$refs.form as Form;
    form.resetFields();
  }

  @Watch('currentMethod')
  @Watch('form', { deep: true, immediate: true })
  priviewCmd() {
    if (this.currentMethod?.name) {
      this.cmd = this.createCmd();
    }
  }

  mounted() {
    this.currentMethod = this.methods[0]
  }
}
