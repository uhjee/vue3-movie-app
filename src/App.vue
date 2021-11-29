<template>
  <Header />
  <!-- 라우팅되는 페이지가 출력되는 영역 컴포넌트 -->
  <RouterView />
  <Footer />
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
<style lang="scss">
// @import '@/scss/main';
</style>
