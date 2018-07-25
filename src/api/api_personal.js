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

    //修改姓名/电话
    updateinfo: params => {
        return API.POST('home/user/upadateInfo', params)
    },

    //修改密码
    updatepwd: params => {
        return API.POST('home/user/updatePassword', params)
    },

    //头像上传
    uploadAvatar: params => {
        return API.POST('home/user/upload/avatar', params)
    },

    //我关注的房源
    myLikeHouseList: params => {
        return API.POST('house/myLikeHouseList', params)
    },

    //我维护的房源
    myRecordHouseList: params => {
        return API.POST('house/myRecordHouseList', params)
    },

}