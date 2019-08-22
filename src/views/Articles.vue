<template>
  <div ref="listContainer" class="container-fluid">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">{{ title }}</h1>
    </div>
    <card-container
      v-for="(tweet, index) in tweets"
      :key="index"
      :type="'Text'"
    >
      <template v-slot:header>
        <card-header>
          <img
            width="48px"
            height="48px"
            v-lazy-load="{ defaultImageUrl }"
            class="img img-profile rounded-circle"
            :data-src="tweet.user.profile_image_url_https"
          />
          <span class="m-0 ml-3 font-weight-bold text-primary inline">
            {{ tweet.user.name }}
          </span>
        </card-header>
      </template>
      <template v-slot:body>
        <card-body>
          <p>{{ tweet.text }}</p>
          <template v-slot:footer>
            <p>
              <i class="mr-1 fas fa-retweet"></i
              ><span>{{ tweet.retweet_count }}</span
              ><i class="ml-4 mr-1 fas fa-heart"></i
              ><span>{{ tweet.favorite_count }}</span>
            </p>
            <a v-if="getUrl(tweet) !== null" :href="getUrl(tweet)"
              >もっと見る</a
            >
          </template>
        </card-body>
      </template>
    </card-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CardContainer, CardHeader, CardBody } from "@/components/Card";
import { DEFAULT_PROFILE_IMAGE } from "@/constants/images";

export default {
  name: "Articles",
  components: {
    CardContainer,
    CardHeader,
    CardBody
  },
  data() {
    return {
      defaultImageUrl: DEFAULT_PROFILE_IMAGE
    };
  },
  computed: {
    ...mapState("articles", ["tweets"])
  },
  props: {
    title: {
      type: String,
      default: "Articles"
    }
  },
  methods: {
    getUrl(tweet) {
      return (tweet.entities.urls[0] && tweet.entities.urls[0].url) || null;
    }
  }
};
</script>
