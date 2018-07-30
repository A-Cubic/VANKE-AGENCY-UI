/**
 * Created by pwz on 2018/07/24
 * 首页相关api
 */
import * as API from './'

export default {
  //业绩查询
  searchAchievenments: params => {
    return API.POST('achievement/listMyAchievement', params)
  },



}
