import Vue from 'vue'
import App from './App.vue'
import http from './api/http.js'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$http=http;
//Vue.prototype.$qs=qs;
new Vue({
  render: h => h(App),
}).$mount('#app')
