/**
 * Created by pwz on 2018/04/10
 * 用户相关api
 */
import * as API from './'

export default {
  //登录
  login: params => {
    return API.POST('user/login', params)
  },
  //登出
  logout: params => {
    return API.POST('basic/loginOut', params)
  },
  //修改密码
  changePass: params => {
    return API.PATCH('basic/changePass', params)
  }
}
