/**
 * Created by pwz on 2018/04/10
 */
import axios from 'axios';
axios.defaults.withCredentials = true; //axios可以设置cookies

//基地址
let base = '';
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.data && response.data.errcode) {
    if (parseInt(response.data.errcode) === 40001) {
      //未登录
      this.$router.push({ path: '/' });
    }
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

//通用方法
export const POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(`${base}${url}`, {params: params}).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}
