import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './Home';
import About from './About';
import Movie from './Movie';
import NotFound from './NotFound';

export default createRouter({
  // hash mode, history mode 둘 중 선택
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    return {
      // 라우팅 시, 스크롤 최상단 이동
      top: 0,
    };
  },
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
    {
      path: '/:notFound(.*)', // 소괄호 사이에 정규 표현식으로 notFound로 라우팅할 path 입력
      component: NotFound,
    },
  ],
});
