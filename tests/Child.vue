<template>
  <div>child: {{ msg }}</div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
};
</script>

<style></style>
