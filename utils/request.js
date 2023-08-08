// 此vm参数为页面的实例，可以通过它引用vuex中的变量 vm.$store.state
module.exports = (vm) => {
    uni.$u.http.setConfig((config) => {
        config.baseURL = vm.$store.state.VUE_APP_URL; /* 根域名 */
        return config;
    });

    // 请求拦截
    uni.$u.http.interceptors.request.use((config) => {
        config.data = config.data || {};
        //取
        // 根据custom参数中配置的是否需要token，添加对应的请求头 true需要 false不需要
        // if (config?.custom?.auth) {
        //    config.header.Authorization = uni.getStorageSync('token');
        // }
		 config.header.Authorization = uni.getStorageSync('token');
        return config;
    }, config => {
        return Promise.reject(config);
    });

    // 响应拦截
    uni.$u.http.interceptors.response.use((response) => {
        const data = response.data;
        if (data.code !== 20000) {
            // 默认对报错进行toast弹出提示
            uni.$u.toast(data.message);
            // 如果需要catch返回，则进行reject
            return Promise.reject();
        } else {
            return data.data === undefined ? {} : data.data;
        }
    }, (response) => {
        // 对响应错误做点什么 （statusCode !== 200）
        uni.$u.toast("请联系管理员");
        return Promise.reject(response);
    });
};
