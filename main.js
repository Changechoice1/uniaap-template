import App from './App'
import uView from '@/uni_modules/uview-ui'
import Vue from 'vue'
import './uni.promisify.adaptor'
import store from 'store'
import zhouWeiNavBar from "./components/zhouWei-navBar/zhouWei-navBar.vue"
Vue.component("nav-bar", zhouWeiNavBar)
Vue.config.productionTip = false
uni.$u.config.unit = 'rpx'
App.mpType = 'app'
const app = new Vue({
	store,
  ...App
})
//引入拦截器等
require('./utils/request.js')(app)
//公用类
import Utils from "./utils/utils.js";
Vue.prototype.Utils = Utils;
Vue.use(uView)
app.$mount()


