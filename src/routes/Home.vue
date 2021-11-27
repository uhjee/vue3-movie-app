<template>
  <Headline />
  <Search />
  <MovieList />
</template>

<script>
import Headline from '@/components/Headline';
import Search from '@/components/Search';
import MovieList from '@/components/MovieList';

export default {
  components: {
    Headline,
    Search,
    MovieList,
  },
  created() {
    // home으로 다시 이동 시, 초기화
    this.$store.commit('movie/resetMovies');
  },
};
</script>
