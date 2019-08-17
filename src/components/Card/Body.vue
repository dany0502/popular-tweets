<template>
  <div class="card-body">
    <slot />
    <div
      v-if="types.video === type"
      :style="ratio"
      class="mb-3 video-container"
    >
      <video
        v-lazy-load
        v-auto-play
        autoplay
        playsinline
        width="100%"
        :data-src="videoUrl"
        type="video/*"
        class="video"
        muted
      >
        <p>Your browser does not support the video tag.</p>
      </video>
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
import { TYPES } from "./constants";

export default {
  name: "Body",
  data() {
    return {
      types: TYPES
    };
  },
  props: {
    type: {
      type: String,
      default: "Text",
      validator(val) {
        return Object.values(TYPES).includes(val);
      }
    },
    videoUrl: {
      type: String,
      default: ""
    },
    ratio: {
      type: String
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
