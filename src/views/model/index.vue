<template>
  <el-container>
    <el-header height="60px">
      <el-row :gutter="26" style="width:100%">
        <el-col :span="12">
          <label class="radio-label" for="model-select">机型</label>
          <el-select id="model-select" clearable v-model="model" value-key="name" filterable placeholder="请选择机型">
            <el-option v-for="item in modelList" :key="item.id" :label="item.name" :value="item"></el-option>
          </el-select>
          <el-button type="success" class="right" @click="
              setModelModal({ visible: true, addMode: true, title: '添加机型' })
            ">
            添加机型
          </el-button>
        </el-col>

        <el-col :span="12">
          <label class="radio-label" for="station-select">站别</label>
          <el-select id="station-select" clearable v-model="station" value-key="name" filterable placeholder="请选择站别">
            <el-option v-for="item in stationList" :key="item.id" :label="item.name" :value="item"></el-option>
          </el-select>
          <el-button type="success" class="right" @click="
              setStationModal({
                visible: true,
                title: '添加站别',
                addMode: true,
              })
            ">添加站别</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-row class="list-row" :gutter="10">
        <!-- 机型列表 -->
        <el-col :span="12">
          <v-list>
            <v-list-item v-for="(item, i) in filteredModelList" :key="i" @click="model = item">
              {{ item.name }}

              <el-dropdown type="text">
                <el-button type="text" icon="el-icon-s-operation"></el-button>

                <el-dropdown-menu slot="dropdown" @click.native="model = item">
                  <el-dropdown-item icon="el-icon-edit" @click.native="
                      setModelModal({
                        title: '编辑机型名称',
                        visible: true,
                        addMode: false,
                        formData: item,
                      })
                    ">
                    修改名称</el-dropdown-item>
                  <el-dropdown-item divided icon="el-icon-delete" class="danger" @click.native="deleteModel(item)">
                    删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </v-list-item>
            <el-empty description="无机型" v-if="!modelList.length" :image-size="200"></el-empty>
          </v-list>
        </el-col>

        <!-- 站别列表 -->
        <el-col :span="12">
          <v-list>
            <v-list-item v-for="(s, i) in stationList" :key="i" @click="station = s">
              {{ s.name }}
              <el-dropdown type="text" @click.native.stop>
                <el-button type="text" icon="el-icon-s-operation" class=""></el-button>

                <el-dropdown-menu slot="dropdown" @click.native="station = s">
                  <el-dropdown-item icon="el-icon-edit" @click.native="
                      setStationModal({
                        visible: true,
                        title: '编辑站别名称',
                        formData: s,
                        addMode: false,
                      })
                    ">
                    修改名称</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-setting" @click.native="showConfigEditor()">
                    编辑配置</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteStation(s)" divided icon="el-icon-delete" class="danger">
                    删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </v-list-item>
            <el-empty description="此机型没有站别" v-if="!stationList.length" :image-size="200"></el-empty>
          </v-list>
        </el-col>
      </el-row>
    </el-main>

    <!-- 添加/编辑 机型模态框 -->
    <v-modal-box :addMode="modelModal.addMode" :title="modelModal.title" :visible.sync="modelModal.visible" :columns="modelModal.columns" v-model="modelModal.formData" @submit="modelModal.onSubmit"></v-modal-box>

    <!-- 添加/编辑 站别模态框 -->
    <v-modal-box :addMode="stationModal.addMode" :title="stationModal.title" :visible.sync="stationModal.visible" :columns="stationModal.columns" v-model="stationModal.formData" @submit="stationModal.onSubmit">
    </v-modal-box>

    <el-drawer class="config-form-drawer" :with-header="false" :visible.sync="drawerVisible" direction="rtl" size="100%" destroy-on-close>
      <el-row class="priview-row">
        <el-col :span="12">
        <div class="config-editor" style="height: 100vh"></div>
        </el-col>
        <el-col :span="12">
          <div class="right-panel">
            <div class="action-bar">
              <div id="save-btn">
                <el-button type="success" size="small" @click="saveConfig">保存配置</el-button>
              </div>
              <el-button type="text" icon="el-icon-close" @click="drawerVisible = false"></el-button>
            </div>
            <div class="scrollbar-body">
              <el-scrollbar style="height: 100%">
                <parser :key="formParserKey" class="form-parser" v-if="drawerVisible" :form-conf="defaultConfigForm" ref="parser" @submit="onSubmitForm" @formDataChange="onFormDataChange" />
              </el-scrollbar>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-drawer>
  </el-container>
</template>
<script src="./index.vue.ts" />
<style src="./index.vue.scss" scoped lang="scss" />