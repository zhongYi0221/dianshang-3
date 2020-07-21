import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import icon from './assets/font/iconfont.css'
import  './assets/menu-font/font-menu2/iconfont.css'
import axios from 'axios'

//当在当前不需要时候只提供全局使用时候只引入文件夹就好
import './assets/css/global.css'

import './plugins/element.js'

Vue.config.productionTip = false;
//配置根目录
axios.defaults.baseURL=`http://timemeetyou.com:8889/api/private/v1/`;

//拦截器
//API V1 认证统一使用 Token 认证
axios.interceptors.request.use(config=>{
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //写法2：
  //config.headers.Authorization = sessionStorage.getItem('token');
  return config
});
Vue.prototype.$http=axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');