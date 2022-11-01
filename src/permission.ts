import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { userModule } from '@/store/modules'
import { getToken } from './utils/cookies'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to: Route, _: Route, next: any) => {
  // Start progress bar
  NProgress.start()

  const hasToken = getToken()

  // Determine whether the user has logged in
  if (hasToken) {
    if (to.path === '/login') {
      // If is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      if (userModule.nickname) {
        checkRole(to, next);
        next()
      } else {
        try {
          // get user info
          await userModule.getInfo(0);
          checkRole(to, next);
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          userModule.resetToken();
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done()

  // set page title
  let routerTitle = to.meta.title ? "-" + to.meta.title : '';
  document.title = '模板程序后台' + routerTitle
})

function checkRole(to: Route, next: any) {
  let userLevel = userModule.nowUser?.permissionRole?.level;

  let pageRoles = to?.meta?.roles;
  if (pageRoles && pageRoles.length > 0) {
    
    if (pageRoles.includes(userLevel)) {
      // console.info((!pageRoles))
      console.info(userLevel)
    } else {
      next('/403')
    }
    // if (pageRoles.includes(userModule.nowUser.role)) {
    //   // console.info((!pageRoles))
    // } else {
    //   next('/403')
    // }
  }
}