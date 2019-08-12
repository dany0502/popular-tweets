import Vue from "vue";
import Router from "vue-router";
import Articles from "@/views/Articles";
import { ARTICLES, VIDEOS } from "@/constants/route";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: ARTICLES
    },
    {
      path: ARTICLES.path,
      name: ARTICLES.name,
      component: Articles
    },
    {
      path: VIDEOS.path,
      name: VIDEOS.name,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "@/views/Videos")
    }
  ]
});
