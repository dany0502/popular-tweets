import Vue from "vue";
import Router from "vue-router";
import Articles from "@/views/Articles";
import { ARTICLES, VIDEOS } from "@/constants/route";
import store from "@/store";
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
      component: Articles,
      beforeEnter: (to, from, next) => {
        store
          .dispatch("articles/getArticles")
          .then(() => {
            next();
          })
          .catch(() => {
            // TODO: Show error view
            next();
          });
      }
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
