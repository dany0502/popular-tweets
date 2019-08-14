import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "@/store";
import lazyLoad from "@/directives/lazy-load";
import "@/utils/request-manager";

Vue.config.productionTip = false;
Vue.directive("lazy-load", lazyLoad);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
