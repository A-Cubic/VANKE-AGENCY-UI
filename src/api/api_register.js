/**
 * Created by pwz on 2018/07/24
 * 注册相关api
 */
import * as API from './'

export default {
    //门店下拉查询
    storeList: params => {
        return API.POST('store/list', params)
     },

    //角色查询
    roleList: params => {
        return API.POST('role/listDesc', params)
    },

    //账号注册
    registerSubmit: params => {
        return API.POST('user/register', params)
    },

    //用户查询
    userList: params => {
        return API.POST('user/list', params)
    },

    //冻结/解冻
    setFrozenOrNormal: params => {
        return API.POST('user/updateSign', params)
    },

}
