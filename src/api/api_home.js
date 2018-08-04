/**
 * Created by pwz on 2018/07/24
 * 首页相关api
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

    //新增房源
    addhouseList: params => {
        return API.POST('home/user/newHouseList', params)
    },

    //通讯录
    bookTreeList: params => {
        return API.POST('user/storeUser', params)
    },

    //消息
    messageList: params => {
        return API.POST('message/list', params)
    },

}
