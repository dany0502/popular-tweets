<template functional>
  <div class="card shadow mb-4">
    <slot name="header" />
    <slot name="body" />
  </div>
</template>

<script>
export default {
  name: "Card"
};
</script>
