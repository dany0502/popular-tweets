module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8081"
      }
    }
  },
  pwa: {
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    workboxOptions: {
      cacheId: "my-pwa-v1",
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /.*api.*/,
          handler: "networkFirst",
          options: {
            cacheName: "api",
            expiration: {
              maxAgeSeconds: 60 * 60 * 24
            }
          }
        },
        {
          urlPattern: /.*mp4.*/,
          handler: "networkFirst",
          options: {
            cacheName: "video",
            expiration: {
              maxAgeSeconds: 60 * 60 * 24
            }
          }
        }
      ]
    }
  }
};
