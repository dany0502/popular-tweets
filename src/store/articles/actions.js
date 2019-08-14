import axios from "axios";

export default {
  getArticles({ commit }) {
    return axios.get("/api/getarticles").then(res => {
      commit("setArticles", res.data);
    });
  }
};
