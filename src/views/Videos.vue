<template>
  <div class="container-fluid">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Videos</h1>
    </div>
    <card-container v-for="(tweet, index) in tweets" :key="index">
      <template v-slot:header>
        <card-header>
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
        </card-header>
      </template>
      <template v-slot:body>
        <card-body
          :type="'Video'"
          :videoUrl="videoUrl(tweet)"
          :ratio="ratio(tweet)"
        >
          <p>{{ tweet.text }}</p>
          <template v-slot:footer>
            <p>
              <i class="mr-1 fas fa-retweet"></i
              ><span>{{ tweet.retweet_count }}</span
              ><i class="ml-4 mr-1 fas fa-heart"></i
              ><span>{{ tweet.favorite_count }}</span>
            </p>
          </template>
        </card-body>
      </template>
    </card-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CardContainer, CardHeader, CardBody } from "@/components/Card";

export default {
  name: "Videos",
  components: {
    CardContainer,
    CardHeader,
    CardBody
  },
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
