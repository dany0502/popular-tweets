<template>
  <nav
    class="headerContainer navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
  >
    <button
      @click="$emit('click')"
      class="btn btn-link d-md-none rounded-circle mr-3"
    >
      <i class="fa fa-bars"></i>
    </button>
  </nav>
</template>

<script>
export default {
  name: "Header"
};
</script>
