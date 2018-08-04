/**
 * Created by pwz on 2018/07/24
 * 首页相关api
 */
import * as API from './'

export default {
  //查询客源
  searchGuest: params => {
    return API.POST('guest/list', params)
  },

    //新增客源
    insertGuest: params => {
        return API.POST('guest/insert', params)
    },

    //客源详情
    guestDetail: params => {
        return API.POST('guest/detail', params)
    },

    //带看详情
    lookDetail: params => {
        return API.POST('guest/lookrecord/list', params)
    },

    //跟进详情
    recordDetail: params => {
        return API.POST('guest/record/list', params)
    },

    //跟进录入
    recordInsert: params => {
        return API.POST('guest/record/insert', params)
    },

    //房源搜索
    houseListGuest: params => {
        return API.POST('house/list', params)
    },

    //添加带看
    insertLook: params => {
        return API.POST('guest/lookrecord/insert', params)
    },

// 转让用户-查询
    searchUser: params => {
        return API.POST('house/listUser', params)
    },

    // 转让用户-确认
    updateRecordUser: params => {
        return API.POST('guest/updateRecordUser', params)
    },

    // 无效客源申请
    updateState: params => {
        return API.POST('guest/updateState', params)
    },

    // 修改维护人（共享池）
    updateIsshareUser: params => {
        return API.POST('guest/updateIsshareUser', params)
    },

}
