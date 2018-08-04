import router from '../router/router'
import { getToken, getRole } from './global'

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true
  if (!permissionRoles) return true
  return permissionRoles.indexOf(roles) >= 0
}

const whiteList = ['/default']

router.beforeEach((to, from, next) => {
  if (getToken()) {
      // console.log('123213213123213')
      if (hasPermission(getRole(), to.meta.roles)) {
          next()//
      } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
      }
  } else {
      // console.log('33333333333333')
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/default')
    }
  }
})

