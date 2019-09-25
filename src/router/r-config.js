import Vue from 'vue';
import VueRouter from 'vue-router';

import app1 from '../components/app1.vue'
import app2 from '../components/app2.vue'

Vue.use(VueRouter);
// 定义路由
const Routers = [
    {
    path:'/app1',
    component: app1
    }, 
    {
    path:'/app2',
    component: app2
    }
]
// 创建router实例，然后传`routes`配置
export default new VueRouter({   
    routes: Routers
})
