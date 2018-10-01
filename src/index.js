import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router";
import CoalitionNoiseboard from "./CoalitionNoiseboard.vue";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.filter("title", function(name) {
  return name.replace(/_/g, " ").replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
});

new Vue({
  store,
  router,
  render: h => h(CoalitionNoiseboard)
}).$mount("#app");
