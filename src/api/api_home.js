/**
 * Created by pwz on 2018/04/10
 * 用户相关api
 */
import * as API from './'

export default {
  //读取用户信息
  userinfo: params => {
    return API.POST('home/user/info', params)
  },

    //排行榜
    rank: params => {
        return API.POST('home/score/list', params)
    },

    //优质房源
    goodhouse: params => {
        return API.POST('house/listIsfine', params)
    },

}
