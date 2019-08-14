<template>
  <div v-show="show" class="overlay">
    <div class="bd-example">
      <div class="spinner">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.overlay {
  z-index: 999;
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
}
.spinner {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 10rem;
  height: 10rem;
}
</style>
