<template>
  <div v-if="!item.meta || !item.meta.hidden" :class="['menu-wrapper', isCollapse ? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]">
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link v-if="theOnlyOneChild.meta && hasRoutePermissions(theOnlyOneChild)" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)" :class="{'submenu-title-noDropdown': isFirstLevel}">
          <svg-icon v-if="theOnlyOneChild.meta.icon" :name="theOnlyOneChild.meta.icon" />
          <span v-if="theOnlyOneChild.meta.title" slot="title">{{ $t(theOnlyOneChild.meta.title) }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>

    <el-submenu v-else-if="hasRoutePermissions(item)" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" />
        <span v-if="item.meta && item.meta.title" slot="title">{{ $t(item.meta.title) }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :is-collapse="isCollapse" :is-first-level="false" :base-path="resolvePath(child.path)" class="nest-menu" />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './SidebarItemLink.vue'
import { userModule } from '@/store/modules'

@Component({
  // Set 'name' here to prevent uglifyjs from causing recursive component not work
  // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
  name: 'SidebarItem',
  components: {
    SidebarItemLink
  }
})
export default class extends Vue {
  @Prop({ required: true }) item!: RouteConfig;
  @Prop({ default: false }) isCollapse!: boolean;
  @Prop({ default: true }) isFirstLevel!: boolean;
  @Prop({ default: '' }) basePath!: string;

  get showingChildNumber() {
    if (this.item.children) {
      const showingChildren = this.item.children.filter((item) => {
        if (item.meta && item.meta.hidden) {
          return false
        } else {
          return true
        }
      })
      return showingChildren.length
    }
    return 0
  }

  get theOnlyOneChild() {
    if (this.showingChildNumber > 1) {
      return null
    }
    if (this.item.children) {
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child
        }
      }
    }
    // If there is no children, return itself with path removed,
    // because this.basePath already conatins item's path information
    return { ...this.item, path: '' }
  }

  resolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(this.basePath)) {
      return this.basePath
    }
    return path.resolve(this.basePath, routePath)
  }

  /**
   * 当前用户是否有这个路由的权限
   * @param route 单个路由对象
   */
  hasRoutePermissions(route: any): boolean {
    const userLevel = userModule.nowUser?.permissionRole?.level
    const routeRoles = route.meta?.roles

    // 没有权限限制的路由
    if (!routeRoles || routeRoles.length == 0) return true
    // 如果用户拥有当前路由的权限
    else if (routeRoles.includes(userLevel)) {
      return true
    }
  }
}
</script>

<style lang="scss">
.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
</style>
