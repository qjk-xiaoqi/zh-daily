import Vue from 'vue';
import App from './App.vue';
import router from './router/r-config.js'; 
import './style/style.css'
// Vue.use(Vuex);

// 包含了应用的数据和操作过程，Vuex里的数据都是响应式的，任何组件使用统一store的数据时，
// 只要store的数据变化，对应的组件也会立即更新
// const store = new Vuex.Store({
//     // vuex的配置
//     state: {
//         count: 0
//     }
// })
new Vue({
    el: '#app',
    router: router,
    // store: store,
    render: h =>h(App)
  });