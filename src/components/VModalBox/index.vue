<template>
  <el-dialog
    class="v-modal-box"
    :title="$t(title)"
    :visible.sync="syncedVisible"
    :width="width"
    destroy-on-close
    @befor-close="beforeClose"
  >
    <el-form
      ref="form"
      :model="formDataCopy"
      :rules="rules"
      :label-width="labelWidth"
    >
      <slot :columns="columns" :formData="formDataCopy">
        <el-form-item
          v-for="col in columns"
          :prop="col.key"
          :key="col.key"
          :label="$t(col.label)"
          :rules="col.rules"
        >
          <el-input v-model="formDataCopy[col.key]"></el-input>
        </el-form-item>
      </slot>
    </el-form>

    <span slot="footer" v-if="!addMode">
      <el-button plain @click="syncedVisible = false">{{$t('取消')}}</el-button>
      <el-button type="primary" @click="submit">{{$t('保存')}}</el-button>
    </span>
    <span slot="footer" v-else>
      <el-button type="danger" @click="syncedVisible = false">{{$t('取消')}}</el-button>
      <el-button type="success" @click="submit">{{$t('添加')}}</el-button>
    </span>
  </el-dialog>
</template>

<script src="./index.vue.ts">
</script>

<style lang="scss">
.el-dialog__body {
  // padding-top: 0;
  padding-bottom: 0;
}
</style>
