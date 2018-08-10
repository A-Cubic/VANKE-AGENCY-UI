/**
 * Created by pwz on 2018/07/24
 * 注册相关api
 */
import * as API from './'

export default {
    //地区联动
    regionslist: params => {
        return API.POST('base/region/list', params)
    },

    //新增门店
    insertStore: params => {
        return API.POST('store/insert', params)
    },

    //门店查询
    searchStore: params => {
        return API.POST('store/listStoreAll', params)
    },

    //门店更新
    updateStore: params => {
        return API.POST('store/update', params)
    },

}
