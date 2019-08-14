<template>
  <div class="container-fluid">
    <div class="text-center">
      <div class="error mx-auto mb-5 mt-5">{{ errorCode }}</div>
      <p class="lead text-gray-800">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { SOME_ERROR } from "@/constants/errorCode";
import errorMessages from "@/constants/errorMessages";

export default {
  name: "Error",
  data() {
    return {
      errorCode: this.$route.params.errorCode || SOME_ERROR,
      errorMessage:
        errorMessages[this.$route.params.errorCode] || errorMessages[SOME_ERROR]
    };
  }
};
</script>
