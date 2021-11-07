<template>
  <router-link
    to="/"
    class="logo">
    <span>OMDbAPI</span>.COM
  </router-link>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '@/scss/main';

.logo {
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  color: $gray-900;
  text-decoration: none;
  transition: scale, 0.2s;
  &:hover {
    color: $black;
    transform: scale(1.2);
  }

  span {
    color: $primary;
  }
}
</style>
