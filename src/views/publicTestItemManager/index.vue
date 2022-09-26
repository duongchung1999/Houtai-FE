<template>
  <div>
    <el-header>
      <el-link type="primary" :underline="false" href="http://10.55.22.160:8099/mdContent?id=223&t=1663739099475" target="_blank" class="m-r-20px">了解更多...</el-link>

      <el-upload action="#" :before-upload="() => false" :on-change="chooseFile" :limit="1" :file-list="fileList">
        <el-button id="add-btn" type="success" size="small">添加通用测试项目</el-button>
      </el-upload>

      <!-- 删除功能放在页面内 -->
      <!-- <el-button type="danger" size="small">删除这部分</el-button> -->
    </el-header>

    <el-main>
      <el-link type="danger" :underline="false" :disabled="!selectedPublicTestItemGroup" class="m-b-20px" @click="deletePublicTestItemGroup">删除选中的通用测试项目组</el-link>
      <el-tabs v-model="selectedPublicTestItemGroupSummary" type="card" tab-position="top" @tab-click="onPageGroupSelected">
        <el-tab-pane v-for="item in allPublicTestItemGroups" :key="item.id" :label="item.summary" :name="item.summary">
          <PublicTestItemForm v-if="selectedPublicTestItemGroup" :group="selectedPublicTestItemGroup" :testItems="allPublicTestItems" />
        </el-tab-pane>
      </el-tabs>

    </el-main>

    <!-- 选择一个类以解析测试项目 -->
    <el-dialog title="选择一个类来上传通用测试项目" :visible.sync="chooseClassDialog.visible" width="80%" @closed="initDialog" destroy-on-close>
      <div>
        <el-steps :active="currentStep" class="m-b-20px">
          <el-step title="选择测试项目类" description="从XML注释文档中选择一个类来作为通用测试项目组" />
          <el-step title="提交" description="检查下面的方法是否符合预期" />
        </el-steps>

        <el-radio-group v-model="chooseClassDialog.currentClassName" v-if="currentStep == 1" @change="docClass2PublicTestItemGroup">
          <el-radio v-for="item in chooseClassDialog.classes" :key="item.summary._text" :label="item.summary._text" />
        </el-radio-group>

        <PublicTestItemForm v-if="currentStep == 2" :group="currentPublicTestItemGroup" :testItems="currentPublicTestItems" />

      </div>
      <span slot="footer">
        <el-button @click="chooseClassDialog.visible = false">取消</el-button>
        <el-button type="primary" v-if="currentStep == 2" @click="submit">完成</el-button>
        <el-button type="primary" @click="currentStep++" v-if="currentStep == 1" :disabled="!chooseClassDialog.currentClassName">下一步</el-button>

      </span>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { PublicTestItemAPI } from "@/api/publicTestItem/publicTestItemAPI";
import { PublicTestItemGroupAPI } from "@/api/publicTestItem/publicTestItemGroupAPI";
import PublicTestItemForm from "@/components/PublicTestItemForm/index.vue";
import { PublicTestItem } from "@/entity/publicTestItem/publicTestItem";
import { PublicTestItemGroup } from "@/entity/publicTestItem/publicTestItemGroup";
import { PublicTestItemParam } from "@/entity/publicTestItem/publicTestItemParam";
import { ElUploadInternalFileDetail } from "element-ui/types/upload";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import XMLJS from "xml-js";

/** c# xml注释文档 */
class XmlNoteDoc {
  doc: {
    /** 程序集信息 */
    assembly: {
      /** 程序集类名 */
      name: {
        _text: string;
      };
    };
    /** 成员信息 */
    members: {
      /** 成员列表 */
      member: XmlNoteDoc_Member[];
    };
  };
}

/** c# xml注释文档中的成员对象 */
class XmlNoteDoc_Member {
  /** 概述 */
  summary: {
    _text: string;

    _attributes: {
      /**自定义属性，dll名称 */
      dllName: string;
      /** 是否为通用测试项目 */
      isPublicTestItem: string;
    };
  };

  /** 属性 */
  _attributes: {
    /** 在代码中的完全名 */
    name: string;
  };

  /** 返回结果 */
  returns: {
    _text: string;
  };

  /** 备注 */
  remarks: {
    _text: string;
  };

  /** 参数列表 */
  param: XmlNoteDoc_MemberParam | XmlNoteDoc_MemberParam[];
}

