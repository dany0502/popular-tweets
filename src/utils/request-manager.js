import axios from "axios";

let requests = [];

axios.interceptors.request.use(
  config => {
    const request = requests.find(url => url === config.url);
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
    return Promise.reject(error);
  }
);

const popRequest = obj => {
  if (obj && obj.config) {
    requests = requests.filter(url => obj.config.url !== url);
  }
};

export default axios;
