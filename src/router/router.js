import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import List from '../pages/List'
import About from '../pages/About'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}//解决报错 -显示是路由重复
/*配置路由*/
const routes = [

    {
        path: "/",
        component: List,
        meta: {
            title: "列表",
            keepAlive: true,//缓存
        },
    },
    {
        path: "/list",
        component: List,
        meta: {
            title: "列表",
            keepAlive: true,//缓存
        }
    },
    {
        path: "/about",
        component: About,
        meta: {
            title: "内容",
            keepAlive: false,//缓存
        }
    }

]
/*实例化路由*/
const router = new VueRouter({
    //mode: 'history',
    //base:'/whrs',
    routes // （简写）相当于 routes: routes
})
/*导出路由模块*/
export default router
