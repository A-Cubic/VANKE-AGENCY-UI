/**
 * Created by pwz on 2018/07/24
 * 首页相关api
 */
import * as API from './'

export default {
  //审核列表查询
  searchAudit: params => {
    return API.POST('examine/list', params)
  },

    //审核业绩列表
    searchAchList: params => {
        return API.POST('achievement/examineAchievement', params)
    },

    //审核结果
    updateResult: params => {
        return API.POST('examine/updateResult', params)
    },

}
