import axios from 'axios';
import Keys from '@/../keys.json';
import _uniqBy from 'lodash/uniqBy';

export default {
  namespaced: true, // store/index.js 에 명시해 module로써 활용 가능
  state: () => ({
    movies: [],
  }), // 취급해야하는 데이터
  getters: {
    movieIds(state) {
      // state를 매개변수로 가져온다
      return state.movies.map(m => m.imdbId);
    },
  }, // computed 개념
  // state를 조작
  mutations: {
    resetMovies(state) {
      state.movies = [];
    },
    /**
     * 모든 state를 변이할 수 있는 공통 메소드
     *
     * @param   {[type]}  state    vuex에서 넣어주는 객체
     * @param   {[type]}  payload  state 이름의 프로퍼티를 가진 객체
     * @return  {[type]}           [return description]
     */
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key];
      });
    },
  },
  // mutations를 호출 (비동기로 동작!!)
  actions: {
    // searchMovies(context) { // context - { state, getters, commit}
    async searchMovies({ commit, state }, payload) {
      // API 권한 관련 parameters
      payload.i = Keys.OMDB_ID;
      payload.apikey = Keys.OMDB_API_KEY;

      const res = await axios.get(`https://www.omdbapi.com/`, {
        params: payload,
      });

      if (res.data.Response) {
        const { Search, totalResults } = res.data;
        console.log(res);
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID'),
        });
        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10);

        // 추가 요청
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            // number 보다 큰 페이지수는 요청을 보내지 않도록
            if (page > payload.number / 10) break;

            const res = await axios.get(`https://www.omdbapi.com/`, {
              params: {
                ...payload,
                page, // for 문의 page로 요청
              },
            });
            const { Search } = res.data;
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')],
            });
          }
        }
      }
    },
  },
};
