<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
      @toggle-click="toggleSideBar" />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="whtas-news">
      <el-button type="primary" size="mini" round plain v-if="isShowWhatsNews">
        <a href="https://azure-flavor-e22.notion.site/1452ef55fd2041c9963aa061a72fd0b2" target="_blank"
          rel="noopener noreferrer">最近更新 🎉</a>
      </el-button>

    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img
            :src="avatar+'?imageView2/1/w/80/h/80'"
            class="user-avatar"
          > -->
          {{ nickname }}
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('主页') }}
            </el-dropdown-item>
          </router-link>
          <div>
            <el-dropdown-item @click.native="changeLanguageDialogVisible = true">
              {{ $t('切换语言') }}
            </el-dropdown-item>
          </div>
          <router-link to="/changePassword/changePassword">
            <el-dropdown-item>
              {{ $t('修改密码') }}
            </el-dropdown-item>
          </router-link>

          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('退出登录') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 更改当前用户语言选项 -->
    <el-dialog :title="$t('切换语言')" :visible.sync="changeLanguageDialogVisible">
      <ol id="language-options-box">
        <li @click="changeUserLang('ZN')">中文</li>
        <li @click="changeUserLang('VN')">Tiếng Việt</li>
        <li @click="changeUserLang('EN')">English</li>
      </ol>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AppModule } from "@/store/modules/app";
import UserModule from "@/store/modules/userModule";

import { getModule } from "vuex-module-decorators";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Hamburger from "@/components/Hamburger/index.vue";

const userModule = getModule(UserModule);

@Component({
  name: "Navbar",
  components: {
    Breadcrumb,
    Hamburger,
  },
})
export default class extends Vue {

  // 是否展示最近更新按钮
  get isShowWhatsNews(): boolean {
    const now = new Date();
    const end = new Date(2023, 3, 18);
    return now < end;
  }

  changeLanguageDialogVisible = false;
  currentUserLanguage = "ZN";

  get nickname() {
    var { nowUser } = userModule;
    return nowUser ? nowUser.nickname : "";
  }

  get sidebar() {
    return AppModule.sidebar;
  }

  get device() {
    return AppModule.device.toString();
  }

  toggleSideBar() {
    AppModule.ToggleSideBar(false);
  }

  async logout() {
    await userModule.logout();
    this.$router.push(`/login?redirect=${this.$route.fullPath}`);
  }

  async changeUserLang(lang: string) {
    await userModule.updateUserLang({ lang });
    this.$message.success('切换语言成功')
    this.changeLanguageDialogVisible = false;
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

#language-options-box {
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;

  padding-left: 0;
  margin: 0;

  li {
    cursor: pointer;
    color: #1890ff;
  }
}

// 最新消息按钮
.whtas-news {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: auto;
  margin-right: 12px;

}
</style>