/** 文档中的方法的参数 */
class XmlNoteDoc_MemberParam {
  /** 属性 */
  _attributes: {
    /** 在代码中的属性名称 */
    name: string;
    /** 可选项(数组字符串) */
    options: string;
  };

  /** 概述 */
  _text: string;
}

const DEFAULT_DIALOG = {
  visible: false,
  classes: new Array<XmlNoteDoc_Member>(),
  currentClassName: null,
};

@Component({
  name: "PublicTestItemManagePage",
  components: { PublicTestItemForm },
})
export default class PublicTestItemManagePage extends Vue {
  fileList: File[] = [];

  currentStep = 1;

  xmlDoc: XmlNoteDoc = null;

  chooseClassDialog = { ...DEFAULT_DIALOG };

  currentPublicTestItemGroup = new PublicTestItemGroup();
  currentPublicTestItems = new Array<PublicTestItem>();

  /** 当前拥有的所有通用测试项目组 */
  allPublicTestItemGroups = new Array<PublicTestItemGroup>();

  /** 当前组中所有的测试项目 */
  allPublicTestItems: PublicTestItem[] = [];

  /** 页面上选中的通用测试项目组 */
  selectedPublicTestItemGroupSummary = "";
  get selectedPublicTestItemGroup() {
    return this.allPublicTestItemGroups.find(
      (e) => e.summary == this.selectedPublicTestItemGroupSummary
    );
  }

  /** 选择文件 */
  async chooseFile(fileDetail: ElUploadInternalFileDetail) {
    let fr = new FileReader();
    fr.onload = () => {
      if (!fileDetail.name.endsWith(".xml")) {
        this.$message.error("请上传xml文件");
        return;
      }

      if (fr.result) this.addPublicTestItems(fr.result + "");
    };
    fr.readAsText(fileDetail.raw);
  }

  /** 添加通用测试项目 */
  async addPublicTestItems(xmlText: string) {
    var xmlDoc = XMLJS.xml2js(xmlText, {
      compact: true,
      ignoreDeclaration: true,
      trim: true,
    }) as XmlNoteDoc;

    this.xmlDoc = xmlDoc;

    // 检查是否是 c# xml注释文档
    if (!xmlDoc || !xmlDoc.doc.assembly || !xmlDoc.doc.members) {
      this.$message.error("xml内容不正确, 请上传c#xml注释文档");
      return;
    }

    // 获取类型列表
    var typeList = xmlDoc.doc.members.member.filter(
      (e) =>
        e._attributes.name.startsWith("T:") && e.summary._attributes?.dllName
    );

    // 初始化弹窗
    this.showDialog(typeList);
  }

  initDialog() {
    this.chooseClassDialog = { ...DEFAULT_DIALOG };
    this.currentStep = 1;
  }

  /** 初始化选择DocClass弹框 */
  showDialog(classMembers: XmlNoteDoc_Member[]) {
    if (classMembers.length == 0) {
      this.$message.error("没有找到 <summary>注释中带dllName属性的类");
      return;
    }
    this.chooseClassDialog.classes = classMembers;
    this.chooseClassDialog.visible = true;
  }

  /**
   * 解析Doc为PublicTestItemGroup
   * @param docClass 选择的docClass
   * @returns 返回PublicTestItemGroup
   */
  docClass2PublicTestItemGroup(classSummary: string) {
    let xmlMembers = this.xmlDoc.doc.members.member;
    let docClass = xmlMembers.find((e) => e.summary._text == classSummary);

    let docMethods = xmlMembers.filter(
      (e) =>
        e._attributes.name.startsWith(
          `${docClass._attributes.name.replace("T:", "M:")}`
        ) && e.summary._attributes?.isPublicTestItem == "true"
    );

    // -- 解析为PublicTestItems
    this.DocMembers2PublicTestItemGroup(docClass, docMethods);
  }

  /** 将XML文档的成员转为通用测试项目组 */
  DocMembers2PublicTestItemGroup(
    docClass: XmlNoteDoc_Member,
    docMethods: XmlNoteDoc_Member[]
  ) {
    let pTestItmes = new Array<PublicTestItem>();

    // 解析测试项目
    for (const method of docMethods) {
      // 解析参数
      let params = this.parseParams(method);
      // 解析方法名
      let methodName = this.parseMethodName(method._attributes.name);

      let t: PublicTestItem = {
        summary: method.summary?._text,
        methodName,
        mark: method.remarks?._text,
        returns: method.returns?._text,
        params,
      };

      pTestItmes.push(t);
    }

    this.currentPublicTestItemGroup = {
      summary: docClass.summary?._text,
      dllName: docClass.summary._attributes.dllName,
      mark: docClass.remarks?._text,
    };
    this.currentPublicTestItems = pTestItmes;
  }

