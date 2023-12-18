<template>
  <el-container>
    <el-header height="60px">
      <el-row :gutter="24" style="width:100%">
        <el-col :span="12" style="display:flex">
          <label class="radio-label" for="model-select">机型</label>
          <el-select id="model-select" v-model="model" value-key="name" filterable placeholder="请选择机型">
            <el-option v-for="item in modelList" :key="item.id" :label="item.name" :value="item"></el-option>
          </el-select>
          <el-button type="primary" style="margin-left:auto" @click="PNConfTemplate.visible = true">
            {{ $t('编辑配置模板') }}
          </el-button>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-row class="list-row" :gutter="10">
        <el-col :span="12">
          <div class="v-list-header">
            <label class="m-r-10px">配置</label>
            <el-select v-model="currentPNConfig" value-key="title" filterable @change="onSelectConfig">
              <el-option v-for="item in PNConfigList" :key="item.id" :label="item.title" :value="item" />
            </el-select>

            <el-button type="primary" style="margin-left: auto;" @click="PNConfigPanel.visible = true">
              {{ $t('配置列表') }}
            </el-button>
          </div>
          <div class="PNConfigBox">
            <div class="config-editor" style="height: 500px"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="v-list-header">
            <label for="">已分配的料号列表</label>

            <el-button type="success" :disabled="!currentPNConfig.id" @click="addPartNoDialog.visible = true">
              {{ $t('添加料号') }}
            </el-button>
          </div>
          <v-list id="pn-list">
            <v-list-item v-for="(pn, i) in PNList" :key="i">
              {{ pn.no }}
              <el-button type="text" class="danger" icon="el-icon-delete" @click="deletePN(pn.id)"></el-button>
            </v-list-item>
          </v-list>
        </el-col>
      </el-row>
    </el-main>

    <!-- 添加料号，支持一次性添加多个料号 -->
    <el-dialog :title="$t('添加料号')" :visible.sync="addPartNoDialog.visible" width="50%">
      <el-input
        type="textarea"
        :rows="5"
        :placeholder="$t('请输入料号，回车分割多个料号')"
        v-model="addPartNoDialog.inputValue"
      />
      <span slot="footer">
        <el-button @click="addPartNoDialog.visible = false">{{$t('取消')}}</el-button>
        <el-button type="primary" @click="addPartNo">{{$t('添加')}}</el-button>
      </span>
    </el-dialog>

    <el-drawer
      id="PNConfig-panel"
      title="料号配置面板"
      :visible.sync="PNConfigPanel.visible"
      direction="btt"
      size="95%"
      destroy-on-close
      show-clos
      wrapperClosable
    >
      <el-row :gutter="20" class="m-l-10px m-r-10px">
        <el-col :span="12">
          <div class="col-title">
            <label>配置列表</label>
            <el-input
              class="m-l-10px m-r-10px"
              style="flex:1"
              v-model="PNConfigSearchKeyWord"
              placeholder="搜索配置"
              clearable
            ></el-input>
            <el-button type="success" size="small" style="margin-left: auto;" @click="addPNConfig">{{ $t('添加配置') }}</el-button>
          </div>
          <v-list id="PNConfig-list">
            <v-list-item
              v-for="(config, i) in PNConfigList"
              :key="i"
              @click="onSelectConfig(config)"
              :class="currentPNConfig.id === config.id ? 'active' : ''"
              v-show="config.title.includes(PNConfigSearchKeyWord)"
            >
              {{ config.title }}
              <el-button
                type="text"
                class="danger"
                icon="el-icon-delete"
                @click.stop="deletePNConfig(config.id)"
              ></el-button>
            </v-list-item>
          </v-list>
        </el-col>
        <!-- v-if的刷新会导致 manoco-editor丢失 -->
        <el-col :span="12" v-show="currentPNConfig.id">
          <div class="col-title">
            <label>当前配置</label>
            <el-button type="success" size="small" style="margin-left: auto" @click="updatePNConfig">
              {{ $t(' 保存配置') }}
            </el-button>
          </div>
          <div class="pn-config-title-input">
            <label>标题</label>
            <el-input v-model="currentPNConfig.title" placeholder="" clearable></el-input>
          </div>

          <div class="pn-config-editor" style="height: 100vh"></div>
        </el-col>
        <el-empty v-show="!currentPNConfig.id" description="请在左侧选择配置"></el-empty>
      </el-row>
    </el-drawer>

    <el-drawer
      class="config-template-drawer"
      :title="model.name + ' 的配置模板'"
      :visible.sync="PNConfTemplate.visible"
      direction="btt"
      size="95%"
      destroy-on-close
      show-close
      wrapperClosable
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="template-config-editor" style="height: 100vh;"></div>
        </el-col>
        <el-col :span="12">
          <el-button type="success" style="small" @click="savePnConfigTemplate">{{ $t('保存') }}</el-button>
          <ul>
            <li><i class="el-icon-question"></i></li>
            <li>{{$t('1. 模板只支持 Ini 配置')}}</li>
            <li>{{$t('2. 料号配置中的每个节(section)和键(key)与模板中的节和键一致')}}</li>
          </ul>
        </el-col>
      </el-row>
    </el-drawer>
  </el-container>
</template>
<script src="./index.vue.ts" />
<style src="./index.vue.scss" scoped lang="scss" />
