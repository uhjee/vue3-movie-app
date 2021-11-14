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
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  .logo {
    margin-right: 40px;
  }
}
</style>
