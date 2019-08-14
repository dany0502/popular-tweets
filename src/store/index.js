import Vue from "vue";
import Vuex from "vuex";

import common from "./common";
import articles from "./articles";
import videos from "./videos";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    articles,
    videos
  }
});
