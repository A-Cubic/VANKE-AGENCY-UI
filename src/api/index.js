import axios from 'axios';
import {BASE_API, setToken, getToken} from "../util/global";

const request = axios.create({
    baseURL: BASE_API,
    timeout: 5000
})
request.defaults.withCredentials = true;
request.interceptors.request.use(config => {
    let curToken = getToken()
    if (curToken) {
        config.headers['Authorization'] = curToken
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.data && response.data.errcode) {
    if (parseInt(response.data.errcode) === 400) {
        setToken('')
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
    return request.post(url, params).then(res => res.data)
}

export const GET = (url, params) => {
  return request.get(url, {params: params}).then(res => res.data)
}

export const PUT = (url, params) => {
  return request.put(url, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return request.delete(url, {params: params}).then(res => res.data)
}

export const PATCH = (url, params) => {
  return request.patch(url, params).then(res => res.data)
}
