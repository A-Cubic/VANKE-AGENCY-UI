/**
 * Created by pwz on 2018/07/24
 * 首页相关api
 */
import * as API from './'

export default {
  //房源条件查询
  houselist: params => {
    return API.POST('house/list', params)
  },

    //地区联动
    regionslist: params => {
        return API.POST('base/region/list', params)
    },

    //小区筛选
    xiaoqulist: params => {
        return API.POST('base/xiaoqu/list', params)
    },

    //新增房源
    addhouse: params => {
        return API.POST('house/save', params)
    },

    //房源详情
    housedetail: params => {
        return API.POST('house/detail', params)
    },

    //带看列表
    looklist: params => {
        return API.POST('house/lookrecord/list', params)
    },

    // 跟进列表
    recordlist: params => {
        return API.POST('house/record/list', params)
    },

    // 查看电话
    detailPhone: params => {
        return API.POST('house/detailPhone', params)
    },

    // 查看地址
    detailAddress: params => {
        return API.POST('house/detailAddress', params)
    },

    // 更改钥匙人
    updateKey: params => {
        return API.POST('house/updateKey', params)
    },

    // 新增跟进
    insertRecord: params => {
        return API.POST('house/record/insert', params)
    },

    // 修改房源
    updateHouse: params => {
        return API.POST('house/update', params)
    },



}
