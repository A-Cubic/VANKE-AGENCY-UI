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


}
