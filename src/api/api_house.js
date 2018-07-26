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

}
