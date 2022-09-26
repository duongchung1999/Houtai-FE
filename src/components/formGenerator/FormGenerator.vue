<template>
  <div class="container form-generator">
    <div class="left-board">
      <div class="logo-wrapper">基础组件</div>
      <el-scrollbar class="left-scrollbar">
        <div class="components-list">
          <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
            <!-- <div class="components-title">
              <svg-icon icon-class="component" />
              {{ item.title }}
            </div> -->
            <draggable
              class="components-draggable"
              :list="item.list"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              :clone="cloneComponent"
              draggable=".components-item"
              :sort="false"
              @end="onEnd"
            >
              <div
                v-for="(element, index) in item.list"
                :key="index"
                class="components-item"
                @click="addComponent(element)"
              >
                <div class="components-body">
                  <!-- TODO 恢复SVGICON -->
                  <!-- <svg-icon :icon-class="element.__config__.tagIcon" /> -->
                  {{ element.__config__.label }}
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="center-board">
      <div class="action-bar">
        <slot
          name="action-bar"
          :formConf="formConf"
          :AssembledFormData="AssembledFormData"
        >
          <div></div>
        </slot>
        <el-button icon="el-icon-video-play" type="text" @click="execRun">
          预览
        </el-button>

        <el-button
          class="delete-btn"
          icon="el-icon-delete"
          type="text"
          @click="empty"
        >
          清空
        </el-button>
      </div>
      <el-scrollbar class="center-scrollbar">
        <el-row class="center-board-row" :gutter="formConf.gutter">
          <el-form
            :size="formConf.size"
            :label-position="formConf.labelPosition"
            :disabled="formConf.disabled"
            :label-width="formConf.labelWidth + 'px'"
          >
            <draggable
              class="drawing-board"
              :list="drawingList"
              :animation="340"
              group="componentsGroup"
            >
              <draggable-item
                v-for="(item, index) in drawingList"
                :key="item.renderKey"
                :drawing-list="drawingList"
                :current-item="item"
                :index="index"
                :active-id="activeId"
                :form-conf="formConf"
                @activeItem="activeFormItem"
                @copyItem="drawingItemCopy"
                @deleteItem="drawingItemDelete"
              />
            </draggable>

            <div v-show="!drawingList.length" class="empty-info">
              <slot name="empty-state"> 从左侧拖入或点选组件进行表单设计 </slot>
            </div>
          </el-form>
        </el-row>
      </el-scrollbar>
    </div>

    <right-panel
      :active-data="activeData"
      :form-conf="formConf"
      :show-field="!!drawingList.length"
      @tag-change="tagChange"
    />

    <input id="copyNode" type="hidden" />
  </div>
</template>

<script>
import Parser from "./parser/Parser.vue";
import draggable from "vuedraggable";
import render from "@/components/formGenerator/render/render";
import {
  inputComponents,
  formConf,
} from "@/components/formGenerator/generator/config";
import { deepClone } from "@/utils/index";

import RightPanel from "./RightPanel";
import DraggableItem from "./DraggableItem";
import MonacoEditor from "vue-monaco-editor";

const drawingDefalut = [
  {
    __config__: {
      label: "单行文本",
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: "el-input",
      tagIcon: "input",
      defaultValue: undefined,
      required: true,
      layout: "colFormItem",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/input",
      // 正则校验规则
      regList: [
        {
          pattern: "/^1(3|4|5|7|8|9)\\d{9}$/",
          message: "手机号格式错误",
        },
      ],
    },
    // 组件的插槽属性
    __slot__: {
      prepend: "",
      append: "",
    },
    __vModel__: "mobile",
    placeholder: "请输入手机号",
    style: { width: "100%" },
    clearable: true,
    "prefix-icon": "el-icon-mobile",
    "suffix-icon": "",
    maxlength: 11,
    "show-word-limit": true,
    readonly: false,
    disabled: false,
  },
];

let oldActiveId;
let tempActiveData;
const idGlobal = Date.now();

