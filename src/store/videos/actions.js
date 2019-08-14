import axios from "axios";

export default {
  getVideos({ commit }) {
    return axios.get("/api/getvideos").then(res => {
      commit("setVideos", res.data);
    });
  }
};
