<template>
  <div
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
      zIndex,
    }"
    :class="{ absolute, fixed }"
    class="spinner-border text-primary"></div>
</template>

<script>

/**
 * Loading spinner component
 */
export default {
  props: {
    // spinner size
    size: {
      type: Number,
      default: 2,
    },
    // spinner position attribute : absolute
    absolute: {
      type: Boolean,
      default: false,
    },
    // spinner position attribute : fixed
    fixed: {
      type: Boolean,
      default: false,
    },
    // spinner : z-index
    zIndex: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner-border {
  // position: absolute, fixed일 때 가운데 배치
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  &.absolute { // 부모 relative 기준
    position: absolute;
  }
  &.fixed { // viewport 기준 
    position: fixed;
  }
}
</style>