export default {
  props: {
    formConf: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    Parser,
    draggable,
    render,
    RightPanel,
    DraggableItem,
    MonacoEditor,
  },
  data() {
    return {
      idGlobal,
      // formConf,
      inputComponents,
      labelWidth: 100,
      drawingList: drawingDefalut,
      drawingData: {},
      activeId: drawingDefalut[0].formId,
      drawerVisible: false,
      formData: {},
      dialogVisible: false,
      generateConf: null,
      showFileName: false,
      activeData: drawingDefalut[0],
      leftComponents: [
        {
          title: "基础组件",
          list: inputComponents,
        },
      ],
    };
  },
  computed: {
    AssembledFormData() {
      return this.AssembleFormData();
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    "activeData.__config__.label": function (val, oldVal) {
      if (
        this.activeData.placeholder === undefined ||
        !this.activeData.__config__.tag ||
        oldActiveId !== this.activeId
      ) {
        return;
      }
      this.activeData.placeholder =
        this.activeData.placeholder.replace(oldVal, "") + val;
    },
    activeId: {
      handler(val) {
        oldActiveId = val;
      },
      immediate: true,
    },
    drawingList: {
      handler(val) {
        if (val.length === 0) this.idGlobal = Date.now();
      },
      deep: true,
    },
  },
  mounted() {
    this.drawingList = drawingDefalut;
    this.activeFormItem(this.drawingList[0]);

    this.drawingList = [];
    this.idGlobal = Date.now();
    if (this.formConf.fields) {
      this.drawingList = this.formConf.fields;
    }
  },
  methods: {
    setLoading(component, val) {
      const { directives } = component;
      if (Array.isArray(directives)) {
        const t = directives.find((d) => d.name === "loading");
        if (t) t.value = val;
      }
    },
    activeFormItem(currentItem) {
      this.activeData = currentItem;
      this.activeId = currentItem.__config__.formId;
    },
    onEnd(obj) {
      if (obj.from !== obj.to) {
        this.activeData = tempActiveData;
        this.activeId = this.idGlobal;
      }
    },
    addComponent(item) {
      const clone = this.cloneComponent(item);
      this.drawingList.push(clone);
      this.activeFormItem(clone);
    },
    cloneComponent(origin) {
      const clone = deepClone(origin);
      const config = clone.__config__;
      config.span = this.formConf.span; // 生成代码时，会根据span做精简判断
      this.createIdAndKey(clone);
      clone.placeholder !== undefined && (clone.placeholder += config.label);
      tempActiveData = clone;
      return tempActiveData;
    },
    createIdAndKey(item) {
      const config = item.__config__;
      config.formId = ++this.idGlobal;
      config.renderKey = `${config.formId}${+new Date()}`; // 改变renderKey后可以实现强制更新组件
      if (config.layout === "colFormItem") {
        item.__vModel__ = `field${this.idGlobal}`;
      } else if (config.layout === "rowFormItem") {
        config.componentName = `row${this.idGlobal}`;
        !Array.isArray(config.children) && (config.children = []);
        delete config.label; // rowFormItem无需配置label属性
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map((childItem) =>
          this.createIdAndKey(childItem)
        );
      }
      return item;
    },
    AssembleFormData() {
      this.formData = {
        fields: deepClone(this.drawingList),
        ...this.formConf,
      };
      return this.formData;
    },
    execRun() {
      this.AssembleFormData();
      this.$emit("preview", this.AssembledFormData);
      this.drawerVisible = true;
    },

    empty() {
      this.$confirm("确定要清空所有组件吗？", "提示", { type: "warning" }).then(
        () => {
          this.drawingList = [];
          this.formConf.fields.length = 0
          this.idGlobal = Date.now();
        }
      );
    },
    drawingItemCopy(item, list) {
      let clone = deepClone(item);
      clone = this.createIdAndKey(clone);
      list.push(clone);
      this.activeFormItem(clone);
    },
    drawingItemDelete(index, list) {
      list.splice(index, 1);
      this.$nextTick(() => {
        const len = this.drawingList.length;
        if (len) {
          this.activeFormItem(this.drawingList[len - 1]);
        }
      });
    },
    tagChange(newTag) {
      newTag = this.cloneComponent(newTag);
      const config = newTag.__config__;
      newTag.__vModel__ = this.activeData.__vModel__;
      config.formId = this.activeId;
      config.span = this.activeData.__config__.span;
      this.activeData.__config__.tag = config.tag;
      this.activeData.__config__.tagIcon = config.tagIcon;
      this.activeData.__config__.document = config.document;
      if (
        typeof this.activeData.__config__.defaultValue ===
        typeof config.defaultValue
      ) {
        config.defaultValue = this.activeData.__config__.defaultValue;
      }
      Object.keys(newTag).forEach((key) => {
        if (this.activeData[key] !== undefined) {
          newTag[key] = this.activeData[key];
        }
      });
      this.activeData = newTag;
      this.updateDrawingList(newTag, this.drawingList);
    },
    updateDrawingList(newTag, list) {
      const index = list.findIndex(
        (item) => item.__config__.formId === this.activeId
      );
      if (index > -1) {
        list.splice(index, 1, newTag);
      } else {
        list.forEach((item) => {
          if (Array.isArray(item.__config__.children))
            this.updateDrawingList(newTag, item.__config__.children);
        });
      }
    },
    refreshJson(data) {
      this.drawingList = deepClone(data.fields);
      delete data.fields;
      this.formConf = data;
    },
  },
};
</script> 

<style lang='scss' >
@import "@/styles/form-generator";
</style>
