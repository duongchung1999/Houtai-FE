import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'
import { PermissionRoleOptions } from '@/entity/permissionRole'

Vue.use(Router)

/*
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default new Router({
  // mode: 'history',  // Enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
      meta: { hidden: true }
    },

    {
      path: '/404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
      meta: { hidden: true }
    },

    // 机型
    {
      path: '/',
      component: Layout,
      redirect: '/model',
      children: [
        {
          path: 'model',
          component: () => import(/* webpackChunkName: "model" */ '@/views/model/index.vue'),
          meta: { title: '机型', icon: 'headphone-fill', roles: [] }
        }
      ]
    },

    // 料号配置
    {
      path: '/PNConfig',
      component: Layout,
      redirect: '/PNConfig',
      children: [
        {
          path: 'PNConfig',
          component: () => import(/* webpackChunkName: "PNConfig" */ '@/views/PNConfig/index.vue'),
          meta: {
            title: '料号配置',
            icon: 'todo-fill',
            roles: [
              PermissionRoleOptions.ACCOUNT_MANAGER,
              PermissionRoleOptions.SW,
              PermissionRoleOptions.ADMIN,
              PermissionRoleOptions.TEMPLATE_PROGRAM_DEVELOPER
            ]
          }
        }
      ]
    },

    // 分配机型
    {
      path: '/assignModel',
      component: Layout,
      redirect: '/assignModel',
      children: [
        {
          path: 'assignModel',
          component: () => import(/* webpackChunkName: "assignModel" */ '@/views/assignModel/index.vue'),
          meta: {
            title: '分配机型',
            icon: 'share-fill',
            roles: [
              PermissionRoleOptions.ACCOUNT_MANAGER,
              PermissionRoleOptions.SW,
              PermissionRoleOptions.ADMIN,
              PermissionRoleOptions.TEMPLATE_PROGRAM_DEVELOPER
            ]
          }
        }
      ]
    },

    // 总测试项目
    {
      path: '/testitem',
      component: Layout,
      redirect: '/testitem',
      children: [
        {
          path: 'testitem',
          component: () => import(/* webpackChunkName: "testitem" */ '@/views/testitem/index.vue'),
          meta: {
            title: '测试项目',
            icon: 'list-unordered',
            roles: [
              PermissionRoleOptions.ACCOUNT_MANAGER,
              PermissionRoleOptions.SW,
              PermissionRoleOptions.TE,
              PermissionRoleOptions.ADMIN,
              PermissionRoleOptions.TEMPLATE_PROGRAM_DEVELOPER
            ]
          }
        }
      ]
    },

    // 站别测试项目
    {
      path: '/stationTestitem',
      component: Layout,
      redirect: '/stationTestitem',
      children: [
        {
          path: 'stationTestitem',
          component: () => import(/* webpackChunkName: "stationTestitem" */ '@/views/stationTestitem/index.vue'),
          meta: {
            title: '站别测试项目',
            icon: 'list-ordered',
            roles: [
              PermissionRoleOptions.ACCOUNT_MANAGER,
              PermissionRoleOptions.SW,
              PermissionRoleOptions.TE,
              PermissionRoleOptions.ADMIN,
              PermissionRoleOptions.TEMPLATE_PROGRAM_DEVELOPER
            ]
          }
        }
      ]
    },

    // 后台配置
    {
      path: '/backstageManage',
      component: Layout,
      redirect: '/backstageManage',
      meta: {
        title: '后台配置',
        icon: 'settings-fill',
        roles: [PermissionRoleOptions.ADMIN, PermissionRoleOptions.TEMPLATE_PROGRAM_DEVELOPER]
      },
      children: [
        {
          path: 'backstageManage',
          component: () => import(/* webpackChunkName: "backstageManage" */ '@/views/backstageManage/index.vue'),
          meta: {
            title: '后台配置',
            icon: 'settings-fill',
            roles: [PermissionRoleOptions.ADMIN, PermissionRoleOptions.TEMPLATE_PROGRAM_DEVELOPER]
          }
        },

        {
          path: 'publicTestItemManager',
          component: () =>
            import(/* webpackChunkName: "publicTestItemManager" */ '@/views/publicTestItemManager/index.vue'),
          meta: {
            title: '通用测试项目',
            icon: 'list-unordered',
            roles: [PermissionRoleOptions.ADMIN, PermissionRoleOptions.TEMPLATE_PROGRAM_DEVELOPER]
          }
        }
      ]
    },

    // 操作记录
    {
      path: '/actionRecord',
      component: Layout,
      redirect: '/actionRecord',
      children: [
        {
          path: 'actionRecord',
          component: () => import(/* webpackChunkName: "actionRecord" */ '@/views/actionRecord/index.vue'),
          meta: { title: '操作记录', icon: 'bug-fill' }
        }
      ]
    },

    // 用户管理
    {
      // hidden: true,
      path: '/userManage',
      component: Layout,
      redirect: '/userManage',
      meta: {
        title: '用户管理',
        icon: 'user',
        roles: [PermissionRoleOptions.ADMIN, PermissionRoleOptions.ACCOUNT_MANAGER]
      },
      children: [
        {
          path: 'userManage',
          component: () => import(/* webpackChunkName: "userManage" */ '@/views/userManage/index.vue'),
          meta: {
            title: '用户管理',
            icon: 'user',
            roles: [PermissionRoleOptions.ADMIN, PermissionRoleOptions.ACCOUNT_MANAGER]
          }
        },
        {
          path: 'roleManage',
          component: () => import(/* webpackChunkName: "roleManage" */ '@/views/roleManage/index.vue'),
          meta: {
            title: '角色管理',
            icon: 'user',
            roles: [PermissionRoleOptions.ADMIN, PermissionRoleOptions.ACCOUNT_MANAGER]
          }
        }
      ]
    },

    // 修改密码
    {
      meta: { hidden: true },
      path: '/changePassword',
      component: Layout,
      redirect: '/changePassword',
      children: [
        {
          path: 'changePassword',
          component: () => import(/* webpackChunkName: "changePassword" */ '@/views/changePassword/index.vue'),
          meta: {
            title: '修改密码',
            icon: 'user'
          }
        }
      ]
    },

    {
      path: '*',
      redirect: '/404',
      meta: { hidden: true }
    }
  ]
})
