
import Vue from 'vue';
import VueRouter from 'vue-router';
import CoalitionNoiseboard from './CoalitionNoiseboard.vue';

import store from './store';

const router = new VueRouter({
    routes: [{ path: '/foo', component: CoalitionNoiseboard }]
});

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
    store,
    router,
    render: h => h(CoalitionNoiseboard)
}).$mount('#app')
