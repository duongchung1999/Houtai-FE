import { Form } from "element-ui";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

export interface Column {
  key: string,
  label: string
}
export interface Method {
  name: string,
  label: string
}

/** 基础通用测试项目组件，其他的通用测试项目组件应该基础它 */
export default interface IBasePublicTest {
  /** 调用命令中的dllname参数 */
  dllname: string

  /** 选中的方法名称 */
  currentMethod?: Method

  /** 此dll包含的方法 */
  methods: Method[]

  /** 给method传的自定义参数 */
  form: any

  /** 自定义参数 */
  columns: Column[]

  /** 每个method所用到的参数列表 */
  showFieldMap: any

  /** 用于预览调用命令 */
  cmd: string;

  /** 检查是否显示这个field */
  checkShowThisField(field: string): Boolean;

  /** 创建cmd */
  createCmd(): string;

  /** 重置表单 */
  resetForm();

  priviewCmd();

}
