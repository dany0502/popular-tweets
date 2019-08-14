<template>
  <div class="container-fluid">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Videos</h1>
    </div>
    <div v-for="(tweet, index) in tweets" :key="index" class="card shadow mb-4">
      <div class="card-header py-3">
        <img
          width="48px"
          height="48px"
          v-lazy-load
          class="img img-profile rounded-circle"
          :data-src="tweet.user.profile_image_url_https"
        />
        <span class="m-0 ml-3 font-weight-bold text-primary inline">
          {{ tweet.user.name }}
        </span>
      </div>
      <div class="card-body">
        <p>{{ tweet.text }}</p>
        <div
          v-if="videoUrl(tweet) !== null"
          :style="ratio(tweet)"
          class="mb-3 video-container animation-container"
        >
          <video
            v-lazy-load
            autoplay
            playsinline
            width="100%"
            :data-src="videoUrl(tweet)"
            type="video/*"
            class="video"
            muted
          >
            <p>Your browser does not support the video tag.</p>
          </video>
        </div>
        <p>
          <i class="mr-1 fas fa-retweet"></i
          ><span>{{ tweet.retweet_count }}</span
          ><i class="ml-4 mr-1 fas fa-heart"></i
          ><span>{{ tweet.favorite_count }}</span>
        </p>
        <a v-if="getSeeMoreUrl(tweet) !== null" :href="getSeeMoreUrl(tweet)"
          >もっと見る</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Videos",
  computed: {
    ...mapState("videos", ["tweets"])
  },
  methods: {
    getSeeMoreUrl(tweet) {
      return (tweet.entities.urls[0] && tweet.entities.urls[0].url) || null;
    },
    media(tweet) {
      const entity = (tweet && tweet.extended_entities) || {};
      return (entity.media && entity.media[0]) || {};
    },
    videoUrl(tweet) {
      const media = this.media(tweet);
      const variants = (media.video_info && media.video_info.variants) || [];
      return (variants[0] && variants[0].url) || null;
    },
    ratio(tweet) {
      const videoInfo = this.media(tweet).video_info;
      const w = videoInfo && videoInfo.aspect_ratio[0];
      const h = videoInfo && videoInfo.aspect_ratio[1];
      return `padding-bottom:${(100 * h) / w}%`;
    }
  }
};
</script>
<style scoped>
.video {
  width: 100%;
}
.video-container {
  width: 100%;
  position: relative;
  height: 0;
  overflow: hidden;
  background-color: gainsboro;
}

.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
