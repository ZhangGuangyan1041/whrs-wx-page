import axios from 'axios';
//import qs from 'qs'

const http = axios.create(
    {
        baseURL: 'http://127.0.0.1:8081',
        timeout: 15000,
        headers: {'Content-Type': 'application/json'},
        /* transformRequest: [
             function (data, headers) {
                 headers['token'] = Storage.token;
                 headers['Source'] = global.location.href;
                 data=qs.stringify(data);
                 return data;
             }
         ]*/
    }
)
http.interceptors.request.use(request => {
    console.log("==================")
    console.log(request.method);
    if (request.method == "post") {
        console.log(true)
        // console.log(request.data)

        /* for(let i in request.data){
             request.data[i]=qs.stringify(request.data[i])
         }*/
        //request.data = qs.stringify(request.data);
        console.log(request.data)
    }
    return request;
}, error => {
    return Promise.reject(error);
})
http.interceptors.response.use(function (response) {
    let data = response.data;
    if (data.header.code === 20000) {
        return data;
    } else {
        return Promise.reject({response, message: data.header.message});
    }

}, error => {
    return Promise.reject(error);
});
export default http;

/*const http=(url='',data={},type='GET',contentType) => {
    return new Promise((resolve,reject)=>{
        let requestConfig = {
            method: type,
            url:url,
            header: {
                'Accept':'application/json',//接受：应用/JSON'，
                'Content-Type':contentType ? contentType : 'application/json'
            },
            timeout:2000
        };
        switch ( type.toUpperCase() ) {
            case "GET":
                requestConfig.params = data;
                requestConfig.paramsSerializer = (params) => {
                    return qs.stringify(params,{indices:false})
                };
                break;


            case "DELETE":
                requestConfig.params = data;
                break;
            case "PUT":
                requestConfig.data = data;
                break;

            // `data` 是作为请求主体被发送的数据
            // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
            // 在没有设置 `transformRequest` 时，必须是以下类型之一：
            // - string, plain object(无格式化对象), ArrayBuffer(缓冲数组), ArrayBufferView, URLSearchParams
            // - 浏览器专属：FormData, File, Blob（二进制）
            // - Node 专属： Stream
        }
        //1.multipart/form-data 此种方式多用于文件上传
        //2.application/json  现在越来越多的应用使用application/json,用来告诉服务端消息主体是序列化的json字符串。由于json规范的流行，各大浏览器都开始原生支持JSON.stringfy。
        //3.application/x-www-form-urlencoded 最开始的请求方式中，请求参数都是放在url中，表单提交的时候，都是以key=&value=的方式写在url后面。
        //这也是浏览器表单提交的默认方式 request.getInputStream或request.getReader获取到请求内容
        if ((type === 'POST' || type === 'PUT') && contentType !=='multipart/form-data') {
            requestConfig.data = contentType ? qs.stringify(data) : JSON.stringify(data)
        }
        axios(requestConfig)
            .then((response)=>{
                resolve(response.data)
            })
            .catch((error)=>{
                reject(error)
            })
    })
}*/


