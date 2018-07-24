/**
 * Created by pwz on 2018/07/24
 * 个人相关api
 */
import * as API from './'

export default {
    //读取用户信息
    userinfo: params => {
        return API.POST('home/user/findMyinfo', params)
    },


}