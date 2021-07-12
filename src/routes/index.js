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
      path: '/about',
      component: About,
    },
    {
      path: '/movie',
      component: Movie,
    },
  ],
});
