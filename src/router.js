import Vue from "vue";
import Router from "vue-router";

import ArticlesView from "@/views/Articles";
import ErrorView from "@/views/Error";
import { ARTICLES, VIDEOS, ERROR } from "@/constants/route";
import { INVALID_ROUTE } from "@/constants/errorCode";
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
      component: ArticlesView,
      beforeEnter: (to, from, next) => {
        store.commit("common/showLoading", true);
        store
          .dispatch("articles/getArticles")
          .then(() => {
            store.commit("common/showLoading", false);
            next();
          })
          .catch(() => {
            // TODO: Show error view
            store.commit("common/showLoading", false);
            next();
          });
      }
    },
    {
      path: VIDEOS.path,
      name: VIDEOS.name,
      beforeEnter: (to, from, next) => {
        store.commit("common/showLoading", true);
        store
          .dispatch("videos/getVideos")
          .then(() => {
            store.commit("common/showLoading", false);
            next();
          })
          .catch(() => {
            // TODO: Show error view
            store.commit("common/showLoading", false);
            next();
          });
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "video" */ "@/views/Videos")
    },
    {
      path: ERROR.path,
      name: ERROR.name,
      component: ErrorView
    },
    {
      path: "*",
      redirect: { ...ERROR, params: { errorCode: INVALID_ROUTE } }
    }
  ]
});
