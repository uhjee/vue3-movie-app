<template>
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoading"
        absolute />
      <img
        :src="image"
        alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Loader from '@/components/Loader';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      imageLoading: true,
    };
  },
  computed: {
    // vuex helper 함수
    ...mapState('about', ['image', 'name', 'email', 'blog', 'phone']),
    // image() {
    //   return this.$store.state.about.image;
    // },
    // name() {
    //   return this.$store.state.about.name;
    // },
    // email() {
    //   return this.$store.state.about.email;
    // },
    // blog() {
    //   return this.$store.state.about.blog;
    // },
    // phone() {
    //   return this.$store.state.about.phone;
    // },
  },
  // !!!!!!!!!!!!!!!!!!!!!life cycle에서는 비동기 사용이 불가하다!!!!!!!!!!!!!!!!!!!!!!
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.$loadImage(this.image);
      this.imageLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
// @import '@/scss/main';

.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 5px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      border-radius: 50%;
      width: 100%;
    }
  }

  .name {
    font-size: 40px;
    font-family: 'Oswald', sans-serif;
    margin-bottom: 20px;
  }
}
</style>
