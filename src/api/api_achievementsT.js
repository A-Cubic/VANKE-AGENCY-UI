/**
 * Created by pwz on 2018/07/24
 * 首页相关api
 */
import * as API from './'

export default {
  //总业绩查询
    listStoreAllAchievement: params => {
    return API.POST('achievement/listStoreAllAchievement', params)
  },

    //门店业绩查询
    listAchievementTow: params => {
        return API.POST('achievement/listAchievementTow', params)
    },

    //门店下拉
    storelist: params => {
        return API.POST('achievement/listStore', params)
    },




}
