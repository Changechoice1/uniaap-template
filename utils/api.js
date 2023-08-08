const http = uni.$u.http;

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释 get传必须要加{} {data}
export const index1Api1 = (data) => http.get('/api/common/captcha', data);
export const index1Api2 = (data,params) => http.post('/api/common/captcha', data,{params});

// get 例子
// import {index1Api1} from '../../config/api';
// let params = {sign: 'admin_login_captcha'};
// index1Api1({params}).then(res => {
//     console.log(res);
// });


/*
post例子
import {index1Api2} from '../../config/api';
let data={ a:1};
let params={b:2};
index1Api2(data,params).then(res=>{
    console.log(res)
})
*/