  /** 解析XML方法成员的参数 */
  parseParams(docMethod: XmlNoteDoc_Member): PublicTestItemParam[] {
    let result: PublicTestItemParam[] = [];

    if (docMethod.param === undefined) return;

    let params: XmlNoteDoc_MemberParam[] = [];

    // 单个参数类型为Object，所以只能先判断数组
    if (docMethod.param instanceof Array) {
      params = docMethod.param as XmlNoteDoc_MemberParam[];
    } else {
      params = [docMethod.param as XmlNoteDoc_MemberParam];
    }

    let pTypes = this.parseParamTypes(docMethod._attributes.name);

    params.forEach((p, i) => {
      let pTestItemParam: PublicTestItemParam = {
        summary: p._text,
        name: p._attributes?.name,
        type: pTypes[i],
        options: p._attributes?.options,
      };

      result.push(pTestItemParam);
    });

    return result;
  }

  /** 将完全方法名解析为方法名称 */
  parseMethodName(fullMethodName: string) {
    //M:Backend.Controllers.v2.AuditsController.Get(Backend.Enties.Filte,Backend.Enties.Audit)
    let fullName = "";
    //是否有参数
    if (fullMethodName.includes("(")) {
      let regexp = /([\w\W]+)\(([\w\W]+)\)/;
      let matchs = fullMethodName.match(regexp);
      //M:Backend.Controllers.v2.AuditsController.Get
      fullName = matchs[1];
      //Backend.Enties.Filte,Backend.Enties.Audit
      let paramTypes = matchs[2];
    } else {
      fullName = fullMethodName;
    }

    let tempArr = fullName.split(".");
    let methodName = tempArr[tempArr.length - 1];

    return methodName;
  }

  /** 从完全方法名解析参数类型 */
  parseParamTypes(fullMethodName: string): string[] {
    /** C#类型转js类型 */
    let csType2JsType = (typeName: string): string => {
      /** 除了Bool，其他都转换为输入框，除非表明选项 */
      switch (typeName) {
        case "System.String":
          return typeof "";
        case "System.Int32":
          return typeof 1;
        case "System.Double":
          return typeof 1.0;
        case "System.Boolean":
          return typeof false;
        default:
          return typeof new Object();
      }
    };

    //是否有参数
    if (fullMethodName.includes("(")) {
      let regexp = /([\w\W]+)\(([\w\W]+)\)/;
      let matchs = fullMethodName.match(regexp);
      let paramTypes = matchs[2];
      let pTypesArr = paramTypes.split(",");

      let result: string[] = [];
      pTypesArr.forEach((e) => result.push(csType2JsType(e)));
      return result;
    } else {
      return [];
    }
  }

  /** 提交 */
  async submit() {
    this.chooseClassDialog.visible = false;

    // TODO 考虑更新的情况
    this.currentPublicTestItemGroup = await PublicTestItemGroupAPI.add(
      this.currentPublicTestItemGroup
    );
    this.currentPublicTestItems = await PublicTestItemAPI.reallocate(
      this.currentPublicTestItemGroup.id,
      this.currentPublicTestItems
    );

    this.allPublicTestItemGroups.push({ ...this.currentPublicTestItemGroup });

    this.$message.success("添加成功");
  }

  /** 删除测试项目 */
  async deletePublicTestItemGroup() {
    let groupId = this.selectedPublicTestItemGroup.id;
    this.allPublicTestItems = await PublicTestItemAPI.getList(groupId);
    await PublicTestItemGroupAPI.del(groupId);

    this.allPublicTestItemGroups = await PublicTestItemGroupAPI.getList();
    this.$message.success("删除成功");
  }

  /** 当选择页面上的通用测试项目组时 */
  async onPageGroupSelected() {
    let groupId = this.selectedPublicTestItemGroup.id;
    this.allPublicTestItems = await PublicTestItemAPI.getList(groupId);
  }

  async mounted() {
    this.allPublicTestItemGroups = await PublicTestItemGroupAPI.getList();
  }
}
</script>
<style src="./index.vue.scss" lang="scss" scoped></style>