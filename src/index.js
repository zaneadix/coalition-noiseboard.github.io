
import Vue from 'vue';
import VueRouter from 'vue-router';
import CoalitionNoiseboard from './CoalitionNoiseboard.vue';
import NoiseInventory from './components/NoiseInventory.vue';
import BoardPage from './components/BoardPage.vue';
import store from './store';

/**
 * This is a docs comment
 */
const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'noise-inventory',
        component: NoiseInventory 
    },{
        path: '/board/:id',
        name: 'board',
        component: BoardPage 
    }]
});

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.filter('title', function (name) {
  return name.replace(/_/g, ' ')
             .replace(
                 /\w\S*/g,
                 function(txt) {
                     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                 }
             );
})

new Vue({
    store,
    router,
    render: h => h(CoalitionNoiseboard)
}).$mount('#app')