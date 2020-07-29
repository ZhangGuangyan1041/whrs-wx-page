import Vue from 'vue'
//import App from './App.vue'
//import List from './pages/List'
import http from './api/http.js'
import Vant from 'vant';
import 'vant/lib/index.css';
import routes from './routes'
Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$http=http;
//Vue.prototype.$qs=qs;

//const NotFound={template:'<p>Page not found</p>'}
const app=new Vue({
  el:'#app',
  data: {
    currentRoute: window.location.pathname,
    href:null,
    web:""
  },
  computed: {
    ViewComponent () {
      let matchingView = routes[this.currentRoute]
      console.log(matchingView)
      return matchingView
          ? require('./pages/' + matchingView + '.vue').default
          : require('./pages/404.vue').default

    }
  },
  mounted(){

  },

  render (h) {
    return h(this.ViewComponent)
  }
})/*.$mount('#app')*/

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
