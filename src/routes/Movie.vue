<template>
  <div>movie</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('movie/searchMovieWithId', {
      // movie/tt123762
      i: this.$route.params.id,
    });
  },
};
</script>
