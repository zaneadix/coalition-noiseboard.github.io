
import Vue from 'vue';
import VueRouter from 'vue-router';
import CoalitionNoiseboard from './CoalitionNoiseboard.vue';
import NoiseInventory from './components/NoiseInventory.vue';
import Board from './components/Board.vue';
import store from './store';

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'noise-inventory',
        component: NoiseInventory 
    },{
        path: '/board/:id',
        name: 'board',
        component: Board 
    }]
});

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
    store,
    router,
    render: h => h(CoalitionNoiseboard)
}).$mount('#app')
