import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './Home';
import About from './About';
import Movie from './Movie.vue';

export default createRouter({
  // hash mode, history mode 둘 중 선택
  history: createWebHashHistory(),
  // pages
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      // 동적 route 세팅 ($route.params 로 접근 가능)
      path: '/movie/:id',
      component: Movie,
    },
    {
      path: '/about',
      component: About,
    },
  ],
});
