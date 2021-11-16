<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <router-link
          :to="nav.href"
          class="nav-link"
          :class="{ active: isMatch(nav.path) }"
          active-class="active">
          {{ nav.name }}
        </router-link>
      </div>
    </div>
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import Logo from '@/components/Logo';

export default {
  components: {
    Logo,
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/',
        },
        {
          name: 'Movie',
          // default movie :: dune
          href: '/Movie/tt1160419',
          path: /^\/movie/, // '/movie' 로 시작하는 경로
        },
        {
          name: 'About',
          href: '/About',
        },
      ],
    };
  },
  computed: {
    /**
     * 이미지 경로를 반환한다.
     *
     * @return  {[type]}  [return description]
     */
    image() {
      return this.$store.state.about.image;
    },
    /**
     * 사용자 이름을 반환한다.
     *
     * @return  {[type]}  [return description]
     */
    name() {
      return this.$store.state.about.name;
    },
  },
  methods: {
    /**
     * 현재 라우트의 path가 path 정규식에 부합하는지 여부를 반환한다.
     * @param   {Regex | null}  path  [path description]
     * @return  {boolean}        [return description]
     */
    isMatch(path) {
      if (!path) return false;
      return path.test(this.$route.fullPath); // fullPath : 현재 이동하는 url 경로
    },
    toAbout() {
      // RouterLink 컴포넌트 없이 $router 객체 사용해 라우팅 이동
      this.$router.push('/about');
    },
  },
};
</script>

<style lang="scss" scoped>
// @import '@/scss/main';
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }

  .user {
    width: 40px;
    height: 40px;
    padding: 4px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: 0.4s;
    &:hover {
      background-color: darken($color: $gray-200, $amount: 15%);
    }
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  // 부트스트랩의 max-width 개념 
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>
