// This module is used to avoid multiple API requests.
import axios from "axios";
import errorHandler from "@/errorHandlers/api";

let requests = [];
axios.interceptors.request.use(
  config => {
    const request = requests.find(url => url === config.url);
    // Cancel request if previos request is not finished.
    if (request) {
      return {
        ...config,
        cancelToken: new axios.CancelToken(cancel =>
          cancel("Cancel multiple requests")
        )
      };
    } else {
      requests.push(config.url);
      return config;
    }
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  res => {
    popRequest(res);
    return res;
  },
  error => {
    popRequest(error);
    errorHandler(error);
    return Promise.reject(error);
  }
);

const popRequest = obj => {
  if (obj && obj.config) {
    requests = requests.filter(url => obj.config.url !== url);
  }
};

export default axios;
