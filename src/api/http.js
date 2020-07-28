import axios from 'axios';
import qs from 'qs'
import {Toast} from "vant";

const http = axios.create(
    {
        baseURL: 'http://192.168.2.114:8081',
        timeout: 15000,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }
)
http.interceptors.request.use(request => {
    if (request.method == "post") {
        request.data = qs.stringify(request.data);
    }
    return request;
}, error => {
    return Promise.reject(error);
})
http.interceptors.response.use(function (response) {

    if(response.status==200){
        return response.data;
    }else{
        Toast(response.statusText);
        return Promise.reject({response, message: response.header.message});
    }
   // let data = response.data;
   /* if (data.header.code === 20000) {
        return data;
    } else {
        return Promise.reject({response, message: data.header.message});
    }*/



}, error => {
    return Promise.reject(error);
});
export default http;

/*const instance = axios.create({
    headers: {
        'content-type': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8'
        //'token': 'one'
    },
    baseURL: 'http://127.0.0.1:8081',
    timeout: 10000,
   // withCredentials: true
})*/

/*// 添加请求拦截器
instance.interceptors.request.use(config => {
    // 在发送请求之前做某事，比如说 设置token
    config.headers['token'] = 'token';
    return config;
}, error => {
    // 请求错误时做些事
    return Promise.reject(error);
});*/

/*// 添加响应拦截器
instance.interceptors.response.use(response => {
    // 对响应数据做些事
    if (response.status === 200) {
        console.log(response)
        if (response.data && response.data.data.code === 1) {
            console.log('成功')
            response.data.data.value = '我是返回成功' // 在请求成功后可以对返回的数据进行处理，再返回到前台
        } else {
            console.log('返回到登录...')
        }
    }
    return response;
}, error => {
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
})*/

//export default instance;
