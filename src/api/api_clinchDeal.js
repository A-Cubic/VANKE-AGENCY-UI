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

    //新增成交-第二步-客源查询
    searchGuest: params => {
        return API.POST('guest/listTransactionGuest', params)
    },
    //新增成交-第三步-保存
    insertTrans: params => {
        return API.POST('house/transaction/insert', params)
    },
    //业绩分配-查看详情
    achievementList: params => {
        return API.POST('achievement/detailList', params)
    },
    //业绩分配-查看
    getAchievement: params => {
        return API.POST('achievement/getAchievement', params)
    },

    //业绩分配-添加
    achievementInsert: params => {
        return API.POST('achievement/insert', params)
    },
    searchUser: params => {
        return API.POST('house/listUser', params)
    },

}
