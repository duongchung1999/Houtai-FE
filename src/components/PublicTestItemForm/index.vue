<template>
  <div class="public-test-item-form">
    <el-form :model="paramForm" ref="form" label-width="100px" label-position="top">

      <el-form-item label="测试项目">
        <el-select v-model="currentTestItem" value-key="summary" placeholder="请选择测试项目" filterable>
          <el-option v-for="(pTestItem, i) in testItems" :key="i" :label="pTestItem.summary" :value="pTestItem" />
        </el-select>

        <el-tooltip v-if="currentTestItem && currentTestItem.mark" :content="currentTestItem.mark" placement="top" effect="dark">
          <el-button type="text" size="mini" class="m-l-10px">详情</el-button>
        </el-tooltip>

        <el-tooltip v-if="currentTestItem && currentTestItem.returns" :content="currentTestItem.returns" placement="top" effect="dark">
          <el-button type="text" size="mini" class="m-l-10px">返回值</el-button>
        </el-tooltip>
      </el-form-item>

      <div v-if="currentTestItem">
        <el-form-item :label="p.summary" v-for="(p, i) in currentParams" :key="i">
          <el-select v-if="p.options && p.options.length > 0" v-model="p.value" filterable>
            <el-option v-for="o in getOptions(p.options)" :key="o" :label="o" :value="o" />
          </el-select>

          <el-input v-else-if="p.type != 'boolean'" v-model="p.value" :placeholder="p.name" />
          <el-switch v-else v-model="p.value" :active-value="true" :inactive-value="false" />
        </el-form-item>
      </div>

      <el-form-item label="预览">{{testCmd}}</el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts" src="./index.vue.ts">
</script>

<style src="./index.vue.scss" scoped lang="scss" />