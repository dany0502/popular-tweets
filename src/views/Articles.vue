<template>
  <div ref="listContainer" class="container-fluid">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">{{ title }}</h1>
    </div>
    <div v-for="(tweet, index) in tweets" :key="index" class="card shadow mb-4">
      <div class="card-header py-3">
        <img class="img img-profile rounded-circle" src="" />
        <h6 class="m-0 ml-3 font-weight-bold text-primary inline">
          {{ tweet.user.name }}
        </h6>
      </div>
      <div class="card-body">
        <p>{{ tweet.text }}</p>
        <p>
          <i class="mr-1 fas fa-retweet"></i
          ><span>{{ tweet.retweet_count }}</span
          ><i class="ml-4 mr-1 fas fa-heart"></i
          ><span>{{ tweet.favorite_count }}</span>
        </p>
        <a href="#">もっと見る</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Articles",
  computed: {
    ...mapState("articles", ["tweets"])
  },
  props: {
    title: {
      type: String,
      default: "Articles"
    }
  }
};
</script>
