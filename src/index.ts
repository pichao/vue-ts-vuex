import Vue from "vue";
import VueRouter from "vue-router";
import App from "pages/app.vue";
// import { Button, DatePicker } from "ant-design-vue";
import { Button, Select } from "element-ui";
import { routes } from "config/routes";
import { store } from "store/index";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes, // (缩写) 相当于 routes: routes
});
new Vue({
  el: "#app",
  router, // 传入路由能力
  store,
  render: (h) => h(App),
});
