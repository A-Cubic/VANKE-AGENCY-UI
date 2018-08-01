/**
 * Created by pwz on 2018/07/24
 * 首页相关api
 */
import * as API from './'

export default {
  //审核列表查询
  searchclinchDeal: params => {
    return API.POST('house/transaction/list', params)
  },

    //新增成交-第一步-房源查询
    searchHouse: params => {
        return API.POST('house/list', params)
    },

    //新增成交-第一步-客源查询
    searchGuest: params => {
        return API.POST('house/list', params)
    },

}
