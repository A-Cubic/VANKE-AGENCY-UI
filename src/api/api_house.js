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
    // 撤回钥匙人
    updateCancelKey: params => {
        return API.POST('house/updateCancelKey', params)
    },



    // 新增跟进
    insertRecord: params => {
        return API.POST('house/record/insert', params)
    },

    // 修改房源
    updateHouse: params => {
        return API.POST('house/update', params)
    },

    // 无效房源
    updateState: params => {
        return API.POST('house/updateState', params)
    },

    // 特殊房源
    updateSpecial: params => {
        return API.POST('house/updateIsSpecial', params)
    },

    // 优质房源
    updateFine: params => {
        return API.POST('house/updateIsFine', params)
    },

    // 转让用户-查询
    searchUser: params => {
        return API.POST('house/listUser', params)
    },

    // 转让用户-确认
    updateRecordUser: params => {
        return API.POST('house/updateRecordUser', params)
    },

    // 关注
    likeInsert: params => {
        return API.POST('house/like/insert', params)
    },

    // 取消关注
    likeDelete: params => {
        return API.POST('house/like/delete', params)
    },

    // 上传实勘图
    updateImg: params => {
        return API.POST('house/updateImg', params)
    },

    // 修改维护人
    updateIsShare: params => {
        return API.POST('house/updateIsShare', params)
    },

    // 查看电话地址记录
    getHistory: params => {
        return API.POST('house/clicklog/list', params)
    },

    // 查看电话地址记录
    getAllStore: params => {
        return API.POST('store/listStore', params)
    },

    // 跟进置顶
    updateIsTopOne: params => {
        return API.POST('house/record/updateIsTopOne', params)
    },

    // 跟进取消置顶
    updateIsTopZero: params => {
        return API.POST('house/record/updateIsTopZero', params)
    },

    // 分配-判断
    isMyStore: params => {
        return API.POST('house/isMyStore', params)
    },

    // 分配-选择用户
    alloSearchUser: params => {
        return API.POST('house/findByUserInfo', params)
    },

    // 分配-录入人
    updateCreateUserName: params => {
        return API.POST('house/updateCreateUserName', params)
    },

    // 分配-维护人
    updateRecordUserName: params => {
        return API.POST('house/updateRecordUserName', params)
    },

    // 分配-实勘人
    updateExplorationUserName: params => {
        return API.POST('house/updateExplorationUserName', params)
    },

    // 分配-钥匙人
    updateKeyUserName: params => {
        return API.POST('house/updateKeyUserName', params)
    },

    // 上网
    houseStateUp: params => {
        return API.POST('house/houseStateUp', params)
    },

    // 价格调整记录
    pricelogList: params => {
        return API.POST('house/pricelog/list', params)
    },

}
