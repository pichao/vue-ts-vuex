import About from "pages/about/index.vue";
import Home from "pages/home/index.vue";
import Detail from "pages/detail/index.vue";
export const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "home1",
    path: "/home1",
    component: Home,
  },
  {
    name: "about",
    path: "/about/:id?",
    component: About,
    children: [
      // 动态路径参数以冒号 ":" 开头
      { path: "detail", component: Detail, name: "detail" },
    ],
  },
];
